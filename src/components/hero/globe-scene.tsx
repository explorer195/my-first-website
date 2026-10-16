"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  buildLandDots,
  buildMarketNodes,
  buildRoutes,
  buildTrail,
  rotationToFace,
} from "./globe-geometry";
import { dotShader, atmosphereShader, coreShader, nodeShader, routeShader, trailShader } from "./globe-shaders";

export type GlobeQuality = "high" | "low";
export type PointerState = { x: number; y: number };

type GlobeSceneProps = {
  active: boolean;
  reducedMotion: boolean;
  quality: GlobeQuality;
  pointer: React.RefObject<PointerState>;
  onReady: () => void;
  className?: string;
};

const RADIUS = 1;
const ORBIT_RADIUS = 1.2;
/** Longitude that faces the visitor first: Europe, Africa and the Gulf. */
const VIEW_LON = 18;
const VIEW_TILT = 0.36;

/** Reads a brand colour from the CSS tokens so the scene never hard-codes colours. */
function cssColor(name: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(value);
}

export default function GlobeScene({
  active,
  reducedMotion,
  quality,
  pointer,
  onReady,
  className,
}: GlobeSceneProps) {
  return (
    <Canvas
      className={className}
      flat
      dpr={quality === "high" ? [1, 1.5] : [1, 1.25]}
      camera={{ position: [0, 0, 5.2], fov: 32, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={!active ? "never" : reducedMotion ? "demand" : "always"}
    >
      <Globe reducedMotion={reducedMotion} quality={quality} pointer={pointer} onReady={onReady} />
    </Canvas>
  );
}

type GlobeProps = Omit<GlobeSceneProps, "active" | "className">;

function Globe({ reducedMotion, quality, pointer, onReady }: GlobeProps) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const dotsRef = useRef<THREE.Points>(null);
  const trailRef = useRef<THREE.Points>(null);
  const yaw = useRef(0);
  const introStart = useRef<number | null>(null);
  const ready = useRef(false);
  const height = useThree((state) => state.size.height);
  const dpr = useThree((state) => state.viewport.dpr);

  const colors = useMemo(
    () => ({
      blue: cssColor("--royal-400"),
      royal: cssColor("--royal-600"),
      cyan: cssColor("--cyan-400"),
      gold: cssColor("--gold-500"),
      goldLight: cssColor("--gold-300"),
      night: cssColor("--night-950"),
      snow: cssColor("--snow"),
    }),
    [],
  );

  // Shared by every material, so one update per frame drives the whole scene.
  const shared = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: reducedMotion ? 1 : 0 },
      uPixelRatio: { value: 1 },
      uScale: { value: 1 },
    }),
    [reducedMotion],
  );

  const geometries = useMemo(
    () => ({
      dots: buildLandDots(quality === "high" ? 26000 : 15000, RADIUS * 1.004, VIEW_LON),
      nodes: buildMarketNodes(RADIUS * 1.012),
      routes: buildRoutes(RADIUS * 1.006),
      trail: buildTrail(quality === "high" ? 240 : 150),
    }),
    [quality],
  );

  const materials = useMemo(() => {
    const additive = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };
    return {
      core: new THREE.ShaderMaterial({
        ...coreShader,
        uniforms: {
          uCore: { value: colors.night.clone().lerp(colors.royal, 0.05) },
          uRim: { value: colors.royal },
        },
      }),
      atmosphere: new THREE.ShaderMaterial({
        ...atmosphereShader,
        ...additive,
        side: THREE.BackSide,
        uniforms: { uColor: { value: colors.royal.clone().lerp(colors.cyan, 0.35) } },
      }),
      dots: new THREE.ShaderMaterial({
        ...dotShader,
        transparent: true,
        depthWrite: false,
        uniforms: { ...shared, uColor: { value: colors.blue }, uGold: { value: colors.goldLight } },
      }),
      nodes: new THREE.ShaderMaterial({
        ...nodeShader,
        ...additive,
        uniforms: { ...shared, uGold: { value: colors.gold }, uWhite: { value: colors.snow } },
      }),
      routes: new THREE.ShaderMaterial({
        ...routeShader,
        ...additive,
        uniforms: { ...shared, uLine: { value: colors.blue }, uPulse: { value: colors.goldLight } },
      }),
      trail: new THREE.ShaderMaterial({
        ...trailShader,
        ...additive,
        uniforms: {
          ...shared,
          uHead: { value: reducedMotion ? -0.7 : -2.4 },
          uLength: { value: 1.7 },
          uRadius: { value: ORBIT_RADIUS },
          uColor: { value: colors.gold },
          uHot: { value: colors.goldLight },
        },
      }),
      orbit: new THREE.MeshBasicMaterial({
        color: colors.blue,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      }),
    };
  }, [colors, shared, reducedMotion]);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
    };
  }, [geometries]);

  useEffect(() => {
    return () => {
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [materials]);

  // Per-frame updates go through the rendered objects. The dots material
  // holds the uniforms shared by the whole scene.
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const uniforms = (dotsRef.current?.material as THREE.ShaderMaterial | undefined)?.uniforms;
    const trail = (trailRef.current?.material as THREE.ShaderMaterial | undefined)?.uniforms;
    if (uniforms) {
      uniforms.uPixelRatio.value = dpr;
      uniforms.uScale.value = height / 1000;
    }

    if (!reducedMotion) {
      if (uniforms) {
        const time = state.clock.elapsedTime;
        uniforms.uTime.value = time;
        // Wall-clock based, so the intro takes the same time on slow devices.
        introStart.current ??= time;
        uniforms.uIntro.value = Math.min(1, (time - introStart.current) / 3.4);
      }
      yaw.current += dt * 0.035;
      // Counter-clockwise: across the front of the globe from lower left to upper right.
      if (trail) trail.uHead.value += dt * 0.38;
    }

    const p = reducedMotion ? { x: 0, y: 0 } : pointer.current ?? { x: 0, y: 0 };
    if (spin.current) {
      const target = rotationToFace(VIEW_LON) + yaw.current + p.x * 0.32;
      spin.current.rotation.y = reducedMotion
        ? target
        : THREE.MathUtils.damp(spin.current.rotation.y, target, 3, dt);
    }
    if (tilt.current) {
      const target = VIEW_TILT + p.y * 0.16;
      tilt.current.rotation.x = reducedMotion
        ? target
        : THREE.MathUtils.damp(tilt.current.rotation.x, target, 3, dt);
    }

    if (!ready.current) {
      ready.current = true;
      onReady();
    }
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh material={materials.core}>
          <sphereGeometry args={[RADIUS, 96, 96]} />
        </mesh>
        <points ref={dotsRef} geometry={geometries.dots} material={materials.dots} />
        <lineSegments geometry={geometries.routes} material={materials.routes} />
        <points geometry={geometries.nodes} material={materials.nodes} />
      </group>
      <mesh material={materials.atmosphere} scale={1.16}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
      </mesh>
      {/* The orbit and comet echo the gold growth arrow in the logo. */}
      <group rotation={[0, 0, 0.42]}>
        <group rotation={[-1.24, 0, 0]}>
          <mesh material={materials.orbit}>
            <torusGeometry args={[ORBIT_RADIUS, 0.0026, 6, 320]} />
          </mesh>
          <points
            ref={trailRef}
            geometry={geometries.trail}
            material={materials.trail}
            frustumCulled={false}
          />
        </group>
      </group>
    </group>
  );
}

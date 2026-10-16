"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";
import { motionQueries, useScrollScene } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/use-media-query";
import type { PointerState } from "./globe-scene";

// three.js loads in its own chunk, only in the browser.
const GlobeScene = dynamic(() => import("./globe-scene"), { ssr: false });

/**
 * The 3D globe only runs on hardware-accelerated WebGL. Software renderers
 * (no GPU) would make the page sluggish, so those visitors keep the
 * static sphere instead.
 */
function hasHardwareWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

type HeroGlobeProps = {
  /** Static dotted globe, shown when the device can't run the 3D scene. */
  poster: React.ReactNode;
};

/**
 * The night-side globe from the DigitalScope emblem: market lights, routes
 * and the gold comet. A CSS sphere holds its place while the 3D loads;
 * devices without graphics acceleration get the static dotted globe.
 */
export function HeroGlobe({ poster }: HeroGlobeProps) {
  const stage = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [inView, setInView] = useState(true);
  const reduceMotion = usePrefersReducedMotion();
  const large = useMediaQuery("(min-width: 1024px)");

  // Start the 3D once the browser is idle, so it never delays the first paint.
  useEffect(() => {
    const hardware = hasHardwareWebGL();
    const start = () => (hardware ? setMounted(true) : setFallback(true));
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  // Stop rendering when the hero is off screen.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The globe leans toward the mouse.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Depth on scroll: the globe drifts up and grows while the copy lifts away faster.
  useScrollScene(stage, ({ gsap }, root) => {
    const section = root.closest("section");
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add(motionQueries.motionOk, () => {
      const trigger = { trigger: section, start: "top top", end: "bottom top", scrub: true };
      gsap.to(root, { yPercent: -8, scale: 1.1, ease: "none", scrollTrigger: trigger });
      gsap.to(section.querySelector("[data-hero-content]"), {
        y: -120,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: trigger,
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={stage} aria-hidden className="globe-stage pointer-events-none">
      <div className="globe-poster">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out-expo",
            fallback ? "opacity-100" : "opacity-0",
          )}
        >
          {poster}
        </div>
      </div>
      {mounted && (
        <GlobeScene
          className={cn(
            "transition-opacity duration-1000 ease-out-expo",
            ready ? "opacity-100" : "opacity-0",
          )}
          active={inView}
          reducedMotion={reduceMotion}
          quality={large ? "high" : "low"}
          pointer={pointer}
          onReady={() => setReady(true)}
        />
      )}
    </div>
  );
}

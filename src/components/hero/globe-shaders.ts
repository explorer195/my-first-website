// GLSL for the hero globe. Colours arrive as uniforms read from CSS tokens.

const facing = /* glsl */ `
  float facingCamera(vec3 objectPosition, vec4 mvPosition) {
    vec3 n = normalize(normalMatrix * normalize(objectPosition));
    return dot(n, normalize(-mvPosition.xyz));
  }
`;

/** Dark sphere with a soft royal-blue rim. */
export const coreShader = {
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uCore;
    uniform vec3 uRim;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.4);
      gl_FragColor = vec4(mix(uCore, uRim, rim * 0.5), 1.0);
      #include <colorspace_fragment>
    }
  `,
};

/** Thin halo just outside the limb (rendered on the back faces of a larger sphere). */
export const atmosphereShader = {
  vertexShader: coreShader.vertexShader,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float s = -dot(normalize(vNormal), normalize(vView));
      float intensity = pow(smoothstep(0.0, 0.5, s), 2.0);
      gl_FragColor = vec4(uColor, intensity * 0.14);
      #include <colorspace_fragment>
    }
  `,
};

/** Land dots: blue grid with gold "city lights" that switch on at dusk. */
export const dotShader = {
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uIntro;
    uniform float uPixelRatio;
    uniform float uScale;
    attribute float aSize;
    attribute float aGold;
    attribute float aDelay;
    attribute float aTwinkle;
    varying float vAlpha;
    varying float vGold;
    ${facing}
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      float face = facingCamera(position, mvPosition);
      float lit = smoothstep(aDelay, aDelay + 0.06, uIntro);
      float flicker = mix(1.0, 0.7 + 0.3 * sin(uTime * (1.0 + aTwinkle * 2.0) + aTwinkle * 40.0), aGold);
      vAlpha = lit * flicker * smoothstep(-0.02, 0.42, face);
      vGold = aGold;
      gl_PointSize = aSize * uScale * uPixelRatio * (13.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uGold;
    varying float vAlpha;
    varying float vGold;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float alpha = smoothstep(0.5, 0.18, d) * vAlpha * mix(0.42, 1.0, vGold);
      if (alpha < 0.01) discard;
      gl_FragColor = vec4(mix(uColor, uGold, vGold), alpha);
      #include <colorspace_fragment>
    }
  `,
};

/** Market nodes: a bright core and glow; primary markets emit a pulse ring. */
export const nodeShader = {
  vertexShader: /* glsl */ `
    uniform float uIntro;
    uniform float uPixelRatio;
    uniform float uScale;
    attribute float aPrimary;
    attribute float aPhase;
    varying float vPrimary;
    varying float vPhase;
    varying float vAlpha;
    ${facing}
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      float face = facingCamera(position, mvPosition);
      vAlpha = smoothstep(0.05, 0.4, face) * smoothstep(0.5, 0.75, uIntro);
      vPrimary = aPrimary;
      vPhase = aPhase;
      gl_PointSize = mix(18.0, 40.0, aPrimary) * uScale * uPixelRatio * (4.4 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uGold;
    uniform vec3 uWhite;
    varying float vPrimary;
    varying float vPhase;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float core = smoothstep(0.12, 0.07, d);
      float glow = smoothstep(0.5, 0.0, d) * 0.22;
      float t = fract(uTime * 0.32 + vPhase);
      float ring = (1.0 - smoothstep(0.0, 0.03, abs(d - t * 0.46))) * (1.0 - t) * vPrimary;
      float alpha = (core + glow + ring * 0.8) * vAlpha;
      if (alpha < 0.01) discard;
      gl_FragColor = vec4(mix(uWhite, uGold, vPrimary), alpha);
      #include <colorspace_fragment>
    }
  `,
};

/** Routes between markets: faint arcs with travelling gold pulses. */
export const routeShader = {
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uIntro;
    attribute float aProgress;
    attribute float aOffset;
    attribute float aSpeed;
    varying float vPulse;
    varying float vAlpha;
    void main() {
      float drawn = step(aProgress, smoothstep(0.55, 1.0, uIntro) * 1.02);
      float head = fract(uTime * aSpeed + aOffset);
      vPulse = exp(-pow((aProgress - head) * 10.0, 2.0));
      float ends = smoothstep(0.0, 0.06, aProgress) * smoothstep(1.0, 0.94, aProgress);
      vAlpha = drawn * ends * (0.14 + vPulse * 0.85);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uLine;
    uniform vec3 uPulse;
    varying float vPulse;
    varying float vAlpha;
    void main() {
      gl_FragColor = vec4(mix(uLine, uPulse, vPulse), vAlpha);
      #include <colorspace_fragment>
    }
  `,
};

/** The comet's tail: points placed along the orbit behind the head. */
export const trailShader = {
  vertexShader: /* glsl */ `
    uniform float uHead;
    uniform float uLength;
    uniform float uRadius;
    uniform float uIntro;
    uniform float uPixelRatio;
    uniform float uScale;
    attribute float aIndex;
    varying float vFade;
    void main() {
      float angle = uHead - aIndex * uLength;
      vec3 p = vec3(cos(angle) * uRadius, sin(angle) * uRadius, 0.0);
      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      vFade = pow(1.0 - aIndex, 1.8) * smoothstep(0.3, 0.7, uIntro);
      float head = 1.0 - smoothstep(0.0, 0.015, aIndex);
      gl_PointSize = (mix(1.5, 8.0, pow(1.0 - aIndex, 2.0)) + head * 18.0) * uScale * uPixelRatio * (5.2 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uHot;
    varying float vFade;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float alpha = smoothstep(0.5, 0.0, d) * vFade;
      if (alpha < 0.01) discard;
      gl_FragColor = vec4(mix(uColor, uHot, vFade), alpha);
      #include <colorspace_fragment>
    }
  `,
};

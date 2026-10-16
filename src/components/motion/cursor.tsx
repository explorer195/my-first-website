"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";

const INTERACTIVE = "a, button, [role='button'], summary, label, input, textarea, select";

/**
 * The "scope" cursor: a small gold dot that trails the pointer and opens
 * into a ring over anything interactive. The system cursor stays visible.
 * Only shown for mouse and trackpad users who allow motion.
 */
export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setActive(Boolean(target?.closest?.(INTERACTIVE)));
    }

    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const spring = { type: "spring", stiffness: 420, damping: 32 } as const;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-60"
      style={{ x: springX, y: springY }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.span
        className="absolute -top-1 -left-1 block size-2 rounded-full bg-signal"
        initial={false}
        animate={{ scale: active ? 0 : 1 }}
        transition={spring}
      />
      <motion.span
        className="absolute -top-6 -left-6 block size-12 rounded-full border border-signal"
        initial={false}
        animate={{ scale: active ? 1 : 0.2, opacity: active ? 1 : 0 }}
        transition={spring}
      />
    </motion.div>
  );
}

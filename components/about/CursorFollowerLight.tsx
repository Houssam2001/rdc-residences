"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollowerLight() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        setIsHovering(true);
        setCursorText((interactive as HTMLElement).dataset.cursor || "");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full border border-black/40"
          animate={{
            width: isHovering ? 90 : 28,
            height: isHovering ? 90 : 28,
            x: isHovering ? -45 : -14,
            y: isHovering ? -45 : -14,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {cursorText && (
            <motion.span
              className="text-[8px] uppercase tracking-[0.25em] text-black font-medium"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full bg-black/60"
          animate={{
            width: isHovering ? 0 : 5,
            height: isHovering ? 0 : 5,
            x: isHovering ? 0 : -2.5,
            y: isHovering ? 0 : -2.5,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
}

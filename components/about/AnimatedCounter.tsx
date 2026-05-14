"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedCounter({
  end,
  suffix = "",
  label,
  duration = 2,
}: {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      {/* Number — serif light for elegance */}
      <p
        className="text-5xl md:text-7xl font-light mb-3 text-white/80"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {count}
        <span className="text-white/30">{suffix}</span>
      </p>
      {/* Label — ultra-spaced sans */}
      <p
        className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-normal"
        style={{ fontFamily: "var(--font-roboto)" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

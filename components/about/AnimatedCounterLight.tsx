"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedCounterLight({
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
      <p
        className="text-5xl md:text-7xl font-light mb-3 text-black/70"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {count}
        <span className="text-black/20">{suffix}</span>
      </p>
      <p
        className="text-[8px] uppercase tracking-[0.5em] text-black/25 font-normal"
        style={{ fontFamily: "var(--font-roboto)" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

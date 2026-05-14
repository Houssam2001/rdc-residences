"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export default function ValueCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      data-cursor="Voir"
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -6, transition: { duration: 0.35 } }}
      className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent rounded-2xl" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center mb-8 group-hover:border-white/[0.15] transition-all duration-500">
          <Icon className="w-4 h-4 text-white/25 group-hover:text-white/50 transition-colors duration-500" />
        </div>

        {/* Card title — serif */}
        <h3
          className="text-2xl font-light italic mb-4 text-white/80 group-hover:text-white transition-colors duration-500 tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h3>

        {/* Card description — sans */}
        <p
          className="text-[12px] text-white/30 font-light leading-[1.9] tracking-wide group-hover:text-white/40 transition-colors duration-500"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

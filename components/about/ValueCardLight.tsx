"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export default function ValueCardLight({
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
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -6, transition: { duration: 0.35 } }}
      className="group relative bg-white/60 border border-black/[0.05] rounded-2xl p-10 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent rounded-2xl" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl border border-black/[0.06] flex items-center justify-center mb-8 group-hover:border-black/[0.12] transition-all duration-500">
          <Icon className="w-4 h-4 text-black/20 group-hover:text-black/45 transition-colors duration-500" />
        </div>

        {/* Card title — serif italic */}
        <h3
          className="text-2xl font-light italic mb-4 text-black/70 group-hover:text-black transition-colors duration-500 tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h3>

        {/* Card description — sans */}
        <p
          className="text-[12px] text-black/30 font-light leading-[1.9] tracking-wide group-hover:text-black/45 transition-colors duration-500"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

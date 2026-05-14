"use client";

import { motion } from "framer-motion";

/*
 * Abstracted architectural floor-plan SVG inspired by the BW apartment blueprint.
 * Rendered as a decorative background that fades in on scroll.
 * Each path group draws in sequentially using strokeDashoffset animation.
 */

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 2.5,
        delay: i * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: { duration: 0.4, delay: i * 0.15 },
    },
  }),
};

export default function BlueprintSVG() {
  return (
    <motion.svg
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* ─── Outer boundary / perimeter ─── */}
      <motion.path
        custom={0}
        variants={pathVariants}
        d="M200 150 L900 150 Q950 150 950 200 L950 550 Q950 600 900 600 L600 600 Q580 600 560 620 L500 680 Q480 700 460 680 L400 620 Q380 600 360 600 L200 600 Q150 600 150 550 L150 200 Q150 150 200 150 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* ─── Interior walls — bedrooms (left wing) ─── */}
      <motion.path
        custom={1}
        variants={pathVariants}
        d="M400 150 L400 380 M400 250 L200 250 M300 150 L300 250 M400 380 L150 380"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* ─── Bathroom partition ─── */}
      <motion.path
        custom={2}
        variants={pathVariants}
        d="M300 250 L300 380 M250 310 L350 310"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      {/* ─── Kitchen / corridor ─── */}
      <motion.path
        custom={3}
        variants={pathVariants}
        d="M400 380 L400 500 M400 500 L550 500 M550 380 L550 500 M400 440 L550 440"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* ─── Living room walls ─── */}
      <motion.path
        custom={4}
        variants={pathVariants}
        d="M550 150 L550 380 M550 300 L750 300 M750 150 L750 380 M550 380 L750 380"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* ─── Master suite (right wing) ─── */}
      <motion.path
        custom={5}
        variants={pathVariants}
        d="M750 150 L750 450 M750 450 L950 450 M850 300 L850 450 M850 370 L950 370"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* ─── Terrace / outdoor ─── */}
      <motion.path
        custom={6}
        variants={pathVariants}
        d="M600 500 L900 500 L900 600 M700 500 L700 580 M800 500 L800 560"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="4 3"
      />

      {/* ─── Balcony railing ─── */}
      <motion.path
        custom={7}
        variants={pathVariants}
        d="M550 600 L950 600"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="6 4"
      />

      {/* ─── Door swings ─── */}
      <motion.path
        custom={8}
        variants={pathVariants}
        d="M400 200 Q430 200 430 230 M400 320 Q430 320 430 350 M550 420 Q580 420 580 450 M750 350 Q780 350 780 380"
        stroke="currentColor"
        strokeWidth="0.6"
      />

      {/* ─── Windows (small rectangles) ─── */}
      <motion.rect custom={9} variants={pathVariants} x="220" y="147" width="60" height="6" rx="1" stroke="currentColor" strokeWidth="0.6" />
      <motion.rect custom={9} variants={pathVariants} x="600" y="147" width="80" height="6" rx="1" stroke="currentColor" strokeWidth="0.6" />
      <motion.rect custom={9} variants={pathVariants} x="800" y="147" width="80" height="6" rx="1" stroke="currentColor" strokeWidth="0.6" />
      <motion.rect custom={9} variants={pathVariants} x="147" y="420" width="6" height="60" rx="1" stroke="currentColor" strokeWidth="0.6" />
      <motion.rect custom={9} variants={pathVariants} x="947" y="250" width="6" height="60" rx="1" stroke="currentColor" strokeWidth="0.6" />

      {/* ─── Furniture hints — subtle rectangles ─── */}
      {/* Bed 1 */}
      <motion.rect custom={10} variants={pathVariants} x="210" y="170" width="60" height="55" rx="3" stroke="currentColor" strokeWidth="0.4" />
      {/* Bed 2 */}
      <motion.rect custom={10} variants={pathVariants} x="320" y="170" width="55" height="55" rx="3" stroke="currentColor" strokeWidth="0.4" />
      {/* Sofa */}
      <motion.rect custom={10} variants={pathVariants} x="590" y="320" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="0.4" />
      {/* Dining table */}
      <motion.ellipse custom={11} variants={pathVariants} cx="650" cy="220" rx="40" ry="25" stroke="currentColor" strokeWidth="0.4" />
      {/* Bathtub */}
      <motion.rect custom={11} variants={pathVariants} x="260" y="270" width="30" height="20" rx="6" stroke="currentColor" strokeWidth="0.4" />
      {/* Kitchen counter */}
      <motion.path custom={11} variants={pathVariants} d="M410 395 L540 395 L540 430 L410 430" stroke="currentColor" strokeWidth="0.4" />

      {/* ─── Measurement lines ─── */}
      <motion.g custom={12} variants={pathVariants}>
        <motion.line x1="150" y1="120" x2="950" y2="120" stroke="currentColor" strokeWidth="0.3" />
        <motion.line x1="150" y1="115" x2="150" y2="125" stroke="currentColor" strokeWidth="0.3" />
        <motion.line x1="950" y1="115" x2="950" y2="125" stroke="currentColor" strokeWidth="0.3" />
        <motion.line x1="120" y1="150" x2="120" y2="600" stroke="currentColor" strokeWidth="0.3" />
        <motion.line x1="115" y1="150" x2="125" y2="150" stroke="currentColor" strokeWidth="0.3" />
        <motion.line x1="115" y1="600" x2="125" y2="600" stroke="currentColor" strokeWidth="0.3" />
      </motion.g>

      {/* ─── Landscaping dots (garden/plants) ─── */}
      {[
        [170, 590], [190, 580], [180, 570],
        [930, 580], [920, 560], [940, 570],
        [650, 690], [670, 695], [690, 685],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          custom={13}
          variants={pathVariants}
          cx={cx}
          cy={cy}
          r="3"
          stroke="currentColor"
          strokeWidth="0.4"
        />
      ))}
    </motion.svg>
  );
}

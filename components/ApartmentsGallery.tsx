"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ApartmentData } from "@/lib/utils";
import NavbarLight from "./NavbarLight";

/* ─── Stagger variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ApartmentsGallery({
  apartments,
}: {
  apartments: ApartmentData[];
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  /* Track mouse for floating preview */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  /* GSAP animations */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Horizontal line grows on scroll */
    gsap.fromTo(
      ".hero-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0.8,
      }
    );

    /* Marquee scroll */
    gsap.to(".apartments-marquee", {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee-wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    /* Parallax on individual cards */
    gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40 + (i % 3) * 20 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      className="relative w-full min-h-screen bg-[#f8f6f3] text-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <NavbarLight />

      {/* ━━━ HERO ━━━ */}
      <motion.section
        style={{ y: heroParallax }}
        className="relative w-full pt-44 pb-28 px-6 md:px-20 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[9px] uppercase tracking-[0.7em] text-black/30 mb-10 font-normal"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          Notre Portfolio
        </motion.p>

        {/* Main heading — large serif italic */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl sm:text-8xl md:text-[11rem] font-light italic leading-[0.85] tracking-[-0.03em] mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          La Collection
        </motion.h1>

        {/* Decorative line */}
        <div
          className="hero-line mx-auto w-20 h-[0.5px] bg-black/15 mb-10"
          style={{ transformOrigin: "center" }}
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-black/35 max-w-md mx-auto font-light leading-[1.8] italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Explorez notre sélection de résidences premium, conçues pour
          l&apos;exception.
        </motion.p>

        {/* Count badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 inline-flex items-center gap-3"
        >
          <span
            className="text-[9px] uppercase tracking-[0.5em] text-black/20"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            {apartments.length} résidences
          </span>
        </motion.div>
      </motion.section>

      {/* ━━━ MARQUEE ━━━ */}
      <section className="marquee-wrap relative py-14 overflow-hidden border-y border-black/[0.04]">
        <div className="apartments-marquee flex gap-20 whitespace-nowrap will-change-transform">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-7xl md:text-9xl font-light italic text-black/[0.03] tracking-tight select-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Résidences · Architecture · Lumière · Espace ·&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ━━━ GALLERY GRID ━━━ */}
      <section className="relative w-full px-6 md:px-16 lg:px-24 py-32" ref={galleryRef}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {apartments.map((apt, idx) => (
            <motion.div
              key={apt.slug + idx}
              variants={itemVariants}
              className={`gallery-card ${idx % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <Link
                href={`/apartments/${apt.slug}`}
                className="group block relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  {/* BW image (base) */}
                  <Image
                    src={"/bw-apartments-transparent/" + apt.imagePath}
                    alt={apt.name}
                    fill
                    className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:opacity-0"
                  />

                  {/* Color image (reveal on hover) */}
                  {apt.colorImagePath && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <Image
                        src={"/apartments/" + apt.colorImagePath}
                        alt={apt.name + " color"}
                        fill
                        className="object-cover scale-[1.08]"
                      />
                    </div>
                  )}

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Hover arrow */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>

                {/* Card info */}
                <div className="mt-6 flex items-start justify-between">
                  <div>
                    {/* Index number */}
                    <span
                      className="text-[9px] tracking-[0.5em] uppercase text-black/20 font-normal block mb-2"
                      style={{ fontFamily: "var(--font-roboto)" }}
                    >
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>

                    {/* Apartment name — serif */}
                    <h3
                      className="text-2xl md:text-3xl font-light italic text-black/70 group-hover:text-black transition-colors duration-500 tracking-[-0.01em]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {apt.name}
                    </h3>
                  </div>

                  {/* Explore text */}
                  <span
                    className="text-[9px] uppercase tracking-[0.4em] text-black/20 group-hover:text-black/50 transition-colors duration-500 mt-6 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    Voir
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-500" />
                  </span>
                </div>

                {/* Bottom divider */}
                <div className="mt-6 h-[0.5px] bg-black/[0.06] group-hover:bg-black/[0.12] transition-colors duration-700" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ━━━ FLOATING CURSOR PREVIEW ━━━ */}
      <AnimatePresence>
        {hoveredIdx !== null && (
          <motion.div
            className="fixed pointer-events-none z-40 mix-blend-difference"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 20,
            }}
          >
            <span
              className="text-sm italic text-white font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Explorer →
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━ CTA ━━━ */}
      <section className="relative w-full py-40 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[9px] uppercase tracking-[0.6em] text-black/20 mb-8"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Vous n&apos;avez pas trouvé ?
          </p>
          <h2
            className="text-5xl md:text-8xl font-light italic tracking-[-0.02em] text-black/80 mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Contactez-nous
          </h2>
          <p
            className="text-black/30 text-[13px] font-light mb-14 max-w-sm mx-auto leading-[2] tracking-wide"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Notre équipe est à votre disposition pour vous guider vers la
            résidence parfaite.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-5 border border-black/15 text-black px-14 py-5 rounded-full text-[10px] uppercase tracking-[0.35em] font-normal hover:bg-black hover:text-white transition-all duration-700"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Prendre Contact
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-500" />
          </Link>
        </motion.div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="relative border-t border-black/[0.05] py-20 px-6 md:px-20 bg-[#f8f6f3]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-black/15 font-normal"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            &copy; {new Date().getFullYear()} RDC Résidences
          </p>
          <div className="flex gap-10">
            {[
              { href: "/", label: "Accueil" },
              { href: "/about", label: "À Propos" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-[0.3em] uppercase text-black/15 hover:text-black/50 transition-colors duration-500 font-normal"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

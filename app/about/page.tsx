"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Gem,
  TreePine,
  Users,
  Award,
  Globe,
} from "lucide-react";
import NavbarLight from "@/components/NavbarLight";
import CursorFollowerLight from "@/components/about/CursorFollowerLight";
import AnimatedCounterLight from "@/components/about/AnimatedCounterLight";
import ValueCardLight from "@/components/about/ValueCardLight";

const ArchitectureSceneLight = lazy(
  () => import("@/components/about/ArchitectureSceneLight")
);

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const values = [
  { icon: Shield, title: "Qualité Inégalée", desc: "Construction aux standards européens avec des matériaux premium sélectionnés à l'international." },
  { icon: Gem, title: "Design Intemporel", desc: "Une architecture qui transcende les tendances, créant des espaces beaux pour les générations à venir." },
  { icon: TreePine, title: "Nature d'Abord", desc: "Chaque développement préserve et valorise le paysage naturel environnant." },
  { icon: Users, title: "Communauté Engagée", desc: "Nous construisons des quartiers où les familles se connectent et s'épanouissent." },
  { icon: Award, title: "Excellence d'Investissement", desc: "Propriétés positionnées dans des zones à forte demande avec des rendements solides." },
  { icon: Globe, title: "Standards Internationaux", desc: "Accessible aux acheteurs internationaux avec un accompagnement complet." },
];

/* ─── page ─── */
export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouseNorm({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Hero line animation */
    gsap.fromTo(
      ".hero-line-about",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power3.inOut", delay: 0.8 }
    );

    /* Marquee scroll */
    gsap.to(".marquee-track-about", {
      xPercent: -50,
      ease: "none",
      scrollTrigger: { trigger: ".marquee-section-about", start: "top bottom", end: "bottom top", scrub: 1 },
    });

    /* Parallax on the story image */
    gsap.to(".story-image-about", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: { trigger: ".story-section-about", start: "top bottom", end: "bottom top", scrub: 1 },
    });

    /* Text reveal lines */
    gsap.utils.toArray<HTMLElement>(".line-reveal-about").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    /* Quote words stagger */
    gsap.utils.toArray<HTMLElement>(".quote-word").forEach((word, i) => {
      gsap.fromTo(word,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: ".quote-section", start: "top 80%" },
        }
      );
    });

    /* Blueprint SVG — scroll-driven zoom + parallax */
    gsap.fromTo(
      ".blueprint-svg",
      { scale: 0.85, rotate: -6 },
      {
        scale: 1.15,
        rotate: 6,
        ease: "none",
        scrollTrigger: {
          trigger: ".blueprint-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  /* Split quote into words for stagger animation */
  const quoteText = "L'architecture est le jeu savant, correct et magnifique des volumes assemblés sous la lumière.";
  const quoteWords = quoteText.split(" ");

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#f8f6f3] text-black overflow-hidden">
      <CursorFollowerLight />
      <NavbarLight />

      {/* ━━━ HERO ━━━ */}
      <motion.section
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      >
        {/* 3D Background */}
        <Suspense fallback={null}>
          <ArchitectureSceneLight mouseX={mouseNorm.x} mouseY={mouseNorm.y} />
        </Suspense>

        {/* Warm radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,184,154,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <motion.div className="relative z-10" initial="hidden" animate="visible">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-[9px] uppercase tracking-[0.7em] text-black/25 mb-10 font-normal"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Notre Histoire
          </motion.p>

          {/* Hero heading — serif italic */}
          <motion.h1 custom={1} variants={fadeUp} className="mb-10">
            <span
              className="block text-6xl sm:text-8xl md:text-[11rem] font-light italic leading-[0.85] tracking-[-0.03em] text-black/80"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              À Propos
            </span>
            <span
              className="block text-[11px] sm:text-sm uppercase tracking-[0.5em] text-black/20 mt-6 font-normal"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              de RDC Résidences
            </span>
          </motion.h1>

          {/* Thin divider */}
          <div
            className="hero-line-about mx-auto w-16 h-[0.5px] bg-black/10 mb-10"
            style={{ transformOrigin: "center" }}
          />

          {/* Sub-heading */}
          <motion.p
            custom={3}
            variants={fadeUp}
            className="text-lg md:text-2xl text-black/30 max-w-lg mx-auto font-light leading-[1.7] italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Où l&apos;architecture moderne rencontre la nature, et où chaque
            espace raconte une histoire.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-16 flex flex-col items-center gap-3"
          >
            <span
              className="text-[8px] uppercase tracking-[0.5em] text-black/15"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              Défiler
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-[0.5px] h-10 bg-gradient-to-b from-black/15 to-transparent"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ━━━ MARQUEE ━━━ */}
      <section className="marquee-section-about relative py-20 overflow-hidden border-y border-black/[0.04]">
        <div className="marquee-track-about flex gap-24 whitespace-nowrap will-change-transform">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-7xl md:text-9xl font-light italic text-black/[0.03] tracking-tight select-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Architecture · Design · Résidences · Premium ·&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ━━━ STORY ━━━ */}
      <section className="story-section-about relative w-full px-6 md:px-20 py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            data-cursor="Explorer"
          >
            <div className="story-image-about absolute inset-0 scale-110">
              <Image
                src="/bw-aparments/01 OK Sud - BLEU CLAIR PLEIN SUD.png"
                alt="Architecture RDC"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f3]/40 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p
                className="text-[9px] uppercase tracking-[0.5em] text-black/30 mb-2"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Résidence Signature
              </p>
              <p
                className="text-base text-black/50 font-light italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Vue Sud · Exposition plein soleil
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[9px] uppercase tracking-[0.6em] text-black/25 mb-10 font-normal"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              La Vision
            </p>

            <h2
              className="line-reveal-about text-5xl md:text-7xl font-light italic leading-[1.1] tracking-[-0.01em] mb-12 text-black/80"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Conçu pour ceux
              <br />
              qui exigent{" "}
              <span className="not-italic font-semibold text-black">
                davantage.
              </span>
            </h2>

            <div className="space-y-6 max-w-md">
              <p
                className="text-[13px] text-black/35 font-light leading-[2] tracking-wide"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                RDC Résidences est né d&apos;une conviction simple :
                l&apos;habitat premium ne devrait exiger aucun compromis. Chaque
                résidence a été conçue de zéro pour maximiser la lumière
                naturelle et la connexion avec l&apos;environnement.
              </p>
              <p
                className="text-[13px] text-black/35 font-light leading-[2] tracking-wide"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                De la précision de notre architecture à la sérénité de nos
                aménagements paysagers, chaque détail crée un sanctuaire où les
                familles s&apos;épanouissent.
              </p>
            </div>

            <motion.div
              className="mt-12 w-16 h-[0.5px] bg-gradient-to-r from-black/15 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ━━━ EDITORIAL QUOTE ━━━ */}
      <section className="quote-section relative w-full px-6 md:px-20 py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto w-8 h-[0.5px] bg-black/8 mb-14" />
          <blockquote>
            <p
              className="text-3xl md:text-5xl lg:text-6xl font-light italic leading-[1.3] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;{quoteWords.map((word, i) => (
                <span key={i} className="quote-word inline-block mr-[0.3em] text-black/55">
                  {word}
                </span>
              ))}&rdquo;
            </p>
            <footer className="mt-12">
              <span
                className="text-[9px] uppercase tracking-[0.5em] text-black/20 font-normal"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Le Corbusier
              </span>
            </footer>
          </blockquote>
          <div className="mx-auto w-8 h-[0.5px] bg-black/8 mt-14" />
        </motion.div>
      </section>

      {/* ━━━ VALUES ━━━ */}
      <section className="relative w-full px-6 md:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-[9px] uppercase tracking-[0.6em] text-black/25 mb-8 font-normal"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              Ce Qui Nous Anime
            </p>
            <h2
              className="text-5xl md:text-8xl font-light italic tracking-[-0.02em] text-black/80"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Nos Valeurs
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ValueCardLight key={i} icon={v.icon} title={v.title} desc={v.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ STATS ━━━ */}
      <section className="relative w-full px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="relative rounded-2xl border border-black/[0.04] overflow-hidden"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl" />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 p-12 md:p-20">
              <AnimatedCounterLight end={43} suffix="+" label="Résidences" />
              <AnimatedCounterLight end={5} suffix=".2" label="Hectares" />
              <AnimatedCounterLight end={100} suffix="%" label="Paysagé" />
              <AnimatedCounterLight end={24} suffix="/7" label="Sécurité" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ BLUEPRINT CTA (merged image + CTA) ━━━ */}
      <section className="blueprint-section relative w-full py-56 md:py-80 flex flex-col items-center text-center px-6 overflow-hidden">
        {/* Actual architectural SVG as background — fSOUp01.svg */}
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="blueprint-svg w-[140%] max-w-[1600px] aspect-square opacity-[0.12]"
            style={{
              backgroundImage: "url(/fSOUp01.svg)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              willChange: "transform",
            }}
          />
        </motion.div>

        {/* Radial vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#f8f6f3_75%)] pointer-events-none" />

        {/* Top fade from page bg */}
        <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-[#f8f6f3] to-transparent pointer-events-none" />
        {/* Bottom fade into footer */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#f8f6f3] to-transparent pointer-events-none" />

        {/* Floating label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[8px] uppercase text-black/20 font-normal mb-20 relative z-10"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          L&apos;art de vivre autrement
        </motion.p>

        {/* CTA content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-5xl md:text-8xl lg:text-9xl font-light italic tracking-[-0.02em] text-black/80 mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Prêt à découvrir ?
          </h2>
          <p
            className="text-black/50 text-[13px] font-light mb-14 max-w-sm mx-auto leading-[2] tracking-wide"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Explorez notre collection de résidences premium et trouvez votre
            sanctuaire.
          </p>
          <Link
            href="/apartments"
            data-cursor="Go"
            className="group inline-flex items-center gap-5 border border-black/25 text-black/80 px-14 py-5 rounded-full text-[10px] uppercase tracking-[0.35em] font-normal hover:bg-black hover:text-white transition-all duration-700"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Voir la Collection
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-500" />
          </Link>
        </motion.div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="relative border-t border-black/[0.04] py-20 px-6 md:px-20 bg-[#f8f6f3]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-black/35 font-normal"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            &copy; {new Date().getFullYear()} RDC Résidences
          </p>
          <div className="flex gap-10">
            {[
              { href: "/", label: "Accueil" },
              { href: "/apartments", label: "Collection" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-[0.3em] uppercase text-black/35 hover:text-black/70 transition-colors duration-500 font-normal"
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

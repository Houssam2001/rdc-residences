"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Bed, Bath, Maximize, Compass, ChevronDown, ArrowRight, Phone, Mail, Shield, TreePine } from "lucide-react";
import { ApartmentData } from "@/lib/utils";

export default function ApartmentDetail({ apartment }: { apartment: ApartmentData }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [activeImage, setActiveImage] = useState(0);

  // Drag Carousel State
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [cursorDirection, setCursorDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHoveringCarousel) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        setCursorDirection(e.clientX < window.innerWidth / 2 ? "left" : "right");
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHoveringCarousel, cursorX, cursorY]);

  // Build gallery: color from /apartments, bw from /bw-apartments-transparent
  const gallery = (apartment.galleryImages || [apartment.imagePath]).map((img) => {
    const isBw = apartment.bwImagePath && img === apartment.bwImagePath;
    return { src: (isBw ? "/bw-apartments-transparent/" : "/apartments/") + img, label: isBw ? "N&B" : "Couleur" };
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
      ".hero-pills",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.7 }
    );

    // Reveal sections
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const exposure = apartment.name.includes("Sud") ? "Sud" : apartment.name.includes("Nord") ? "Nord" : "Panoramique";

  const features = apartment.composition || [
    { zone: "Séjour & Salle à Manger", desc: "Espace ouvert baigné de lumière naturelle grâce aux baies vitrées du sol au plafond. Conçu pour la convivialité et le confort quotidien.", markerPosition: { top: "35%", left: "45%" } },
    { zone: "Cuisine Équipée", desc: "Cuisine européenne entièrement intégrée avec comptoirs en pierre naturelle, électroménagers haut de gamme et îlot central fonctionnel.", markerPosition: { top: "55%", left: "65%" } },
    { zone: "Suite Parentale", desc: "Chambre principale avec dressing intégré et salle de bain privative. Terrasse accessible directement depuis la suite.", markerPosition: { top: "25%", left: "60%" } },
    { zone: "Terrasse Privée", desc: "Espace extérieur généreux offrant une vue panoramique sur le paysage environnant. Idéal pour les moments de détente.", markerPosition: { top: "65%", left: "35%" } },
  ];

  const specs = [
    { category: "Structure", items: ["Dalle béton armé", "Isolation thermique renforcée", "Menuiseries aluminium"] },
    { category: "Extérieur", items: ["Terrasse privée carrelée", "Jardins paysagers", "Parking couvert"] },
    { category: "Intérieur", items: ["Parquet contrecollé", "Cuisine européenne intégrée", "Sanitaires haut de gamme"] },
    { category: "Systèmes", items: ["Pré-câblage domotique", "Climatisation gainable", "Chauffe-eau solaire"] },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8f6f3] text-black overflow-hidden" style={{ fontFamily: "var(--font-roboto)" }}>

      {/* Custom Drag Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-[72px] h-[72px] rounded-full bg-white/95 backdrop-blur-sm pointer-events-none z-[100] flex items-center justify-center shadow-lg"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHoveringCarousel ? 1 : 0,
          scale: isHoveringCarousel ? 1 : 0.5,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        {cursorDirection === "left" ? (
          <ArrowLeft className="w-6 h-6 text-black/80" />
        ) : (
          <ArrowRight className="w-6 h-6 text-black/80" />
        )}
      </motion.div>

      {/* ===== FLOATING BACK NAV ===== */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/apartments"
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-normal text-black/60 bg-[#f8f6f3]/80 backdrop-blur-md rounded-full px-6 py-3 border border-black/10 hover:text-black hover:bg-white transition-all duration-500"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-500" />
          Retour
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen">
        <Image
          src={gallery[activeImage]?.src || "/apartments/" + apartment.imagePath}
          alt={apartment.name}
          fill
          className="object-cover transition-opacity duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Title */}
        <div className="hero-title absolute bottom-16 md:bottom-20 left-6 md:left-16 opacity-0">
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[11rem] font-light italic text-white leading-[0.85] tracking-[-0.03em] drop-shadow-2xl" style={{ fontFamily: "var(--font-serif)" }}>
            {apartment.name.split(" ").slice(0, 2).join(" ")}
          </h1>
        </div>

        {/* Pill Badges */}
        <div className="hero-pills absolute bottom-6 md:bottom-8 left-6 md:left-16 flex flex-wrap gap-3 opacity-0">
          <span className="bg-white/10 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.3em] font-normal px-5 py-2.5 rounded-full border border-white/20">3 Chambres</span>
          <span className="bg-white/10 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.3em] font-normal px-5 py-2.5 rounded-full border border-white/20">3 SdB</span>
          <span className="bg-white/10 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.3em] font-normal px-5 py-2.5 rounded-full border border-white/20">185 m²</span>
          <span className="bg-white/10 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.3em] font-normal px-5 py-2.5 rounded-full border border-white/20">{exposure}</span>
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 1 && (
          <div className="absolute bottom-6 md:bottom-8 right-6 md:right-16 flex gap-3">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  activeImage === i ? "border-white shadow-xl scale-110" : "border-white/30 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt={img.label} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ===== OVERVIEW SPLIT ===== */}
      <section className="reveal w-full px-6 md:px-16 py-24 md:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — Narrative */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Présentation</p>
            <h2 className="text-4xl md:text-6xl font-light italic leading-tight mb-8 text-black/80 tracking-[-0.02em]" style={{ fontFamily: "var(--font-serif)" }}>
              Un Cadre de Vie d&apos;Exception
            </h2>
            <p className="text-[13px] text-black/40 font-light leading-[2] tracking-wide mb-8">
              <strong className="text-black font-medium">{apartment.name}</strong> offre un agencement élégant pour un mode de vie moderne sans compromis. Chaque résidence dispose de vastes espaces de vie, de cuisines dernier cri et de terrasses privées offrant des vues imprenables et une connexion harmonieuse avec la nature.
            </p>
          </div>
          {/* Right — Quick Specs */}
          <div className="flex flex-col justify-center">
            <div className="border-t border-black/[0.06] pt-8 space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-black/[0.04]">
                <span className="text-sm uppercase tracking-widest text-black/50 font-medium">Surface</span>
                <span className="text-2xl font-light italic" style={{ fontFamily: "var(--font-serif)" }}>185 m²</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-black/[0.04]">
                <span className="text-sm uppercase tracking-widest text-black/50 font-medium">Chambres</span>
                <span className="text-2xl font-light italic" style={{ fontFamily: "var(--font-serif)" }}>3</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-black/[0.04]">
                <span className="text-sm uppercase tracking-widest text-black/50 font-medium">Salles de Bain</span>
                <span className="text-2xl font-light italic" style={{ fontFamily: "var(--font-serif)" }}>3</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-black/[0.04]">
                <span className="text-sm uppercase tracking-widest text-black/50 font-medium">Exposition</span>
                <span className="text-2xl font-light italic" style={{ fontFamily: "var(--font-serif)" }}>{exposure}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm uppercase tracking-widest text-black/50 font-medium">Statut</span>
                <span className="bg-black text-white text-[9px] font-normal px-4 py-2 rounded-full uppercase tracking-[0.3em]">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FULL-WIDTH IMAGE ===== */}
      <section className="reveal w-full px-6 md:px-16">
        <div className="max-w-7xl mx-auto relative aspect-[16/9] rounded-[2.5rem] overflow-hidden">
          <Image
            src={"/apartments/" + apartment.imagePath}
            alt={apartment.name + " vue"}
            fill
            className="object-cover hover:scale-[1.03] transition-transform duration-[1.5s]"
          />
        </div>
      </section>

      {/* ===== ZONES ACCORDION ===== */}
      <section className="reveal relative w-full overflow-hidden py-24 md:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
          {/* Left — Image with background removed via blend */}
          <div className="relative h-[500px] md:h-[700px]">
            <Image
              src={apartment.bwImagePath ? "/bw-apartments-transparent/" + apartment.bwImagePath : "/apartments/" + apartment.imagePath}
              alt="Composition"
              fill
              className="object-contain"
            />
            {/* Interactive Markers */}
            {features.map((f: any, i: number) => {
              const pos = f.markerPosition || { top: "50%", left: "50%" };
              const isOpen = openAccordion === i;

              return (
                <button
                  key={i}
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className={`absolute w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-mono transition-all duration-500 hover:scale-110 z-10
                    ${isOpen ? "bg-black text-white shadow-lg shadow-black/20 scale-110" : "bg-white/80 text-black border border-black/[0.08] backdrop-blur-sm hover:bg-white"}`}
                  style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}
                  aria-label={`Voir ${f.zone}`}
                >
                  {(i + 1).toString().padStart(2, "0")}
                  {isOpen && (
                    <span className="absolute inset-0 rounded-full border border-black animate-ping opacity-50" style={{ animationDuration: "3s" }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — Accordion */}
          <div className="px-6 md:px-16">
            <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Espaces de Vie</p>
            <h2 className="text-5xl md:text-7xl font-light italic tracking-[-0.02em] leading-tight mb-12" style={{ fontFamily: "var(--font-serif)" }}>
              Composition
            </h2>
            <div className="flex flex-col">
              {features.map((f, i) => (
                <div key={i} className="border-t border-black/[0.06]">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-black/40 font-mono">{(i + 1).toString().padStart(2, "0")}</span>
                      <span className="text-lg md:text-xl font-medium group-hover:text-black transition-colors">{f.zone}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-black/40 transition-transform duration-300 ${openAccordion === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openAccordion === i ? "max-h-40 pb-6" : "max-h-0"}`}>
                    <p className="text-black/60 font-light leading-relaxed pl-10">{f.desc}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-black/[0.06]" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALTERNATING FEATURE BLOCKS ===== */}
      <section className="reveal w-full px-6 md:px-16 pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Environnement</p>
            <h2 className="text-5xl md:text-7xl font-light italic tracking-[-0.02em] leading-tight mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              En Harmonie avec la Nature
            </h2>
            <p className="text-lg text-black/70 font-light leading-relaxed mb-8">
              Niché au sein d&apos;un développement exclusif, chaque résidence RDC bénéficie d&apos;un accès privilégié aux plages, réserves naturelles et commodités urbaines. L&apos;équilibre parfait entre tranquillité et vie moderne.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Plages", "Réserves Naturelles", "Commerces", "Écoles", "Golf"].map((tag) => (
                <span key={tag} className="bg-black/[0.06] border border-black/[0.04] text-black/70 text-xs font-medium px-4 py-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-square rounded-[2.5rem] overflow-hidden">
            <Image
              src={"/apartments/" + apartment.imagePath}
              alt="Environnement"
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-[1.5s]"
            />
          </div>
        </div>
      </section>

      {/* ===== FLOORPLANS & ELEVATIONS ===== */}
      <section className="reveal w-full px-6 md:px-16 py-24 md:py-32 bg-[#f8f6f3] border-t border-black/[0.05]">
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-light italic tracking-[-0.02em] text-black/80" style={{ fontFamily: "var(--font-serif)" }}>
            Floorplans & Elevations
          </h2>
        </div>

        {/* Drag Scrollable Container */}
        <div 
          className="max-w-7xl mx-auto overflow-hidden"
          onMouseEnter={() => setIsHoveringCarousel(true)}
          onMouseLeave={() => setIsHoveringCarousel(false)}
          ref={carouselRef}
        >
          <motion.div 
            drag="x"
            dragConstraints={carouselRef}
            dragElastic={0.1}
            whileTap={{ cursor: "none" }}
            className="flex gap-8 pb-10 w-max cursor-none"
          >
            {[
              { title: "Rear patio and surrounded garden space of " + apartment.name, image: "/bw-apartments-transparent/" + apartment.imagePath },
              { title: apartment.name + " Elevation", image: "/bw-apartments-transparent/" + apartment.imagePath },
              { title: "Full floorplan", image: "/bw-apartments-transparent/" + apartment.imagePath },
            ].map((plan, i) => (
              <motion.div 
                key={i} 
                className="w-[85vw] md:w-[45vw] lg:w-[40vw] flex flex-col gap-6 pointer-events-none"
              >
                <div className="relative aspect-[4/3] w-full rounded-[2rem] border border-black/[0.04] bg-[#EBE9E4] overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.title}
                    fill
                    className="object-contain p-10 mix-blend-multiply"
                    draggable={false}
                  />
                </div>
                <div>
                  <p className="text-[14px] text-black/80 font-medium tracking-wide">{plan.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SPECIFICATIONS TABLE ===== */}
      <section className="reveal w-full px-6 md:px-16 py-24 md:py-40 bg-black/[0.02]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Détails Techniques</p>
          <h2 className="text-5xl md:text-7xl font-light italic tracking-[-0.02em] leading-tight mb-16" style={{ fontFamily: "var(--font-serif)" }}>
            Spécifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {specs.map((cat, i) => (
              <div key={i}>
                <h4 className="text-xs uppercase tracking-[0.3em] text-black/50 font-semibold mb-6 pb-4 border-b border-black/[0.06]">{cat.category}</h4>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-black/70 font-light">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INVESTMENT HIGHLIGHTS ===== */}
      <section className="reveal w-full px-6 md:px-16 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Valeur</p>
            <h2 className="text-5xl md:text-7xl font-light italic tracking-[-0.02em]" style={{ fontFamily: "var(--font-serif)" }}>
              Pourquoi Investir
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: "Construction Premium", desc: "Standards européens avec des matériaux de qualité supérieure et des finitions irréprochables." },
              { icon: TreePine, title: "Cadre Naturel", desc: "Jardins paysagers, allées arborées et piscine à débordement dans un environnement verdoyant." },
              { icon: Compass, title: "Emplacement Stratégique", desc: "Forte demande locative, appréciation du capital et accessibilité aux acheteurs internationaux." },
            ].map((b, i) => (
              <div key={i} className="bg-black/[0.04] rounded-[2rem] p-10 border border-[#3D4536]/[0.06] hover:border-black/[0.06] transition-all duration-500 group">
                <b.icon className="w-8 h-8 text-black/30 mb-6 group-hover:text-black transition-colors" />
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-black/60 font-light leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="w-full bg-[#f8f6f3] py-24 md:py-32 px-6 md:px-16 border-t border-black/[0.05]">
        <div className="reveal max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Prochaine Étape</p>
            <h2 className="text-5xl md:text-7xl font-light italic tracking-[-0.02em] leading-tight mb-8 text-black/80" style={{ fontFamily: "var(--font-serif)" }}>
              Planifiez Votre Visite Privée
            </h2>
            <p className="text-[13px] text-black/40 font-light leading-[2] tracking-wide mb-10">
              Notre équipe est à votre disposition pour organiser une visite personnalisée de cette résidence. Découvrez chaque détail en personne.
            </p>
            <div className="flex flex-col gap-4 text-black/50 text-[13px] font-light tracking-wide">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-black/30" />
                <span>+212 5XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-black/30" />
                <span>info@rdc-residences.com</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-black/[0.04] p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <form className="flex flex-col gap-5">
              <input type="text" placeholder="Nom complet" className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light" />
              <input type="email" placeholder="Adresse e-mail" className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light" />
              <input type="tel" placeholder="Numéro de téléphone" className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light" />
              <textarea placeholder="Votre message..." rows={3} className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light resize-none"></textarea>
              <button type="button" className="group mt-2 w-full flex items-center justify-center gap-3 bg-black text-white py-5 rounded-xl text-[10px] uppercase tracking-[0.3em] font-normal hover:bg-black/80 transition-colors">
                Demander une Visite
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-black/[0.05] py-20 px-6 md:px-20 bg-[#f8f6f3]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-black/15 font-normal" style={{ fontFamily: "var(--font-roboto)" }}>
            &copy; {new Date().getFullYear()} RDC Résidences
          </p>
          <div className="flex gap-10">
            <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-black/15 hover:text-black/50 transition-colors font-normal">Accueil</Link>
            <Link href="/apartments" className="text-[10px] tracking-[0.3em] uppercase text-black/15 hover:text-black/50 transition-colors font-normal">Collection</Link>
            <Link href="/contact" className="text-[10px] tracking-[0.3em] uppercase text-black/15 hover:text-black/50 transition-colors font-normal">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

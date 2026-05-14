"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Bed, Bath, Maximize, Compass, ChevronDown, ArrowRight, Phone, Mail, Shield, TreePine } from "lucide-react";
import { ApartmentData } from "@/lib/utils";

export default function ApartmentDetail({ apartment }: { apartment: ApartmentData }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

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

  const features = [
    { zone: "Séjour & Salle à Manger", desc: "Espace ouvert baigné de lumière naturelle grâce aux baies vitrées du sol au plafond. Conçu pour la convivialité et le confort quotidien." },
    { zone: "Cuisine Équipée", desc: "Cuisine européenne entièrement intégrée avec comptoirs en pierre naturelle, électroménagers haut de gamme et îlot central fonctionnel." },
    { zone: "Suite Parentale", desc: "Chambre principale avec dressing intégré et salle de bain privative. Terrasse accessible directement depuis la suite." },
    { zone: "Terrasse Privée", desc: "Espace extérieur généreux offrant une vue panoramique sur le paysage environnant. Idéal pour les moments de détente." },
  ];

  const specs = [
    { category: "Structure", items: ["Dalle béton armé", "Isolation thermique renforcée", "Menuiseries aluminium"] },
    { category: "Extérieur", items: ["Terrasse privée carrelée", "Jardins paysagers", "Parking couvert"] },
    { category: "Intérieur", items: ["Parquet contrecollé", "Cuisine européenne intégrée", "Sanitaires haut de gamme"] },
    { category: "Systèmes", items: ["Pré-câblage domotique", "Climatisation gainable", "Chauffe-eau solaire"] },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F5F2ED] text-[#3D4536]" style={{ fontFamily: "'Roboto', sans-serif" }}>

      {/* ===== FLOATING BACK NAV ===== */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/apartments"
          className="flex items-center gap-2 text-sm font-medium text-white/90 bg-[#3D4536]/60 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 hover:bg-[#3D4536]/80 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen">
        <Image
          src={"/apartments/" + apartment.imagePath}
          alt={apartment.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D4536]/70 via-transparent to-[#3D4536]/20" />

        {/* Title */}
        <div className="hero-title absolute bottom-16 md:bottom-20 left-6 md:left-16 opacity-0">
          <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-serif font-bold text-white leading-none tracking-tight drop-shadow-2xl" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {apartment.name.split(" ").slice(0, 2).join(" ")}
          </h1>
        </div>

        {/* Pill Badges */}
        <div className="hero-pills absolute bottom-6 md:bottom-8 left-6 md:left-16 flex gap-3 opacity-0">
          <span className="bg-[#B8C4A2]/80 backdrop-blur-sm text-[#3D4536] text-xs font-semibold px-5 py-2 rounded-full">
            3 Chambres
          </span>
          <span className="bg-[#B8C4A2]/80 backdrop-blur-sm text-[#3D4536] text-xs font-semibold px-5 py-2 rounded-full">
            3 SdB
          </span>
          <span className="bg-[#B8C4A2]/80 backdrop-blur-sm text-[#3D4536] text-xs font-semibold px-5 py-2 rounded-full">
            185 m²
          </span>
          <span className="bg-[#B8C4A2]/80 backdrop-blur-sm text-[#3D4536] text-xs font-semibold px-5 py-2 rounded-full">
            {exposure}
          </span>
        </div>
      </section>

      {/* ===== OVERVIEW SPLIT ===== */}
      <section className="reveal w-full px-6 md:px-16 py-24 md:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — Narrative */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#3D4536]/50 mb-6 font-semibold">Présentation</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Un Cadre de Vie d&apos;Exception
            </h2>
            <p className="text-lg text-[#3D4536]/70 font-light leading-relaxed">
              <strong className="text-[#3D4536] font-medium">{apartment.name}</strong> offre un agencement élégant pour un mode de vie moderne sans compromis. Chaque résidence dispose de vastes espaces de vie, de cuisines dernier cri et de terrasses privées offrant des vues imprenables et une connexion harmonieuse avec la nature.
            </p>
          </div>
          {/* Right — Quick Specs */}
          <div className="flex flex-col justify-center">
            <div className="border-t border-[#3D4536]/15 pt-8 space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-[#3D4536]/10">
                <span className="text-sm uppercase tracking-widest text-[#3D4536]/50 font-medium">Surface</span>
                <span className="text-2xl font-bold">185 m²</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-[#3D4536]/10">
                <span className="text-sm uppercase tracking-widest text-[#3D4536]/50 font-medium">Chambres</span>
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-[#3D4536]/10">
                <span className="text-sm uppercase tracking-widest text-[#3D4536]/50 font-medium">Salles de Bain</span>
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-[#3D4536]/10">
                <span className="text-sm uppercase tracking-widest text-[#3D4536]/50 font-medium">Exposition</span>
                <span className="text-2xl font-bold">{exposure}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm uppercase tracking-widest text-[#3D4536]/50 font-medium">Statut</span>
                <span className="bg-[#005433] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Disponible</span>
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
      <section className="reveal w-full px-6 md:px-16 py-24 md:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — Image */}
          <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden">
            <Image
              src={"/apartments/" + apartment.imagePath}
              alt="Plan"
              fill
              className="object-cover"
            />
          </div>
          {/* Right — Accordion */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#3D4536]/50 mb-6 font-semibold">Espaces de Vie</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Composition
            </h2>
            <div className="flex flex-col">
              {features.map((f, i) => (
                <div key={i} className="border-t border-[#3D4536]/15">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[#3D4536]/40 font-mono">{(i + 1).toString().padStart(2, "0")}</span>
                      <span className="text-lg md:text-xl font-medium group-hover:text-[#005433] transition-colors">{f.zone}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-[#3D4536]/40 transition-transform duration-300 ${openAccordion === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openAccordion === i ? "max-h-40 pb-6" : "max-h-0"}`}>
                    <p className="text-[#3D4536]/60 font-light leading-relaxed pl-10">{f.desc}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#3D4536]/15" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALTERNATING FEATURE BLOCKS ===== */}
      <section className="reveal w-full px-6 md:px-16 pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#3D4536]/50 mb-6 font-semibold">Environnement</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              En Harmonie avec la Nature
            </h2>
            <p className="text-lg text-[#3D4536]/70 font-light leading-relaxed mb-8">
              Niché au sein d&apos;un développement exclusif, chaque résidence RDC bénéficie d&apos;un accès privilégié aux plages, réserves naturelles et commodités urbaines. L&apos;équilibre parfait entre tranquillité et vie moderne.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Plages", "Réserves Naturelles", "Commerces", "Écoles", "Golf"].map((tag) => (
                <span key={tag} className="bg-[#3D4536]/[0.06] border border-[#3D4536]/10 text-[#3D4536]/70 text-xs font-medium px-4 py-2 rounded-full">
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

      {/* ===== SPECIFICATIONS TABLE ===== */}
      <section className="reveal w-full px-6 md:px-16 py-24 md:py-40 bg-[#EDE9E3]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#3D4536]/50 mb-6 font-semibold">Détails Techniques</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-16" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Spécifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {specs.map((cat, i) => (
              <div key={i}>
                <h4 className="text-xs uppercase tracking-[0.3em] text-[#3D4536]/50 font-semibold mb-6 pb-4 border-b border-[#3D4536]/15">{cat.category}</h4>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-[#3D4536]/70 font-light">{item}</li>
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
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#3D4536]/50 mb-6 font-semibold">Valeur</p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Pourquoi Investir
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: "Construction Premium", desc: "Standards européens avec des matériaux de qualité supérieure et des finitions irréprochables." },
              { icon: TreePine, title: "Cadre Naturel", desc: "Jardins paysagers, allées arborées et piscine à débordement dans un environnement verdoyant." },
              { icon: Compass, title: "Emplacement Stratégique", desc: "Forte demande locative, appréciation du capital et accessibilité aux acheteurs internationaux." },
            ].map((b, i) => (
              <div key={i} className="bg-[#3D4536]/[0.04] rounded-[2rem] p-10 border border-[#3D4536]/[0.06] hover:border-[#3D4536]/15 transition-all duration-500 group">
                <b.icon className="w-8 h-8 text-[#3D4536]/30 mb-6 group-hover:text-[#005433] transition-colors" />
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-[#3D4536]/60 font-light leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="w-full bg-[#3D4536] text-white py-24 md:py-32 px-6 md:px-16">
        <div className="reveal max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6 font-semibold">Prochaine Étape</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Planifiez Votre Visite Privée
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-10">
              Notre équipe est à votre disposition pour organiser une visite personnalisée de cette résidence. Découvrez chaque détail en personne.
            </p>
            <div className="flex flex-col gap-4 text-white/60 text-sm font-light">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/30" />
                <span>+212 5XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/30" />
                <span>info@rdc-residences.com</span>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.06] backdrop-blur-sm rounded-[2rem] border border-white/10 p-10">
            <form className="flex flex-col gap-5">
              <input type="text" placeholder="Nom complet" className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm" />
              <input type="email" placeholder="Adresse e-mail" className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm" />
              <input type="tel" placeholder="Numéro de téléphone" className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm" />
              <textarea placeholder="Votre message..." rows={3} className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm resize-none"></textarea>
              <button type="button" className="w-full bg-[#005433] text-white font-bold py-4 rounded-xl text-sm uppercase tracking-[0.2em] hover:bg-[#006a40] transition-colors shadow-lg shadow-[#005433]/20">
                Demander une Visite
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="w-full bg-[#3D4536] border-t border-white/10 py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white/30 gap-4">
          <p>&copy; {new Date().getFullYear()} RDC Résidences. Tous droits réservés.</p>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="/apartments" className="hover:text-white transition-colors">Collection</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Bed, Bath, Maximize, CheckCircle2, Phone, Mail, Share, Heart, X, ChevronLeft, ChevronRight, Compass, TreePine, Shield } from "lucide-react";
import { ApartmentData } from "@/lib/utils";
import Navbar from "./Navbar";

export default function ApartmentDetail({ apartment }: { apartment: ApartmentData }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"aperçu" | "caractéristiques" | "localisation">("aperçu");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.fromTo(
      ".detail-hero-content",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    // Parallax on hero image
    gsap.to(".hero-img", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Reveal sections
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const exposure = apartment.name.includes("Sud") ? "Southern" : apartment.name.includes("Nord") ? "Northern" : "Panoramic";

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero-section relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
        <Image
          src={"/apartments/" + apartment.imagePath}
          alt={apartment.name}
          fill
          className="hero-img object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        {/* Floating Actions (Top Right) */}
        <div className="absolute top-24 right-6 md:right-10 z-10 flex gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${liked ? "bg-red-500/20 border-red-500/40 text-red-400" : "bg-white/10 border-white/20 text-white/70 hover:text-white"}`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all">
            <Share className="w-4 h-4" />
          </button>
        </div>

        {/* Back Button */}
        <div className="absolute top-24 left-6 md:left-10 z-10">
          <Link href="/apartments" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/20">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>
        </div>

        {/* Hero Content */}
        <div className="detail-hero-content absolute bottom-0 left-0 w-full px-6 md:px-20 pb-16 opacity-0">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5">
                Résidence Premium
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5">
                Ref: RDC-{apartment.id.padStart(4, "0")}
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-none mb-4 drop-shadow-2xl">
              {apartment.name}
            </h1>
            <div className="flex items-center gap-2 text-white/60 font-light">
              <MapPin className="w-4 h-4" />
              <span>RDC Development · Coastal District</span>
            </div>
          </div>
        </div>

        {/* Click to expand */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[10px] uppercase tracking-[0.2em] text-white/60 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 hover:bg-white/20 transition-all"
        >
          Voir l&apos;Image Complète
        </button>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
          <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-6xl aspect-video">
            <Image src={"/apartments/" + apartment.imagePath} alt={apartment.name} fill className="object-contain" />
          </div>
        </div>
      )}

      {/* ===== QUICK SPECS BAR ===== */}
      <section className="reveal relative z-10 -mt-16 mx-6 md:mx-20">
        <div className="max-w-5xl mx-auto bg-white/[0.06] backdrop-blur-2xl rounded-2xl border border-white/10 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Bed className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Chambres</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Bath className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Salles de Bain</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Maximize className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Surface</p>
              <p className="text-xl font-bold">185 m²</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Exposition</p>
              <p className="text-xl font-bold">{exposure}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-20 py-20">

        {/* ===== INTERACTIVE TABS ===== */}
        <div className="reveal flex gap-2 mb-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1.5 w-fit">
          {(["aperçu", "caractéristiques", "localisation"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all ${activeTab === tab
                  ? "bg-[#005433] text-white shadow-lg shadow-[#005433]/20"
                  : "text-white/60 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-16">

          {/* ===== LEFT COLUMN ===== */}
          <div className="w-full lg:w-2/3">

            {/* Overview Tab */}
            {activeTab === "aperçu" && (
              <div className="reveal">
                <h2 className="text-2xl font-bold mb-6">Description du Bien</h2>
                <div className="text-white/60 font-light leading-relaxed space-y-4 mb-12">
                  <p>
                    <strong className="text-white">{apartment.name}</strong> offre un agencement élégant pour un mode de vie moderne sans compromis.
                    Chaque résidence dispose de vastes espaces de vie, de cuisines dernier cri et de terrasses privées offrant des vues imprenables.
                  </p>
                  <p>
                    Niché au sein d&apos;un développement exclusif, ce bien offre un cadre de vie alliant tranquillité et commodité. L&apos;attention méticuleuse aux détails et les finitions haut de gamme créent une atmosphère de luxe raffiné.
                  </p>
                </div>

                <h3 className="text-xl font-bold mb-6">Avantages d&apos;Investissement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Emplacement Idéal", desc: "Forte demande locative et croissance du capital." },
                    { title: "Construction de Qualité", desc: "Cuisines européennes et finitions premium." },
                    { title: "Accessible aux Étrangers", desc: "Accompagnement complet de la demande à la remise des clés." },
                    { title: "ROI Solide", desc: "Zone en appréciation rapide avec des rendements prouvés." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] transition-all group">
                      <CheckCircle2 className="w-5 h-5 text-white/30 shrink-0 mt-0.5 group-hover:text-white/60 transition-colors" />
                      <div>
                        <p className="font-medium text-sm mb-1">{item.title}</p>
                        <p className="text-white/50 text-sm font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === "caractéristiques" && (
              <div className="reveal">
                <h2 className="text-2xl font-bold mb-6">Caractéristiques Intérieures</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {[
                    "Salon et salle à manger ouverts",
                    "Cuisine européenne entièrement équipée",
                    "Baies vitrées du sol au plafond",
                    "Terrasse privée avec vue panoramique",
                    "Parquet en bois contrecollé",
                    "Placards intégrés et rangements",
                    "Sanitaires haut de gamme",
                    "Pré-câblage domotique",
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 hover:bg-white/[0.08] transition-all">
                      <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0" />
                      <span className="text-white/70 text-sm font-light">{f}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-6">Équipements de la Résidence</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Shield, title: "Sécurité 24/7", desc: "Résidence fermée avec vidéosurveillance" },
                    { icon: TreePine, title: "Jardins Paysagers", desc: "Verdure mature et allées piétonnes" },
                    { icon: Compass, title: "Piscine", desc: "Piscine à débordement chauffée partagée" },
                  ].map((a, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all group text-center">
                      <a.icon className="w-8 h-8 text-white/30 mx-auto mb-4 group-hover:text-white/60 transition-colors" />
                      <h4 className="font-bold text-sm mb-1">{a.title}</h4>
                      <p className="text-white/50 text-xs font-light">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === "localisation" && (
              <div className="reveal">
                <h2 className="text-2xl font-bold mb-6">Points d&apos;Intérêt</h2>
                <div className="grid grid-cols-1 gap-4 mb-12">
                  {[
                    { title: "À Quelques Pas de la Plage", desc: "Accès direct à un paradis côtier réputé, idéal pour les sports nautiques et la détente.", dist: "60m" },
                    { title: "Réserves Naturelles", desc: "Sentiers de randonnée, faune locale et paysages à couper le souffle dans les parcs nationaux voisins.", dist: "5km" },
                    { title: "Commodités Urbaines", desc: "Accès aux centres commerciaux de luxe, écoles prestigieuses et terrains de golf.", dist: "3km" },
                    { title: "Aéroport International", desc: "Bien desservi avec des vols directs vers les principales destinations mondiales.", dist: "45km" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.08] transition-all group">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{item.title}</p>
                          <span className="text-[10px] uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 rounded-full px-3 py-1">{item.dist}</span>
                        </div>
                        <p className="text-white/50 text-sm font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ===== RIGHT COLUMN — STICKY INQUIRY ===== */}
          <div className="w-full lg:w-1/3">
            <div className="reveal sticky top-24 bg-white/[0.06] backdrop-blur-2xl rounded-2xl border border-white/10 p-8">
              <h3 className="text-xl font-bold mb-2">Intéressé(e) ?</h3>
              <p className="text-sm text-white/50 mb-6 font-light">Contactez notre équipe pour organiser une visite privée.</p>

              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Nom complet" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm" />
                <input type="email" placeholder="Adresse e-mail" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm" />
                <input type="tel" placeholder="Numéro de téléphone" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm" />
                <textarea placeholder="Votre message..." rows={3} className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm resize-none"></textarea>
                <button type="button" className="w-full bg-[#005433] text-white font-bold py-4 rounded-xl text-sm uppercase tracking-[0.2em] hover:bg-[#006a40] transition-colors mt-2 shadow-lg shadow-[#005433]/20">
                  Envoyer la Demande
                </button>
                <button type="button" className="w-full bg-white/5 text-white border border-white/10 font-bold py-4 rounded-xl text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-colors">
                  Télécharger la Brochure
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3 text-white/50 text-sm font-light">
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
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/10 py-12 px-6 md:px-20 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white/30 gap-4">
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

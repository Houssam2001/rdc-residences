"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Gem, TreePine, Users, Award, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".about-hero",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
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

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="about-hero relative w-full pt-40 pb-24 px-6 md:px-20 text-center opacity-0">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">Notre Histoire</p>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">À Propos de RDC</h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light">
          Une communauté magistralement planifiée où l&apos;architecture moderne rencontre la nature. Nous croyons que là où vous vivez façonne comment vous vivez.
        </p>
      </section>

      {/* Image + Story */}
      <section className="reveal relative w-full px-6 md:px-20 pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="/apartments/01 OK Sud - BLEU CLAIR PLEIN SUD.png"
              alt="Architecture RDC"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6 font-medium">La Vision</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              Conçu pour ceux qui exigent davantage.
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-6">
              RDC Résidences est né d&apos;une conviction simple : l&apos;habitat premium ne devrait exiger aucun compromis. Chaque résidence de notre collection a été conçue de zéro pour maximiser la lumière naturelle, les espaces ouverts et la connexion avec l&apos;environnement.
            </p>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              De la précision de notre architecture à la sérénité de nos aménagements paysagers, chaque détail a été pensé pour créer un sanctuaire où les familles s&apos;épanouissent et les investissements prospèrent.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative w-full px-6 md:px-20 pb-32">
        <div className="reveal max-w-6xl mx-auto text-center mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6 font-medium">Ce Qui Nous Anime</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Nos Valeurs Fondamentales</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Qualité Inégalée", desc: "Construction aux standards européens avec des matériaux premium sélectionnés à l'international et façonnés localement." },
            { icon: Gem, title: "Design Intemporel", desc: "Une architecture qui transcende les tendances, créant des espaces qui restent beaux et fonctionnels pour les générations à venir." },
            { icon: TreePine, title: "Nature d'Abord", desc: "Chaque développement préserve et valorise le paysage naturel, créant une harmonie entre environnement bâti et naturel." },
            { icon: Users, title: "Communauté Engagée", desc: "Nous construisons plus que des maisons — nous créons des quartiers où les familles se connectent et les communautés s'épanouissent." },
            { icon: Award, title: "Excellence d'Investissement", desc: "Propriétés positionnées dans des zones à forte demande avec des rendements locatifs solides et une appréciation prouvée du capital." },
            { icon: Globe, title: "Standards Internationaux", desc: "Accessible aux acheteurs internationaux avec un accompagnement complet de la demande initiale à la remise des clés." },
          ].map((v, i) => (
            <div key={i} className="reveal bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group">
              <v.icon className="w-8 h-8 text-white/40 mb-6 group-hover:text-white/80 transition-colors" />
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-white/60 font-light leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative w-full px-6 md:px-20 pb-32">
        <div className="reveal max-w-5xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 md:p-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <p className="text-5xl md:text-6xl font-bold mb-2">43+</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Résidences</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold mb-2">5.2</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Hectares</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold mb-2">100%</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Paysagé</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold mb-2">24/7</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Sécurité</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal relative w-full py-32 flex flex-col items-center text-center px-6">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-10">Prêt à découvrir ?</h2>
        <Link
          href="/apartments"
          className="inline-flex items-center gap-4 bg-[#005433] text-white px-12 py-6 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#006a40] hover:scale-105 transition-all shadow-lg shadow-[#005433]/20"
        >
          Voir la Collection
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/10 py-12 px-6 md:px-20">
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

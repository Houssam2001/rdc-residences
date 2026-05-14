"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import NavbarLight from "@/components/NavbarLight";

export default function ContactPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".contact-hero",
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
    <div className="w-full min-h-screen bg-[#f8f6f3] text-black" style={{ fontFamily: "var(--font-roboto)" }}>
      <NavbarLight />

      {/* Hero */}
      <section className="contact-hero relative w-full pt-44 pb-24 px-6 md:px-20 text-center opacity-0">
        <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Nous Contacter</p>
        <h1 className="text-6xl md:text-[8rem] font-light italic tracking-[-0.03em] mb-8 leading-[0.85]" style={{ fontFamily: "var(--font-serif)" }}>Contactez-Nous</h1>
        <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-light italic" style={{ fontFamily: "var(--font-serif)" }}>
          Que vous recherchiez votre maison de rêve ou un investissement de choix, notre équipe est à votre écoute.
        </p>
      </section>

      {/* Contact Content */}
      <section className="relative w-full px-6 md:px-20 pb-32">
        <div className="reveal max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">

          {/* Left — Info */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Nous Joindre</p>
            <h2 className="text-4xl md:text-6xl font-light italic tracking-[-0.02em] mb-10 leading-tight text-black/80" style={{ fontFamily: "var(--font-serif)" }}>
              Nous serions ravis d&apos;échanger avec vous.
            </h2>
            <p className="text-[13px] text-black/40 font-light leading-[2] tracking-wide mb-12">
              Notre équipe dédiée est disponible pour vous guider à chaque étape — de la demande initiale à la remise des clés. Planifiez une visite privée ou demandez des plans détaillés et les tarifs.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-5 bg-white rounded-3xl p-8 border border-black/[0.04] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-black/40" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 mb-2">Téléphone</p>
                  <p className="text-lg font-light italic" style={{ fontFamily: "var(--font-serif)" }}>+212 5XXX XXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-white rounded-3xl p-8 border border-black/[0.04] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-black/40" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 mb-2">E-mail</p>
                  <p className="text-lg font-light italic" style={{ fontFamily: "var(--font-serif)" }}>info@rdc-residences.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-white rounded-3xl p-8 border border-black/[0.04] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-black/40" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 mb-2">Adresse</p>
                  <p className="text-[13px] font-light text-black/70">RDC Development, Quartier Côtier</p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-white rounded-3xl p-8 border border-black/[0.04] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-black/40" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 mb-2">Horaires</p>
                  <p className="text-[13px] font-light text-black/70">Lun – Sam : 9h00 – 18h00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal bg-white rounded-3xl border border-black/[0.04] p-10 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-center">
            <h3 className="text-3xl font-light italic tracking-[-0.02em] mb-4" style={{ fontFamily: "var(--font-serif)" }}>Envoyez-nous un message</h3>
            <p className="text-[13px] text-black/40 mb-10 font-light leading-[2] tracking-wide">Remplissez le formulaire et notre équipe vous répondra sous 24 heures.</p>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Prénom"
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light"
                />
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light"
                />
              </div>
              <input
                type="email"
                placeholder="Adresse e-mail"
                className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light"
              />
              <input
                type="tel"
                placeholder="Numéro de téléphone"
                className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light"
              />
              <div className="relative">
                <select
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black/60 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>Je suis intéressé(e) par...</option>
                  <option value="buying">Acheter une Résidence</option>
                  <option value="viewing">Visite Privée</option>
                  <option value="investment">Demande d&apos;Investissement</option>
                  <option value="other">Autre</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-black/30">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <textarea
                placeholder="Votre message..."
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-transparent border border-black/[0.08] text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-black/20 transition-all text-[13px] font-light resize-none"
              ></textarea>
              <button
                type="button"
                className="group mt-4 w-full flex items-center justify-center gap-3 bg-black text-white py-5 rounded-xl text-[10px] uppercase tracking-[0.3em] font-normal hover:bg-black/80 transition-colors"
              >
                Envoyer le Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="reveal relative w-full py-32 flex flex-col items-center text-center px-6 border-t border-black/[0.05]">
        <p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">Découvrir</p>
        <h2 className="text-5xl md:text-8xl font-light italic tracking-[-0.02em] mb-14" style={{ fontFamily: "var(--font-serif)" }}>Explorez la collection</h2>
        <Link
          href="/apartments"
          className="group inline-flex items-center gap-5 border border-black/15 text-black px-14 py-5 rounded-full text-[10px] uppercase tracking-[0.35em] font-normal hover:bg-black hover:text-white transition-all duration-700"
        >
          Voir les Appartements
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-500" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-black/[0.05] py-20 px-6 md:px-20 bg-[#f8f6f3]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-black/15 font-normal">
            &copy; {new Date().getFullYear()} RDC Résidences
          </p>
          <div className="flex gap-10">
            <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-black/15 hover:text-black/50 transition-colors font-normal">Accueil</Link>
            <Link href="/apartments" className="text-[10px] tracking-[0.3em] uppercase text-black/15 hover:text-black/50 transition-colors font-normal">Collection</Link>
            <Link href="/about" className="text-[10px] tracking-[0.3em] uppercase text-black/15 hover:text-black/50 transition-colors font-normal">À Propos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

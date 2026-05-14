"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

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
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="contact-hero relative w-full pt-40 pb-24 px-6 md:px-20 text-center opacity-0">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">Nous Contacter</p>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">Contactez-Nous</h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light">
          Que vous recherchiez votre maison de rêve ou un investissement de choix, notre équipe est à votre écoute.
        </p>
      </section>

      {/* Contact Content */}
      <section className="relative w-full px-6 md:px-20 pb-32">
        <div className="reveal max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-8 font-medium">Nous Joindre</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10 leading-tight">
              Nous serions ravis d&apos;échanger avec vous.
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-12">
              Notre équipe dédiée est disponible pour vous guider à chaque étape — de la demande initiale à la remise des clés. Planifiez une visite privée ou demandez des plans détaillés et les tarifs.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Téléphone</p>
                  <p className="text-lg font-medium">+212 5XXX XXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">E-mail</p>
                  <p className="text-lg font-medium">info@rdc-residences.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Adresse</p>
                  <p className="text-lg font-medium">RDC Development, Quartier Côtier</p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Horaires</p>
                  <p className="text-lg font-medium">Lun – Sam : 9h00 – 18h00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 md:p-12">
            <h3 className="text-2xl font-bold mb-2">Envoyez-nous un message</h3>
            <p className="text-sm text-white/50 mb-8 font-light">Remplissez le formulaire et notre équipe vous répondra sous 24 heures.</p>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Prénom"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
              </div>
              <input
                type="email"
                placeholder="Adresse e-mail"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
              />
              <input
                type="tel"
                placeholder="Numéro de téléphone"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
              />
              <select
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm appearance-none"
                defaultValue=""
              >
                <option value="" disabled>Je suis intéressé(e) par...</option>
                <option value="buying">Acheter une Résidence</option>
                <option value="viewing">Visite Privée</option>
                <option value="investment">Demande d&apos;Investissement</option>
                <option value="other">Autre</option>
              </select>
              <textarea
                placeholder="Votre message..."
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm resize-none"
              ></textarea>
              <button
                type="button"
                className="w-full bg-[#005433] text-white font-bold py-4 rounded-xl text-sm uppercase tracking-[0.2em] hover:bg-[#006a40] transition-colors mt-2 shadow-lg shadow-[#005433]/20"
              >
                Envoyer le Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="reveal relative w-full py-32 flex flex-col items-center text-center px-6 border-t border-white/10">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-10">Explorez la collection</h2>
        <Link
          href="/apartments"
          className="inline-flex items-center gap-4 bg-[#005433] text-white px-12 py-6 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#006a40] hover:scale-105 transition-all shadow-lg shadow-[#005433]/20"
        >
          Voir les Appartements
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
            <Link href="/about" className="hover:text-white transition-colors">À Propos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

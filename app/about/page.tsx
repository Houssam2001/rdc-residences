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
        <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">Our Story</p>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">About RDC</h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light">
          A masterfully planned community where modern architecture meets nature. We believe that where you live shapes how you live.
        </p>
      </section>

      {/* Image + Story */}
      <section className="reveal relative w-full px-6 md:px-20 pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="/apartments/01 OK Sud - BLEU CLAIR PLEIN SUD.png"
              alt="RDC Architecture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6 font-medium">The Vision</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              Crafted for those who demand more.
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-6">
              RDC Residences was born from a simple conviction: premium living shouldn&apos;t require compromise. Every residence in our collection has been designed from the ground up to maximize natural light, open space, and connection to the environment.
            </p>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              From the precision of our architecture to the serenity of our landscaping, every detail has been considered to create a sanctuary where families thrive and investments grow.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative w-full px-6 md:px-20 pb-32">
        <div className="reveal max-w-6xl mx-auto text-center mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6 font-medium">What Drives Us</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Our Core Values</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Uncompromising Quality", desc: "European-standard construction with premium materials sourced globally and crafted locally." },
            { icon: Gem, title: "Timeless Design", desc: "Architecture that transcends trends, creating spaces that remain beautiful and functional for generations." },
            { icon: TreePine, title: "Nature First", desc: "Every development preserves and enhances the natural landscape, creating harmony between built and natural environments." },
            { icon: Users, title: "Community Focused", desc: "We build more than homes — we create neighborhoods where families connect and communities flourish." },
            { icon: Award, title: "Investment Excellence", desc: "Properties positioned in high-demand areas with strong rental yields and proven capital appreciation." },
            { icon: Globe, title: "Global Standards", desc: "Accessible to international buyers with full advisory support from initial inquiry through to handover." },
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
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Residences</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold mb-2">5.2</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Hectares</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold mb-2">100%</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Landscaped</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold mb-2">24/7</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Security</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal relative w-full py-32 flex flex-col items-center text-center px-6">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-10">Ready to discover?</h2>
        <Link
          href="/apartments"
          className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:scale-105 transition-transform"
        >
          View Collection
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/10 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white/30 gap-4">
          <p>&copy; {new Date().getFullYear()} RDC Residences. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/apartments" className="hover:text-white transition-colors">Collection</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Load
    gsap.fromTo(
      heroTextRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
    );

    // Image Scale up on scroll (Apple-style "zoom into screen" effect)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top 80%",
        end: "top top",
        scrub: true,
      }
    });

    tl.fromTo(
      imageContainerRef.current,
      { width: "60%", borderRadius: "32px", y: 100 },
      { width: "100%", borderRadius: "0px", y: 0, ease: "none" }
    );

    // Narrative Text Reveal (word by word or simple fade up)
    gsap.utils.toArray<HTMLElement>('.narrative-text').forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0.2, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center pt-20 px-6">
        <h1 
          ref={heroTextRef}
          className="text-6xl md:text-[9rem] font-semibold tracking-tighter leading-none text-center mb-10 opacity-0"
        >
          Profound.<br/>
          <span className="text-white/40">By Design.</span>
        </h1>
        <p className="text-xl md:text-3xl text-white/60 font-light max-w-2xl text-center">
          A new era of residential architecture. Where every detail is engineered to elevate your lifestyle.
        </p>
      </section>

      {/* Hero Image Scaling Section */}
      <section className="relative w-full h-[150vh] flex justify-center bg-black">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden pt-20">
          <div ref={imageContainerRef} className="relative w-[60%] aspect-video overflow-hidden rounded-[32px] shadow-2xl shadow-white/5">
            <Image
              ref={imageRef}
              src="/apartments/01 OK Sud - BLEU CLAIR PLEIN SUD.png"
              alt="RDC Architecture"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section id="vision" className="relative w-full py-40 px-6 md:px-20 lg:px-40 flex flex-col items-center bg-black border-t border-white/10">
        <div ref={narrativeRef} className="max-w-4xl text-center flex flex-col gap-12">
          <h2 className="narrative-text text-4xl md:text-7xl font-medium tracking-tight leading-tight">
            Light. Space. Purity.
          </h2>
          <h2 className="narrative-text text-4xl md:text-7xl font-medium tracking-tight leading-tight text-white/70">
            We stripped away the unnecessary to reveal the essential.
          </h2>
          <h2 className="narrative-text text-4xl md:text-7xl font-medium tracking-tight leading-tight text-white/40">
            The result is an environment that adapts to you, effortlessly.
          </h2>
        </div>
      </section>

      {/* Grid Showcase */}
      <section id="design" className="w-full py-20 px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
          <Image src="/apartments/12 OK JAUNE MOUTARD.png" alt="Detail 1" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-10 flex flex-col justify-end">
            <h3 className="text-3xl font-medium mb-4">Precision Materials</h3>
            <p className="text-white/70">Sourced globally, crafted locally. Every surface tells a story of uncompromising quality.</p>
          </div>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
          <Image src="/apartments/15 OK Nord- BLEU CLAIR NORD.png" alt="Detail 2" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-10 flex flex-col justify-end">
            <h3 className="text-3xl font-medium mb-4">Intelligent Flow</h3>
            <p className="text-white/70">Floor plans designed around human intuition. Movement between spaces is fluid and natural.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full py-40 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-8xl font-medium tracking-tight mb-12">Discover the Collection</h2>
        <Link 
          href="/apartments" 
          className="bg-white text-black px-12 py-6 rounded-full text-lg md:text-xl font-medium hover:scale-105 transition-transform duration-300"
        >
          Explore Residences
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 md:px-20 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40 gap-6">
        <div>&copy; {new Date().getFullYear()} RDC Residences.</div>
        <div className="flex gap-8 uppercase tracking-widest">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

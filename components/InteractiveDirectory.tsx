"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ApartmentData } from "@/lib/utils";
import Navbar from "./Navbar";

export default function InteractiveDirectory({ apartments }: { apartments: ApartmentData[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".dir-hero",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    gsap.utils.toArray<HTMLElement>('.reveal-item').forEach((item) => {
      gsap.fromTo(item, 
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full text-white min-h-screen bg-black">
      <Navbar />

      {/* Hero */}
      <section className="dir-hero relative w-full pt-40 pb-20 px-6 md:px-20 text-center opacity-0">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">Notre Portfolio</p>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">La Collection</h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
          Explorez notre sélection de résidences premium. Survolez pour apercevoir, cliquez pour découvrir.
        </p>
      </section>

      {/* Directory Grid */}
      <section className="relative w-full px-6 md:px-20 lg:px-40 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apt, idx) => (
            <Link
              key={apt.slug + idx}
              href={`/apartments/${apt.slug}`}
              className="reveal-item group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer hover:border-[#005433]/40 transition-all duration-500"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Image
                src={"/apartments/" + apt.imagePath}
                alt={apt.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">{(idx + 1).toString().padStart(2, '0')}</span>
                  <h3 className="text-xl md:text-2xl font-bold mt-1 group-hover:translate-x-2 transition-transform duration-500">
                    {apt.name}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-[#005433] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/10 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white/30 gap-4">
          <p>&copy; {new Date().getFullYear()} RDC Résidences. Tous droits réservés.</p>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="#" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-white transition-colors">Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

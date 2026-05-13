"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowLeft, Maximize } from "lucide-react";
import WebGLCanvas from "./WebGLCanvas";
import { ApartmentData } from "@/lib/utils";

export default function ApartmentDetail({ apartment }: { apartment: ApartmentData }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant entrance animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div className="relative w-full min-h-screen text-white bg-black">
      {/* Immersive WebGL Background */}
      <WebGLCanvas currentImage={"/apartments/" + apartment.imagePath} />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-multiply" />

      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between p-6 md:p-10">
        <Link href="/" className="flex items-center gap-4 text-sm uppercase tracking-widest hover:text-white/60 transition-colors group mix-blend-difference">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </Link>
        <div className="text-xl font-medium tracking-widest uppercase mix-blend-difference">RDC Residences</div>
      </nav>

      {/* Content */}
      <main className="relative z-10 w-full h-screen flex flex-col justify-end px-6 md:px-20 pb-20 md:pb-32">
        <div ref={contentRef} className="max-w-4xl opacity-0">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-xs uppercase tracking-[0.3em] text-white/60 border border-white/20 rounded-full px-4 py-1">
              Premium Collection
            </span>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              <Maximize className="w-3 h-3" />
              Expanded View
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-medium tracking-tight leading-none mb-8 drop-shadow-2xl">
            {apartment.name}
          </h1>

          <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mb-12 drop-shadow-md">
            Experience the harmony of modern design and breathtaking panoramic views. A sanctuary perfectly crafted for those who value exclusivity.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-8 border-t border-white/20 pt-8 mt-12 w-full">
            <div className="w-full md:w-1/3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Internal Area</p>
              <p className="text-2xl font-light">TBA SQM</p>
            </div>
            <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Configuration</p>
              <p className="text-2xl font-light">Bespoke</p>
            </div>
            <div className="w-full md:w-1/3 flex justify-end mt-6 md:mt-0">
              <button className="w-full md:w-auto bg-white text-black px-10 py-5 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-zinc-200 transition-colors">
                Request Floorplan
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

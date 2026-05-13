"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import WebGLCanvas from "./WebGLCanvas";
import { ApartmentData } from "@/lib/utils";
import Navbar from "./Navbar";

export default function InteractiveDirectory({ apartments }: { apartments: ApartmentData[] }) {
  const [activeImage, setActiveImage] = useState<string>("/apartments/" + apartments[0].imagePath);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
      <WebGLCanvas currentImage={activeImage} />
      <Navbar />

      <div className="relative z-10 w-full pt-32 pb-20">
        <section className="px-6 md:px-20 lg:px-40 mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 drop-shadow-lg">The Collection</h1>
          <p className="text-white/60 max-w-2xl mx-auto font-light text-lg">
            Explore our curated selection of premium residences. Click on any apartment to immerse yourself in its dedicated showcase.
          </p>
        </section>

        <section className="px-6 md:px-20 lg:px-40">
          <ul className="flex flex-col border-t border-white/20">
            {apartments.map((apt, idx) => (
              <li 
                key={apt.slug + idx} 
                className="reveal-item border-b border-white/20 group cursor-pointer"
                onMouseEnter={() => setActiveImage("/apartments/" + apt.imagePath)}
              >
                <Link href={`/apartments/${apt.slug}`} className="flex items-center justify-between py-6 md:py-8 group-hover:px-8 transition-all duration-500 ease-out block w-full">
                  <div className="flex items-center gap-8">
                    <span className="text-sm text-white/40 font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span className="text-2xl md:text-4xl font-light group-hover:tracking-wide transition-all duration-500">
                      {apt.name}
                    </span>
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 drop-shadow-md" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

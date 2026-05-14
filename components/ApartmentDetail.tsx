"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Bed, Bath, Maximize, CheckCircle2, ChevronRight, Share, Heart } from "lucide-react";
import { ApartmentData } from "@/lib/utils";

export default function ApartmentDetail({ apartment }: { apartment: ApartmentData }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections
    gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Light Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link href="/apartments" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-[#243462] transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
        <div className="text-xl font-bold tracking-widest uppercase text-[#243462]">RDC Residences</div>
        <div className="flex gap-4">
          <button className="hidden md:flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900">
            <Share className="w-4 h-4" /> Share
          </button>
          <button className="hidden md:flex items-center gap-2 text-sm text-zinc-600 hover:text-red-500">
            <Heart className="w-4 h-4" /> Save
          </button>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">

        {/* Header Section */}
        <div className="fade-up mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#243462]/10 text-[#243462] text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider">For Sale</span>
                <span className="text-zinc-500 text-sm">Ref: RDC-{apartment.id.padStart(4, '0')}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-2">{apartment.name}</h1>
              <div className="flex items-center gap-2 text-zinc-600">
                <MapPin className="w-4 h-4" />
                <span>Prime Coastal Location, Mauritius</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-3xl md:text-4xl font-bold text-[#243462]">MUR 25,000,000</p>
              <p className="text-sm text-zinc-500">Accessible to foreigners</p>
            </div>
          </div>
        </div>

        {/* Image Gallery (Bento Grid) */}
        <div className="fade-up w-full h-[400px] md:h-[600px] grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 rounded-2xl overflow-hidden mb-12">
          {/* Main Large Image */}
          <div className="md:col-span-3 relative w-full h-full group cursor-pointer">
            <Image
              src={"/apartments/" + apartment.imagePath}
              alt={apartment.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
          {/* Side Images (Placeholders for now since we only have 1 per apartment) */}
          <div className="hidden md:flex flex-col gap-4">
            <div className="relative w-full h-full bg-zinc-200 group cursor-pointer overflow-hidden">
              <Image src={"/apartments/" + apartment.imagePath} alt="View 2" fill className="object-cover opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative w-full h-full bg-zinc-200 group cursor-pointer overflow-hidden">
              <Image src={"/apartments/" + apartment.imagePath} alt="View 3" fill className="object-cover opacity-40 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-medium flex items-center gap-2">View all photos <ChevronRight className="w-4 h-4" /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column (Main Content) */}
          <div className="w-full lg:w-2/3">

            {/* Quick Specs */}
            <div className="fade-up flex flex-wrap gap-8 py-6 border-y border-zinc-200 mb-10">
              <div className="flex items-center gap-3">
                <Bed className="w-6 h-6 text-[#243462]" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Bedrooms</p>
                  <p className="font-semibold text-lg">3</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bath className="w-6 h-6 text-[#243462]" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Bathrooms</p>
                  <p className="font-semibold text-lg">3</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Maximize className="w-6 h-6 text-[#243462]" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Surface Area</p>
                  <p className="font-semibold text-lg">185 m²</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="fade-up mb-10">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Property Description</h2>
              <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed">
                <p>
                  <strong>{apartment.name}</strong> features an elegantly designed layout offering unparalleled modern living.
                  Each residence boasts spacious living areas, state-of-the-art kitchens, and private terraces that provide breathtaking views and a seamless connection to the serene surroundings.
                </p>
                <p className="mt-4">
                  Nestled in an exclusive development, this property offers a lifestyle of tranquillity and convenience. The meticulous attention to detail and high-end finishes create an atmosphere of refined luxury.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="fade-up mb-10">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Location Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#243462] shrink-0 mt-0.5" />
                  <span className="text-zinc-600"><strong>Seconds to the Beach:</strong> Enjoy direct access to renowned coastal paradises.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#243462] shrink-0 mt-0.5" />
                  <span className="text-zinc-600"><strong>Nature Reserves:</strong> Explore hiking trails and breathtaking scenery nearby.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#243462] shrink-0 mt-0.5" />
                  <span className="text-zinc-600"><strong>Urban Amenities:</strong> Access luxury shopping malls and prestigious schools.</span>
                </li>
              </ul>
            </div>

            <div className="fade-up mb-10">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Investment Benefits</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#243462] shrink-0 mt-0.5" />
                  <span className="text-zinc-600"><strong>Prime Location:</strong> High rental demand and capital growth potential.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#243462] shrink-0 mt-0.5" />
                  <span className="text-zinc-600"><strong>High-Quality Construction:</strong> European kitchens and premium fittings.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (Sticky Form) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-100 p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Interested in this property?</h3>
              <p className="text-sm text-zinc-500 mb-6">Contact our agents to arrange a viewing or request more details.</p>

              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#243462]/20 transition-all text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#243462]/20 transition-all text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#243462]/20 transition-all text-sm"
                />
                <textarea
                  placeholder="I would like more information about this property..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#243462]/20 transition-all text-sm resize-none"
                ></textarea>

                <button
                  type="button"
                  className="w-full bg-[#243462] text-white font-semibold py-4 rounded-lg mt-2 hover:bg-[#1a2649] transition-colors shadow-lg shadow-[#243462]/20"
                >
                  Send Inquiry
                </button>
                <button
                  type="button"
                  className="w-full bg-white text-[#243462] border border-[#243462]/20 font-semibold py-4 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  Download Brochure
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-zinc-200 py-10 mt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 gap-4">
          <div>&copy; {new Date().getFullYear()} RDC Residences. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

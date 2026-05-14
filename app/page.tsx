"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, ChevronDown, MapPin, Shield, Gem, TreePine, Phone, Mail, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";

const TOTAL_FRAMES = 193;

function getFramePath(index: number): string {
  const num = String(index).padStart(3, "0");
  return `/frames/ezgif-frame-${num}.jpg`;
}

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Cover the canvas with the image
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Preload all frames
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      if (i === 1) {
        img.onload = () => renderFrame(0);
      }
      images.push(img);
    }
    imagesRef.current = images;

    // Scroll-driven frame animation
    const obj = { frame: 0 };
    gsap.to(obj, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: () => {
        const idx = Math.round(obj.frame);
        if (idx !== frameIndexRef.current) {
          frameIndexRef.current = idx;
          renderFrame(idx);
        }
      },
    });

    // Resize handler
    const handleResize = () => renderFrame(frameIndexRef.current);
    window.addEventListener("resize", handleResize);

    // Section reveal animations
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [renderFrame]);

  const faqs = [
    {
      q: "What types of residences are available?",
      a: "RDC Residences offers a curated selection of premium apartments ranging from studios to spacious 4-bedroom penthouses, each designed with modern architecture and high-end finishes.",
    },
    {
      q: "Are the properties accessible to foreign buyers?",
      a: "Yes, all RDC properties are eligible for foreign ownership under the current investment framework. Our advisory team can guide you through the entire process.",
    },
    {
      q: "What amenities are included?",
      a: "Residents enjoy access to landscaped gardens, a private pool, 24/7 security, covered parking, and proximity to beaches, shopping, and nature reserves.",
    },
    {
      q: "Can I schedule a private viewing?",
      a: "Absolutely. Contact our advisory team via phone or the inquiry form and we will arrange a private tour at your convenience.",
    },
  ];

  return (
    <>
      {/* Fixed Canvas Background */}
      <canvas ref={canvasRef} className="frame-canvas" />

      {/* Glass Navbar */}
      <Navbar />

      {/* Scroll Container — drives the frame animation */}
      <div id="scroll-container" className="relative z-10" style={{ height: `${TOTAL_FRAMES * 30}px` }}>

        {/* ===== HERO ===== */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="pointer-events-auto">
            <p className="text-sm md:text-base uppercase tracking-[0.4em] text-white/80 mb-6 font-light">Premium Residential Development</p>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.9] mb-8 drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
              RDC<br />Residences
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-12 drop-shadow-lg">
              Where modern architecture meets nature. Discover a new standard of living.
            </p>
            <Link
              href="/apartments"
              className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-medium hover:bg-white/25 transition-all"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute bottom-10 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/60" />
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section className="relative min-h-screen flex items-center px-6 md:px-20 py-32">
          <div className="reveal max-w-5xl mx-auto bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 p-10 md:p-20">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-8 font-medium">About the Project</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-10">
              A Vision of<br />Timeless Living
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-lg text-white/70 font-light leading-relaxed">
                RDC Residences is a masterfully planned community set amidst lush greenery and modern infrastructure. Every home is designed to maximize natural light, open space, and connection to the environment.
              </p>
              <p className="text-lg text-white/70 font-light leading-relaxed">
                From the precision of our architecture to the serenity of our landscaping, every detail has been considered to create a sanctuary where families thrive and investments grow.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-white/10">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">43+</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Residences</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">5.2</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Hectares</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">100%</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Landscaped</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Security</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="relative min-h-screen flex items-center px-6 md:px-20 py-32">
          <div className="max-w-6xl mx-auto w-full">
            <div className="reveal text-center mb-20">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">Why RDC</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Built for Excellence
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: "Prime Location", desc: "Strategically positioned near beaches, nature reserves, and urban amenities for the ultimate lifestyle balance." },
                { icon: Shield, title: "Trusted Quality", desc: "European-standard construction with premium materials, solid wood finishes, and high-end sanitary fittings." },
                { icon: Gem, title: "Smart Investment", desc: "Properties in a high-demand, rapidly appreciating area with strong rental yields and capital growth." },
                { icon: TreePine, title: "Green Living", desc: "Surrounded by mature landscaping, tree-lined avenues, and private gardens that connect you to nature." },
                { icon: Phone, title: "Concierge Service", desc: "Dedicated property management and concierge services to ensure a seamless living experience." },
                { icon: Mail, title: "Global Access", desc: "Accessible to international buyers with full advisory support from initial inquiry to handover." },
              ].map((feature, i) => (
                <div key={i} className="reveal bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group">
                  <feature.icon className="w-8 h-8 text-white/40 mb-6 group-hover:text-white/80 transition-colors" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-6">
          <div className="reveal text-center max-w-3xl">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 drop-shadow-lg">
              Discover Your<br />Next Home
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-light mb-12 max-w-xl mx-auto">
              Browse the full collection of premium apartments and find the one that speaks to you.
            </p>
            <Link
              href="/apartments"
              className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full text-base uppercase tracking-[0.2em] font-bold hover:scale-105 transition-transform shadow-2xl shadow-white/10"
            >
              View All Apartments
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="relative min-h-screen flex items-center px-6 md:px-20 py-32">
          <div className="max-w-4xl mx-auto w-full">
            <div className="reveal text-center mb-16">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">FAQ</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Common Questions
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="reveal bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-8 py-6 text-left"
                  >
                    <span className="text-lg font-medium pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <Minus className="w-5 h-5 text-white/60 shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-white/60 shrink-0" />
                    )}
                  </button>
                  <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                    <p className="px-8 pb-6 text-white/60 font-light leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section className="relative min-h-screen flex items-center px-6 md:px-20 py-32">
          <div className="reveal max-w-5xl mx-auto w-full bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 p-10 md:p-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">Get in Touch</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                  Contact Our Advisory Team
                </h2>
                <p className="text-lg text-white/60 font-light leading-relaxed mb-10">
                  Whether you're looking for your dream home or a prime investment opportunity, our team is ready to assist you every step of the way.
                </p>
                <div className="flex flex-col gap-4 text-white/70">
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-white/40" />
                    <span className="font-light">+230 5XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-white/40" />
                    <span className="font-light">info@rdc-residences.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-white/40" />
                    <span className="font-light">RDC Development, Coastal District</span>
                  </div>
                </div>
              </div>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm resize-none"
                ></textarea>
                <button
                  type="button"
                  className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors mt-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>

      {/* ===== FOOTER ===== (outside scroll-container, above canvas) */}
      <div className="relative z-20">
        <div className="absolute -top-40 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        <footer className="relative bg-black border-t border-white/10 py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold tracking-widest uppercase mb-4">RDC Residences</h3>
                <p className="text-white/50 font-light leading-relaxed max-w-sm">
                  A masterfully planned community where modern architecture meets nature. Premium living, redefined.
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-medium">Navigation</h4>
                <ul className="flex flex-col gap-3 text-white/60 font-light">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/apartments" className="hover:text-white transition-colors">The Collection</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-medium">Legal</h4>
                <ul className="flex flex-col gap-3 text-white/60 font-light">
                  <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/30">
              <p>&copy; {new Date().getFullYear()} RDC Residences. All rights reserved.</p>
              <p className="mt-4 md:mt-0">Designed with precision.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

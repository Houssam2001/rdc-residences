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
      q: "Quels types de résidences sont disponibles ?",
      a: "RDC Résidences propose une sélection de logements premium allant des studios aux penthouses spacieux de 4 chambres, chacun conçu avec une architecture moderne et des finitions haut de gamme.",
    },
    {
      q: "Les propriétés sont-elles accessibles aux acheteurs étrangers ?",
      a: "Oui, toutes les propriétés RDC sont éligibles à l'acquisition par des étrangers dans le cadre réglementaire en vigueur. Notre équipe vous accompagne tout au long du processus.",
    },
    {
      q: "Quels sont les équipements inclus ?",
      a: "Les résidents bénéficient de jardins paysagers, d'une piscine privée, d'une sécurité 24h/24, de parkings couverts et de la proximité des plages, commerces et réserves naturelles.",
    },
    {
      q: "Puis-je planifier une visite privée ?",
      a: "Absolument. Contactez notre équipe par téléphone ou via le formulaire et nous organiserons une visite privée à votre convenance.",
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
            <p className="text-sm md:text-base uppercase tracking-[0.4em] text-white/80 mb-6 font-light">Développement Résidentiel Premium</p>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.9] mb-8 drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
              RDC<br />Résidences
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-12 drop-shadow-lg">
              Là où l&apos;architecture moderne rencontre la nature. Découvrez un nouveau standard de vie.
            </p>
            <Link
              href="/apartments"
              className="inline-flex items-center gap-3 bg-[#005433] backdrop-blur-md border border-[#005433]/60 text-white px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#006a40] transition-all shadow-lg shadow-[#005433]/20"
            >
              Explorer la Collection
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
            <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-8 font-medium">À Propos du Projet</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-10">
              Une Vision de<br />Vie Intemporelle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-lg text-white/70 font-light leading-relaxed">
                RDC Résidences est une communauté magistralement planifiée au cœur d&apos;une verdure luxuriante et d&apos;une infrastructure moderne. Chaque logement est conçu pour maximiser la lumière naturelle, l&apos;espace ouvert et la connexion avec l&apos;environnement.
              </p>
              <p className="text-lg text-white/70 font-light leading-relaxed">
                De la précision de notre architecture à la sérénité de nos aménagements paysagers, chaque détail a été pensé pour créer un sanctuaire où les familles s&apos;épanouissent et les investissements prospèrent.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-white/10">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">43+</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Résidences</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">5.2</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Hectares</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">100%</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Paysagé</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Sécurité</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="relative min-h-screen flex items-center px-6 md:px-20 py-32">
          <div className="max-w-6xl mx-auto w-full">
            <div className="reveal text-center mb-20">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">Pourquoi RDC</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Conçu pour l&apos;Excellence
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: "Emplacement Privilégié", desc: "Stratégiquement situé près des plages, réserves naturelles et commodités urbaines pour un équilibre de vie optimal." },
                { icon: Shield, title: "Qualité Certifiée", desc: "Construction aux standards européens avec des matériaux premium, finitions bois massif et équipements sanitaires haut de gamme." },
                { icon: Gem, title: "Investissement Intelligent", desc: "Propriétés dans une zone à forte demande avec des rendements locatifs solides et une croissance du capital." },
                { icon: TreePine, title: "Vie Verte", desc: "Entouré d'aménagements paysagers matures, d'allées arborées et de jardins privés qui vous connectent à la nature." },
                { icon: Phone, title: "Service Conciergerie", desc: "Gestion immobilière dédiée et services de conciergerie pour une expérience de vie sans souci." },
                { icon: Mail, title: "Accès International", desc: "Accessible aux acheteurs internationaux avec un accompagnement complet de la demande à la remise des clés." },
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
              Découvrez Votre<br />Prochaine Maison
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-light mb-12 max-w-xl mx-auto">
              Parcourez la collection complète d&apos;appartements premium et trouvez celui qui vous correspond.
            </p>
            <Link
              href="/apartments"
              className="inline-flex items-center gap-4 bg-[#005433] text-white px-12 py-6 rounded-full text-base uppercase tracking-[0.2em] font-bold hover:bg-[#006a40] hover:scale-105 transition-all shadow-2xl shadow-[#005433]/20"
            >
              Voir Tous les Appartements
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
                Questions Fréquentes
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
                <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6 font-medium">Nous Contacter</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                  Contactez Notre Équipe
                </h2>
                <p className="text-lg text-white/60 font-light leading-relaxed mb-10">
                  Que vous recherchiez votre maison de rêve ou une opportunité d&apos;investissement, notre équipe est prête à vous accompagner à chaque étape.
                </p>
                <div className="flex flex-col gap-4 text-white/70">
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-white/40" />
                    <span className="font-light">+212 5XXX XXXX</span>
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
                  placeholder="Nom complet"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
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

      </div>

      {/* ===== FOOTER ===== (outside scroll-container, above canvas) */}
      <div className="relative z-20">
        <div className="absolute -top-40 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        <footer className="relative bg-black border-t border-white/10 py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold tracking-widest uppercase mb-4">RDC Résidences</h3>
                <p className="text-white/50 font-light leading-relaxed max-w-sm">
                  Une communauté magistralement planifiée où l&apos;architecture moderne rencontre la nature. L&apos;habitat premium, redéfini.
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-medium">Navigation</h4>
                <ul className="flex flex-col gap-3 text-white/60 font-light">
                  <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                  <li><Link href="/apartments" className="hover:text-white transition-colors">La Collection</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">À Propos</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-medium">Legal</h4>
                <ul className="flex flex-col gap-3 text-white/60 font-light">
                  <li><Link href="#" className="hover:text-white transition-colors">Politique de Confidentialité</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Conditions d&apos;Utilisation</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Politique de Cookies</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/30">
              <p>&copy; {new Date().getFullYear()} RDC Résidences. Tous droits réservés.</p>
              <p className="mt-4 md:mt-0">Conçu avec précision.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

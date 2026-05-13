import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6 md:px-10 md:py-4 backdrop-blur-md bg-black/40 border-b border-white/10 transition-all">
      <Link href="/" className="text-xl font-medium tracking-widest uppercase text-white hover:opacity-80 transition-opacity">
        RDC
      </Link>
      <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-white/80">
        <Link href="/#vision" className="hover:text-white transition-colors">Vision</Link>
        <Link href="/#design" className="hover:text-white transition-colors">Design</Link>
        <Link href="/apartments" className="hover:text-white transition-colors">The Collection</Link>
      </div>
      <Link href="/apartments" className="text-xs border border-white/30 rounded-full px-6 py-2 uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors">
        Explore
      </Link>
    </nav>
  );
}

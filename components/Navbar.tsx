import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-black/20 backdrop-blur-xl border-b border-white/10 transition-all">
      <Link href="/" className="text-xl font-bold tracking-[0.3em] uppercase text-white hover:opacity-80 transition-opacity">
        RDC
      </Link>
      <div className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-[0.2em] font-medium text-white/80">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="/apartments" className="hover:text-white transition-colors">The Collection</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
      <Link href="/apartments" className="text-[11px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2.5 uppercase tracking-[0.2em] font-medium text-white hover:bg-white/20 transition-all">
        Explore
      </Link>
    </nav>
  );
}

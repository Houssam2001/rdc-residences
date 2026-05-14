import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 bg-black/40 backdrop-blur-2xl border border-white/15 rounded-full px-2 py-1.5 shadow-2xl shadow-black/30">
        <Link href="/" className="text-[11px] font-bold tracking-[0.25em] uppercase text-white px-4 py-2 hover:opacity-70 transition-opacity">
          RDC
        </Link>
        <div className="w-[1px] h-4 bg-white/15" />
        <Link href="/apartments" className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/70 px-3 py-2 hover:text-white transition-colors rounded-full hover:bg-white/5">
          Résidences
        </Link>
        <Link href="/about" className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/70 px-3 py-2 hover:text-white transition-colors rounded-full hover:bg-white/5">
          À Propos
        </Link>
        <Link href="/contact" className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/70 px-3 py-2 hover:text-white transition-colors rounded-full hover:bg-white/5">
          Contact
        </Link>
        <Link href="/apartments" className="text-[10px] bg-[#005433] rounded-full px-5 py-2 uppercase tracking-[0.15em] font-semibold text-white hover:bg-[#006a40] transition-all ml-1">
          Explorer
        </Link>
      </nav>
    </div>
  );
}

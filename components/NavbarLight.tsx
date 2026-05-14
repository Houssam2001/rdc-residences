import Link from "next/link";

export default function NavbarLight() {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 bg-white/60 backdrop-blur-2xl border border-black/[0.06] rounded-full px-2 py-1.5 shadow-xl shadow-black/[0.04]">
        <Link
          href="/"
          className="text-[11px] font-bold tracking-[0.25em] uppercase text-black/80 px-4 py-2 hover:opacity-60 transition-opacity"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          RDC
        </Link>
        <div className="w-[1px] h-4 bg-black/10" />
        <Link
          href="/apartments"
          className="text-[10px] uppercase tracking-[0.15em] font-medium text-black/50 px-3 py-2 hover:text-black transition-colors rounded-full hover:bg-black/[0.03]"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          Résidences
        </Link>
        <Link
          href="/about"
          className="text-[10px] uppercase tracking-[0.15em] font-medium text-black/50 px-3 py-2 hover:text-black transition-colors rounded-full hover:bg-black/[0.03]"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          À Propos
        </Link>
        <Link
          href="/contact"
          className="text-[10px] uppercase tracking-[0.15em] font-medium text-black/50 px-3 py-2 hover:text-black transition-colors rounded-full hover:bg-black/[0.03]"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          Contact
        </Link>
        <Link
          href="/apartments"
          className="text-[10px] bg-black rounded-full px-5 py-2 uppercase tracking-[0.15em] font-semibold text-white hover:bg-black/80 transition-all ml-1"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          Explorer
        </Link>
      </nav>
    </div>
  );
}

import Link from "next/link";
import CartCount from "./CartCount";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white text-[#2b211b] shadow-[0_8px_28px_rgba(43,33,27,0.08)]">
      <div className="bg-[#a51d49] px-4 py-2 text-center text-[11px] font-semibold text-white">
        Enjoy 10% off on your first order. Secure online payments only.
      </div>

      <div className="luxury-container flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="font-display text-3xl font-semibold text-[#a51d49]" aria-label="NeevKart home">
          NeevKart
        </Link>

        <label className="hidden h-10 w-full max-w-[470px] items-center gap-3 rounded-full border border-[#d8b38a] bg-[#fffaf5] px-4 text-[#9a7c67] md:flex">
          <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
          <input
            className="w-full bg-transparent text-xs outline-none placeholder:text-[#9a7c67]"
            placeholder="Search for silk sarees"
            type="search"
          />
        </label>

        <div className="flex items-center gap-3 text-[#3d3029]">
          <button className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#fff1f5] hover:text-[#a51d49]" aria-label="Search">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.8-3.8" />
            </svg>
          </button>
          <Link href="/login" className="hidden h-9 w-9 place-items-center rounded-full transition hover:bg-[#fff1f5] hover:text-[#a51d49] sm:grid" aria-label="Account">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 20a7 7 0 0 1 14 0" />
            </svg>
          </Link>
          <Link href="/cart" className="relative grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#fff1f5] hover:text-[#a51d49]" aria-label="Cart">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M6.5 8.5h11l-.9 10.5H7.4L6.5 8.5Z" />
              <path d="M9.2 8.5a2.8 2.8 0 0 1 5.6 0" />
            </svg>
            <CartCount />
          </Link>
          <button className="grid h-9 w-9 place-items-center rounded-full lg:hidden" aria-label="Menu">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="border-t border-[#f0e2d8] bg-white">
        <div className="luxury-container hidden h-11 items-center justify-center gap-9 text-[12px] font-medium text-[#56463e] lg:flex">
          <Link href="/sarees?type=sarees" className="transition hover:text-[#a51d49]">
            Sarees
          </Link>
          <Link href="/sarees?material=silk" className="transition hover:text-[#a51d49]">
            Silks
          </Link>
          <Link href="/sarees?material=cotton" className="transition hover:text-[#a51d49]">
            Cotton
          </Link>
          <Link href="/sarees?category=wedding" className="transition hover:text-[#a51d49]">
            Wedding
          </Link>
          <Link href="/sarees?category=festive" className="transition hover:text-[#a51d49]">
            Festive
          </Link>
          <Link href="/sarees?category=new" className="transition hover:text-[#a51d49]">
            New Arrivals
          </Link>
        </div>
      </nav>
    </header>
  );
}

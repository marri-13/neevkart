import Link from "next/link";
import CartCount from "./CartCount";

const navItems = [
  {
    label: "Sarees",
    href: "/sarees",
    menu: [
      { label: "All Sarees", href: "/sarees" },
      { label: "Summer Sarees", href: "/sarees?type=summer" },
      { label: "Party Wear Sarees", href: "/sarees?type=party-wear" },
      { label: "Daily Wear Sarees", href: "/sarees?type=daily-wear" },
      { label: "Designer Sarees", href: "/sarees?type=designer" },
    ],
  },
  {
    label: "Silks",
    href: "/sarees?material=silk",
    menu: [
      { label: "All Silk Sarees", href: "/sarees?material=silk" },
      { label: "Kanjivaram Silk", href: "/sarees?type=kanjivaram" },
      { label: "Banarasi Silk", href: "/sarees?type=banarasi" },
      { label: "Silk Cotton", href: "/sarees?material=silk-cotton" },
      { label: "Traditional Silks", href: "/sarees?type=traditional&material=silk" },
    ],
  },
  {
    label: "Cotton",
    href: "/sarees?material=cotton",
    menu: [
      { label: "All Cotton Sarees", href: "/sarees?material=cotton" },
      { label: "Chanderi Cotton", href: "/sarees?type=chanderi" },
      { label: "Summer Cotton", href: "/sarees?type=summer&material=cotton" },
      { label: "Daily Wear Cotton", href: "/sarees?type=daily-wear&material=cotton" },
    ],
  },
  {
    label: "Wedding",
    href: "/sarees?category=wedding",
    menu: [
      { label: "Wedding Collection", href: "/sarees?category=wedding" },
      { label: "Bridal Sarees", href: "/sarees?type=bridal" },
      { label: "Reception Sarees", href: "/sarees?type=party-wear&category=wedding" },
      { label: "Banarasi Wedding", href: "/sarees?type=banarasi&category=wedding" },
    ],
  },
  {
    label: "Festive",
    href: "/sarees?category=festive",
    menu: [
      { label: "Festive Wear", href: "/sarees?category=festive" },
      { label: "Party Wear Sarees", href: "/sarees?type=party-wear" },
      { label: "Traditional Sarees", href: "/sarees?type=traditional" },
      { label: "Silk Cotton Festive", href: "/sarees?material=silk-cotton&category=festive" },
    ],
  },
  {
    label: "New Arrivals",
    href: "/sarees?category=new",
    menu: [
      { label: "Latest Sarees", href: "/sarees?category=new" },
      { label: "Designer Sarees", href: "/sarees?type=designer" },
      { label: "Summer Sarees", href: "/sarees?type=summer" },
      { label: "Fresh Festive Picks", href: "/sarees?category=new&type=party-wear" },
    ],
  },
];

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
        <div className="luxury-container hidden h-11 items-stretch justify-center gap-2 text-[12px] font-medium text-[#56463e] lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group relative flex items-center">
              <Link href={item.href} className="flex h-11 items-center px-4 transition hover:text-[#a51d49]">
                {item.label}
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 rounded-b-lg border border-[#f0e2d8] bg-white p-3 opacity-0 shadow-[0_18px_35px_rgba(43,33,27,0.14)] transition group-hover:visible group-hover:opacity-100">
                <div className="mb-2 border-b border-[#f4e8de] px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a51d49]">
                  {item.label} Types
                </div>
                {item.menu.map((menuItem) => (
                  <Link
                    key={menuItem.href}
                    href={menuItem.href}
                    className="block rounded-md px-3 py-2 text-[12px] text-[#56463e] transition hover:bg-[#fff1f5] hover:text-[#a51d49]"
                  >
                    {menuItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}

import Link from "next/link";
import CartCount from "./CartCount";

const sareeMenuSections = [
  {
    title: "Shop By Occasion",
    items: [
      ["Summer Sarees", "/sarees?type=summer"],
      ["Summer Wedding Sarees", "/sarees?type=summer-wedding"],
      ["Formal Sarees", "/sarees?type=formal"],
      ["Casual Sarees", "/sarees?type=casual"],
      ["Festive Sarees", "/sarees?type=festive"],
      ["Bridal Sarees", "/sarees?type=bridal"],
      ["Party Wear Sarees", "/sarees?type=party-wear"],
      ["Haldi Sarees", "/sarees?type=haldi"],
      ["Engagement Sarees", "/sarees?type=engagement"],
      ["Farewell & Graduation Sarees", "/sarees?type=farewell-graduation"],
    ],
  },
  {
    title: "Shop By Fabric",
    items: [
      ["Cotton Sarees", "/sarees?material=cotton"],
      ["Kota Sarees", "/sarees?type=kota"],
      ["Khadi Sarees", "/sarees?type=khadi"],
      ["Linen Sarees", "/sarees?type=linen"],
      ["Crepe Sarees", "/sarees?type=crepe"],
      ["Silk Sarees", "/sarees?material=silk"],
      ["Pattu Sarees", "/sarees?type=pattu"],
      ["Tissue Sarees", "/sarees?type=tissue"],
      ["Chiffon Sarees", "/sarees?type=chiffon"],
    ],
  },
  {
    title: "Shop By Colour",
    items: [
      ["White Sarees", "/sarees?type=white"],
      ["Pastel Sarees", "/sarees?type=pastel"],
      ["Pink Sarees", "/sarees?type=pink"],
      ["Blue Sarees", "/sarees?type=blue"],
      ["Yellow Sarees", "/sarees?type=yellow"],
      ["Black Sarees", "/sarees?type=black"],
      ["Red Sarees", "/sarees?type=red"],
      ["Gold Sarees", "/sarees?type=gold"],
      ["Green Sarees", "/sarees?type=green"],
      ["Peach Sarees", "/sarees?type=peach"],
      ["Multicoloured Sarees", "/sarees?type=multicoloured"],
    ],
  },
  {
    title: "Heirloom Pieces",
    items: [
      ["Kanchipuram Sarees", "/sarees?type=kanchipuram"],
      ["Banarasi Sarees", "/sarees?type=banarasi"],
      ["Paithani Sarees", "/sarees?type=paithani"],
    ],
  },
];

const navItems = [
  { label: "Sarees", href: "/sarees", hasMegaMenu: true },
  { label: "Silks", href: "/sarees?material=silk" },
  { label: "Cotton", href: "/sarees?material=cotton" },
  { label: "Wedding", href: "/sarees?category=wedding" },
  { label: "Festive", href: "/sarees?category=festive" },
  { label: "New Arrivals", href: "/sarees?category=new" },
  { label: "Dress Materials", href: "/dress-materials" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfd6] bg-white/95 text-[#2b211b] shadow-[0_12px_36px_rgba(43,33,27,0.08)] backdrop-blur-xl">

      {/* TOP STRIP — promo */}
      <div className="bg-[#a51d49] px-4 py-2 text-center text-[11px] font-semibold text-white">
        Enjoy 10% off on your first order. Secure online payments only.
      </div>

      {/* MAIN ROW — logo, search, icons */}
      <div className="luxury-container flex min-h-20 items-center justify-between gap-5 py-4">

        <Link href="/" className="group flex items-center gap-3" aria-label="NeevKart home">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#a51d49] font-display text-xl font-semibold text-white shadow-[0_12px_30px_rgba(165,29,73,0.24)] transition group-hover:rotate-6">
            N
          </span>
          <span className="font-display text-3xl font-semibold tracking-tight text-[#a51d49]">
            NeevKart
          </span>
        </Link>

        <label className="hidden h-11 w-full max-w-[460px] items-center gap-3 rounded-full border border-[#ead4c5] bg-[#fffaf5] px-5 text-[#9a7c67] transition focus-within:border-[#a51d49] md:flex">
          <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
          <input
            className="w-full bg-transparent text-xs outline-none placeholder:text-[#9a7c67]"
            placeholder="Search silk, cotton, bridal sarees"
            type="search"
          />
        </label>

        <div className="flex items-center gap-2 text-[#3d3029]">

          <button className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#fff1f5] hover:text-[#a51d49] md:hidden" aria-label="Search">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.8-3.8" />
            </svg>
          </button>

          <Link href="/login" className="hidden h-10 w-10 place-items-center rounded-full transition hover:bg-[#fff1f5] hover:text-[#a51d49] sm:grid" aria-label="Account">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 20a7 7 0 0 1 14 0" />
            </svg>
          </Link>

          <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#fff1f5] hover:text-[#a51d49]" aria-label="Cart">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M6.5 8.5h11l-.9 10.5H7.4L6.5 8.5Z" />
              <path d="M9.2 8.5a2.8 2.8 0 0 1 5.6 0" />
            </svg>
            <CartCount />
          </Link>

          <button className="grid h-10 w-10 place-items-center rounded-full lg:hidden" aria-label="Menu">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

        </div>
      </div>

      {/* BOTTOM ROW — nav items + mega menu */}
      <nav className="border-t border-[#f0e2d8] bg-white/96">
        <div className="luxury-container hidden h-14 items-stretch justify-center gap-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#56463e] lg:flex">

          {navItems.map((item) => (
            <div key={item.label} className="group relative flex items-center">

              <Link href={item.href} className="flex h-14 items-center rounded-full px-5 transition hover:bg-[#fff7f9] hover:text-[#a51d49]">
                {item.label}
              </Link>

              {item.hasMegaMenu && (
                <div className="invisible absolute left-1/2 top-full z-50 w-[min(92vw,1080px)] -translate-x-1/2 translate-y-3 rounded-b-[2rem] border border-[#f0e2d8] bg-white p-8 opacity-0 shadow-[0_28px_80px_rgba(43,33,27,0.16)] transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                  <div className="mb-6 flex items-center justify-between border-b border-[#f4e8de] pb-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a51d49]">
                        Saree Collections
                      </p>
                      <p className="mt-2 text-sm font-normal normal-case tracking-normal text-[#7f6758]">
                        Explore by occasion, fabric, colour, and heirloom craft.
                      </p>
                    </div>
                    <Link href="/sarees" className="rounded-full bg-[#a51d49] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#8b1840]">
                      View All
                    </Link>
                  </div>

                  <div className="grid grid-cols-[1.25fr_1.1fr_1.25fr_0.9fr] gap-7">
                    {sareeMenuSections.map((section) => (
                      <div key={section.title} className="min-w-0">
                        <h3 className="mb-4 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f1712]">
                          {section.title}
                        </h3>
                        <div className="grid gap-1.5">
                          {section.items.map(([label, href]) => (
                            <Link key={href} href={href} className="rounded-xl px-3 py-2 text-[13px] font-medium normal-case leading-5 tracking-normal text-[#635047] transition hover:bg-[#fff1f5] hover:text-[#a51d49]">
                              {label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          ))}

        </div>
      </nav>

    </header>
  );
}
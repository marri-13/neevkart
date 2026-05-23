"use client";

import { FormEvent, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      ["Patola Sarees", "/sarees?type=patola"],
    ],
  },
  {
    title: "Shop By Price Range",
    items: [
      ["Sarees Under 2000", "/sarees?type=under-2000"],
      ["Sarees Under 5000", "/sarees?type=under-5000"],
      ["Sarees Under 10000", "/sarees?type=under-10000"],
      ["Sarees Under 15000", "/sarees?type=under-15000"],
    ],
  },
  {
    title: "Shop By Region",
    items: [
      ["Rajasthan Sarees", "/sarees?type=rajasthan"],
      ["Bengal Sarees", "/sarees?type=bengal"],
      ["Bhagalpuri Sarees", "/sarees?type=bhagalpuri"],
      ["Gujarati Sarees", "/sarees?type=gujarati"],
      ["Chanderi Sarees", "/sarees?type=chanderi"],
      ["Maheshwari Sarees", "/sarees?type=maheshwari"],
      ["Kanjivaram Sarees", "/sarees?type=kanjivaram"],
      ["South Indian Sarees", "/sarees?type=south-indian"],
    ],
  },
  {
    title: "Shop By Look",
    items: [
      ["Floral Sarees", "/sarees?type=floral"],
      ["Handloom Sarees", "/sarees?type=handloom"],
      ["Bandhani Sarees", "/sarees?type=bandhani"],
      ["Chikankari Sarees", "/sarees?type=chikankari"],
      ["Plain Sarees", "/sarees?type=plain"],
      ["Ajrakh Sarees", "/sarees?type=ajrakh"],
      ["Embroidery Sarees", "/sarees?type=embroidery"],
      ["Printed Sarees", "/sarees?type=printed"],
      ["Jamdani Sarees", "/sarees?type=jamdani"],
      ["Kalamkari Sarees", "/sarees?type=kalamkari"],
    ],
  },
];

const navItems = [
  { label: "Sarees", href: "/sarees", hasMegaMenu: true },
  { label: "Wedding", href: "/sarees?category=wedding" },
  { label: "Festive", href: "/sarees?category=festive" },
  { label: "New Arrivals", href: "/sarees?category=new" },
  { label: "Dress Materials", href: "/dress-materials" },
];

const mobileMenuItems = [
  ["Sarees", "/sarees"],
  ["Wedding", "/sarees?category=wedding"],
  ["Festive", "/sarees?category=festive"],
  ["New Arrivals", "/sarees?category=new"],
  ["Dress Materials", "/dress-materials"],
  ["Silk Sarees", "/sarees?material=silk"],
  ["Cotton Sarees", "/sarees?material=cotton"],
];

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const isLoaded = true;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [userMenuOpen]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    router.push(query ? `/sarees?search=${encodeURIComponent(query)}` : "/sarees");
    setMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    // Navigate to cart directly since authentication is bypassed/removed
    router.push("/cart");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#f1d7df] bg-gradient-to-r from-[#fff7f9] via-[#ffeef4] to-[#fff8fb] shadow-[0_4px_20px_rgba(236,72,153,0.06)]">

      <div className="mx-auto flex h-24 items-center justify-between px-8 bg-gradient-to-r from-pink-50 to-pink-100 bg-[url('/images/floral-pattern.png')] bg-repeat">
        <Link href="/" className="flex items-center gap-3" aria-label="NeevKart home">
          <div className="flex items-center relative">
            <svg
              className="w-24 h-16 absolute left-0 -top-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Red Arrow */}
              <path
                d="M10 60 C30 40, 70 40, 90 20 L80 10 L95 20 L90 30 L80 20"
                stroke="#EF4444"
                strokeWidth="5"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
              {/* Green Arrow */}
              <path
                d="M10 70 C30 50, 70 50, 90 30 L80 20 L95 30 L90 40 L80 30"
                stroke="#22C55E"
                strokeWidth="5"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
              {/* Blue Arrow */}
              <path
                d="M10 80 C30 60, 70 60, 90 40 L80 30 L95 40 L90 50 L80 40"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-0"
              />
            </svg>
            <span className="text-2xl font-bold text-[#2b211b] ml-24">NeevKart</span>
          </div>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden h-14 w-full max-w-[620px] items-center gap-4 rounded-full border border-[#efc9d7] bg-[#fff7f9] px-6 text-[#9f6b7d] backdrop-blur-sm transition focus:border-[#d86b93] focus:outline-none focus:ring-2 focus:ring-[#f8c8d8] md:flex"
        >
          <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9a7c67]"
            placeholder="Search silk, cotton, bridal sarees"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="submit"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#a51d49] transition hover:bg-[#fff1f5]"
            aria-label="Search products"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.8-3.8" />
            </svg>
          </button>
        </form>

        <div className="flex items-center gap-2 text-[#3d3029]">
          <Link href="/sarees" className="text-[#8f5c70] transition hover:text-[#c44778] md:hidden" aria-label="Search">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.8-3.8" />
            </svg>
          </Link>

          {isLoaded && !user ? (
            <Link href="/login" className="hidden text-[#8f5c70] transition hover:text-[#c44778] sm:grid" aria-label="Account">
              <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.2" />
                <path d="M5 20a7 7 0 0 1 14 0" />
              </svg>
            </Link>
          ) : isLoaded && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="hidden text-[#8f5c70] transition hover:text-[#c44778] sm:grid"
                aria-label="Account menu"
              >
                <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="3.2" />
                  <path d="M5 20a7 7 0 0 1 14 0" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-[#f0e2d8] bg-white shadow-[0_8px_32px_rgba(43,33,27,0.16)] z-50">
                  {/* User Info */}
                  <div className="border-b border-[#f0e2d8] px-6 py-4">
                    <p className="text-sm font-semibold text-[#2b211b]">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#8a7062]">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        router.push("/account");
                        setUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-6 py-3 text-sm text-[#6f5948] hover:bg-[#fff1f5] hover:text-[#a51d49] transition"
                    >
                      <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                        <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0" />
                      </svg>
                      Manage account
                    </button>

                    <button
                      onClick={() => {
                        router.push("/orders");
                        setUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-6 py-3 text-sm text-[#6f5948] hover:bg-[#fff1f5] hover:text-[#a51d49] transition"
                    >
                      <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                        <path d="M9 3H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h4" />
                        <path d="M15 3h4a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2h-4" />
                        <path d="M9 6h6M9 12h6M9 18h6" />
                      </svg>
                      My Orders
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 px-6 py-3 text-sm text-[#6f5948] hover:bg-[#fff1f5] hover:text-[#a51d49] transition"
                    >
                      <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <button
            onClick={handleCartClick}
            className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#fff1f5] hover:text-[#a51d49]"
            aria-label="Cart"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M6.5 8.5h11l-.9 10.5H7.4L6.5 8.5Z" />
              <path d="M9.2 8.5a2.8 2.8 0 0 1 5.6 0" />
            </svg>
            <CartCount />
          </button>

          <button
            className="text-[#8f5c70] transition hover:text-[#c44778] lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* NAV ROW */}
      <nav className="relative border-t border-[#f0e2d8] bg-white/96">
        <div className="luxury-container hidden h-16 items-stretch justify-center gap-7 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#56463e] md:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group flex items-center">
              <Link href={item.href} className="flex h-16 items-center rounded-full px-6 transition hover:bg-[#fff7f9] hover:text-[#a51d49]">
                {item.label}
              </Link>

              {/* MEGA MENU */}
              {item.hasMegaMenu && (
                <div className="invisible absolute left-0 right-0 top-full z-50 translate-y-3 opacity-0 transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mx-auto max-w-[1880px] overflow-hidden rounded-b-[1.6rem] border-y border-[#f0e2d8] bg-white shadow-[0_28px_80px_rgba(43,33,27,0.16)]">
                    <div className="px-10 py-14 xl:px-14">
                      <div className="grid grid-cols-4 gap-x-12 gap-y-12 xl:grid-cols-7">

                        {sareeMenuSections.map((section) => (
                          <div key={section.title}>

                            {/* SECTION HEADER */}
                            <h3 className="text-[13px] font-bold normal-case tracking-normal text-[#1f1712]">
                              {section.title}
                            </h3>

                            {/* SMALL DIVIDER LINE */}
                            <div className="mt-3 mb-6 h-px w-8 bg-[#a51d49]/30" />

                            {/* LINKS */}
                            <div className="grid gap-4">
                              {section.items.map(([label, href]) => (
                                <Link
                                  key={href}
                                  href={href}
                                  className="text-[13px] font-normal normal-case leading-5 tracking-normal text-[#6f5948] transition hover:text-[#a51d49]"
                                >
                                  {label}
                                </Link>
                              ))}
                            </div>

                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t border-[#eadfd6] bg-white px-5 py-6 shadow-[0_24px_60px_rgba(43,33,27,0.14)] md:hidden">
          <form onSubmit={handleSearch} className="mb-6 flex h-12 items-center gap-3 rounded-full border border-[#e2c7b2] bg-[#fffaf5] px-5 text-[#9a7c67]">
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#9a7c67]"
              placeholder="Search sarees"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit" className="font-semibold text-[#a51d49]">
              Go
            </button>
          </form>

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a51d49]">Popular</p>
          <div className="grid gap-1">
            {mobileMenuItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-[#59463d] hover:bg-[#fff1f5] hover:text-[#a51d49]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
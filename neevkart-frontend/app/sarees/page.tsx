"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/product/ProductCard";
import { Product, products } from "@/lib/products";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";

type SortOption = "newest" | "price-low" | "price-high" | "popular";

const categories = ["All", "Silk Sarees", "Cotton Sarees", "Wedding Collection", "Festive Wear", "New Arrivals"];
const fabricTypes = ["Silk", "Cotton", "Brocade", "Organza", "Silk Cotton", "Embroidered Silk", "Kota", "Khadi", "Linen", "Crepe", "Pattu", "Tissue", "Chiffon"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under Rs. 5,000", min: 0, max: 5000 },
  { label: "Rs. 5,000 - Rs. 10,000", min: 5000, max: 10000 },
  { label: "Rs. 10,000 - Rs. 20,000", min: 10000, max: 20000 },
  { label: "Above Rs. 20,000", min: 20000, max: Infinity },
];

const categoryQueryMap: Record<string, string> = {
  silk: "Silk Sarees",
  cotton: "Cotton Sarees",
  wedding: "Wedding Collection",
  festive: "Festive Wear",
  new: "New Arrivals",
  "new-arrivals": "New Arrivals",
};

const typeLabels: Record<string, string> = {
  summer: "Summer Sarees",
  "summer-wedding": "Summer Wedding Sarees",
  formal: "Formal Sarees",
  casual: "Casual Sarees",
  festive: "Festive Sarees",
  bridal: "Bridal Sarees",
  "party-wear": "Party Wear Sarees",
  haldi: "Haldi Sarees",
  engagement: "Engagement Sarees",
  "farewell-graduation": "Farewell & Graduation Sarees",
  "daily-wear": "Daily Wear Sarees",
  designer: "Designer Sarees",
  kanjivaram: "Kanjivaram Silk Sarees",
  kanchipuram: "Kanchipuram Sarees",
  banarasi: "Banarasi Sarees",
  paithani: "Paithani Sarees",
  kota: "Kota Sarees",
  khadi: "Khadi Sarees",
  linen: "Linen Sarees",
  crepe: "Crepe Sarees",
  pattu: "Pattu Sarees",
  tissue: "Tissue Sarees",
  chiffon: "Chiffon Sarees",
  white: "White Sarees",
  pastel: "Pastel Sarees",
  pink: "Pink Sarees",
  blue: "Blue Sarees",
  yellow: "Yellow Sarees",
  black: "Black Sarees",
  red: "Red Sarees",
  gold: "Gold Sarees",
  green: "Green Sarees",
  peach: "Peach Sarees",
  multicoloured: "Multicoloured Sarees",
  "silk-cotton": "Silk Cotton Sarees",
  chanderi: "Chanderi Cotton Sarees",
  traditional: "Traditional Sarees",
};

function toTitleCase(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalize(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function categoryFromQuery(value: string | null) {
  if (!value) {
    return "All";
  }

  const normalized = normalize(value);
  return categoryQueryMap[normalized] ?? categories.find((category) => normalize(category) === normalized) ?? "All";
}

function fabricFromQuery(value: string | null) {
  if (!value) {
    return null;
  }

  const normalized = normalize(value);
  return fabricTypes.find((fabric) => normalize(fabric) === normalized) ?? toTitleCase(normalized);
}

function productMatchesType(product: Product, type: string | null) {
  if (!type) {
    return true;
  }

  const normalizedType = normalize(type);
  const searchableValues = [
    product.name,
    product.category,
    product.fabric,
    product.occasion,
    product.tag ?? "",
    ...(product.collections ?? []),
  ].map(normalize);

  return searchableValues.some((value) => value === normalizedType || value.includes(normalizedType));
}

function SareesListing({
  queryCategory,
  queryMaterial,
  queryType,
}: {
  queryCategory: string | null;
  queryMaterial: string | null;
  queryType: string | null;
}) {
  const initialCategory = categoryFromQuery(queryCategory);
  const initialFabric = fabricFromQuery(queryMaterial);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(initialFabric);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);


  const pageTitle = useMemo(() => {
    if (queryType) {
      return typeLabels[normalize(queryType)] ?? `${toTitleCase(normalize(queryType))} Sarees`;
    }

    if (selectedCategory !== "All") {
      return selectedCategory;
    }

    if (selectedFabric) {
      return `${selectedFabric} Sarees`;
    }

    return "Sarees Collection";
  }, [queryType, selectedCategory, selectedFabric]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedFabric) {
      result = result.filter((p) => normalize(p.fabric).includes(normalize(selectedFabric)));
    }

    result = result.filter((p) => productMatchesType(p, queryType));
    result = result.filter((p) => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max);

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.tag === "Bestseller" ? 1 : -1));
    }

    return result;
  }, [selectedCategory, selectedFabric, selectedPriceRange, sortBy, queryType]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fffaf5]">
        {/* Breadcrumb */}
        <div className="border-b border-[#eadfd6] bg-white/70">
          <div className="luxury-container py-4">
            <div className="flex items-center gap-2 text-sm text-[#8a7062]">
              <Link href="/" className="hover:text-[#1f1712]">
                Home
              </Link>
              <span>/</span>
              <Link href="/sarees" className="hover:text-[#1f1712]">
                Sarees
              </Link>
              {pageTitle !== "Sarees Collection" && (
                <>
                  <span>/</span>
                  <span className="text-[#1f1712]">{pageTitle}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-br from-white via-[#fff8f2] to-[#f6e8dc]">
          <div className="luxury-container py-14 md:py-20">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#a51d49]">NeevKart Curated Collection</p>
            <h1 className="font-display text-4xl font-medium text-[#1f1712] md:text-6xl">{pageTitle}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#7f6758] md:text-base">
              Browse a refined selection of sarees filtered by collection, fabric, and occasion with more room to view every detail.
            </p>
          </div>
        </div>

        <div className="luxury-container py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[290px_1fr]">
            {/* Filters Sidebar */}
            <div
              className={`lg:col-span-1 ${
                showFilters ? "block" : "hidden lg:block"
              } rounded-[1.5rem] border border-[#eadfd6] bg-white p-6 shadow-[0_18px_45px_rgba(43,33,27,0.06)] lg:sticky lg:top-40 lg:self-start`}
            >
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-lg font-medium text-[#1f1712]">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-[#8a7062] lg:hidden"
                >
                  ✕
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-9">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#1f1712]">
                  Category
                </h4>
                <div className="space-y-3.5">
                  {categories.map((cat) => (
                    <label key={cat} className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#fff7f9]">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="h-4 w-4 cursor-pointer accent-[#a51d49]"
                      />
                      <span className="text-sm text-[#6f5948]">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-9">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#1f1712]">
                  Price
                </h4>
                <div className="space-y-3.5">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#fff7f9]">
                      <input
                        type="radio"
                        name="price"
                        checked={
                          selectedPriceRange.min === range.min && selectedPriceRange.max === range.max
                        }
                        onChange={() => setSelectedPriceRange({ min: range.min, max: range.max })}
                        className="h-4 w-4 cursor-pointer accent-[#a51d49]"
                      />
                      <span className="text-sm text-[#6f5948]">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fabric Filter */}
              <div className="mb-9">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#1f1712]">
                  Fabric
                </h4>
                <div className="space-y-3.5">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#fff7f9]">
                    <input
                      type="checkbox"
                      checked={selectedFabric === null}
                      onChange={() => setSelectedFabric(null)}
                      className="h-4 w-4 cursor-pointer accent-[#a51d49]"
                    />
                    <span className="text-sm text-[#6f5948]">All Fabrics</span>
                  </label>
                  {fabricTypes.map((fabric) => (
                    <label key={fabric} className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#fff7f9]">
                      <input
                        type="checkbox"
                        checked={selectedFabric === fabric}
                        onChange={() => setSelectedFabric(selectedFabric === fabric ? null : fabric)}
                        className="h-4 w-4 cursor-pointer accent-[#a51d49]"
                      />
                      <span className="text-sm text-[#6f5948]">{fabric}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedFabric(null);
                  setSelectedPriceRange({ min: 0, max: Infinity });
                  setSortBy("newest");
                }}
                className="w-full rounded-full border border-[#a51d49]/35 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#a51d49] transition hover:bg-[#a51d49] hover:text-white"
              >
                Clear All Filters
              </button>
            </div>

            {/* Main Content */}
            <div className="min-w-0">
              {/* Toolbar */}
              <div className="mb-10 flex flex-col items-center justify-between gap-5 rounded-[1.4rem] border border-[#eadfd6] bg-white px-6 py-5 shadow-[0_14px_38px_rgba(43,33,27,0.05)] sm:flex-row">
                <p className="text-sm text-[#8a7062]">
                  Showing <span className="font-semibold text-[#1f1712]">{filteredProducts.length}</span> products
                </p>

                <div className="flex w-full items-center gap-3 sm:w-auto">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 rounded-full border border-[#a51d49]/35 px-5 py-2.5 text-sm font-semibold text-[#a51d49] lg:hidden"
                  >
                    ⚙ Filters
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="flex-1 rounded-full border border-[#d4c4b0] bg-white px-5 py-2.5 text-sm text-[#1f1712] focus:border-[#a51d49] focus:outline-none sm:flex-none"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Popular</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="mb-4 text-lg text-[#8a7062]">No sarees found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedFabric(null);
                      setSelectedPriceRange({ min: 0, max: Infinity });
                    }}
                    className="text-[#a51d49] underline hover:text-[#8a1c39]"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Policy Banner */}
        <div className="border-t border-[#eadfd6] bg-white">
          <div className="luxury-container grid gap-4 py-10 text-center text-sm text-[#6f5948] md:grid-cols-3">
            <p>✓ Secure online payments only</p>
            <p>✓ No Cash on Delivery (COD)</p>
            <p>✓ All sales are final. No return or exchange.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SareesContent() {
  const searchParams = useSearchParams();

  return (
    <SareesListing
      key={searchParams.toString()}
      queryCategory={searchParams.get("category")}
      queryMaterial={searchParams.get("material")}
      queryType={searchParams.get("type")}
    />
  );
}

export default function SareesPage() {
  return (
    <Suspense fallback={null}>
      <SareesContent />
    </Suspense>
  );
}

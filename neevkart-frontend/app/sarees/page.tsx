"use client";

import { Suspense, useMemo, useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/product/ProductCard";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";
import { products, type Product } from "@/lib/products";
import axios from "axios";
import { API_URL } from "@/lib/userAuth";

type SortOption = "newest" | "price-low" | "price-high" | "popular";

const categories = ["All", "Silk Sarees", "Cotton Sarees", "Wedding Collection", "Festive Wear", "New Arrivals"];
const fabricTypes = [
  "Silk",
  "Cotton",
  "Brocade",
  "Organza",
  "Silk Cotton",
  "Embroidered Silk",
  "Banarasi Silk",
  "Linen Cotton",
  "Kota",
  "Khadi",
  "Linen",
  "Crepe",
  "Pattu",
  "Tissue",
  "Chiffon",
];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under Rs. 2,000", min: 0, max: 2000 },
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
  patola: "Patola Sarees",
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
  rajasthan: "Rajasthan Sarees",
  bengal: "Bengal Sarees",
  bhagalpuri: "Bhagalpuri Sarees",
  gujarati: "Gujarati Sarees",
  maheshwari: "Maheshwari Sarees",
  "south-indian": "South Indian Sarees",
  floral: "Floral Sarees",
  handloom: "Handloom Sarees",
  bandhani: "Bandhani Sarees",
  chikankari: "Chikankari Sarees",
  plain: "Plain Sarees",
  ajrakh: "Ajrakh Sarees",
  embroidery: "Embroidery Sarees",
  printed: "Printed Sarees",
  jamdani: "Jamdani Sarees",
  kalamkari: "Kalamkari Sarees",
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

function productSearchText(product: Product) {
  return [
    product.name,
    product.category,
    product.fabric,
    product.occasion,
    product.color,
    product.tag ?? "",
    product.description,
    ...product.details,
    ...(product.collections ?? []),
  ]
    .map(normalize)
    .join("-");
}

function productMatchesType(product: Product, type: string | null) {
  if (!type) {
    return true;
  }

  const normalizedType = normalize(type);

  if (normalizedType.startsWith("under-")) {
    const max = Number(normalizedType.replace("under-", ""));
    return Number.isFinite(max) ? product.price <= max : true;
  }

  return productSearchText(product).includes(normalizedType);
}

function SareesListing({
  queryCategory,
  queryMaterial,
  queryType,
  querySearch,
}: {
  queryCategory: string | null;
  queryMaterial: string | null;
  queryType: string | null;
  querySearch: string | null;
}) {
  const initialCategory = categoryFromQuery(queryCategory);
  const initialFabric = fabricFromQuery(queryMaterial);
  const normalizedSearch = normalize(querySearch ?? "");

  const [items, setItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(initialFabric);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        if (response.data && response.data.products) {
          const mapped = response.data.products.map((p: any) => ({
            ...p,
            id: p.id || p._id,
          }));
          setItems(mapped);
        } else {
          setItems(products);
        }
      } catch (err) {
        console.warn("Failed to load sarees from backend. Using static fallback.", err);
        setItems(products);
      }
    };
    loadProducts();
  }, []);

  const pageTitle = useMemo(() => {
    if (querySearch) {
      return `Search results for "${querySearch}"`;
    }

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
  }, [querySearch, queryType, selectedCategory, selectedFabric]);

  const filteredProducts = useMemo(() => {
    let result = items.filter((product) => product.category !== "Dress Materials");

    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (selectedFabric) {
      result = result.filter((product) => normalize(product.fabric).includes(normalize(selectedFabric)));
    }

    result = result.filter((product) => productMatchesType(product, queryType));

    if (normalizedSearch) {
      result = result.filter((product) => productSearchText(product).includes(normalizedSearch));
    }

    result = result.filter((product) => product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max);

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => Number(b.tag === "Bestseller") - Number(a.tag === "Bestseller"));
    }

    return result;
  }, [selectedCategory, selectedFabric, selectedPriceRange, sortBy, queryType, normalizedSearch]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedFabric(null);
    setSelectedPriceRange({ min: 0, max: Infinity });
    setSortBy("newest");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="border-b border-[#eadfd6] bg-[#fffaf5]">
          <div className="luxury-container py-5">
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

        <section className="bg-[#fbf8f4]">
          <div className="luxury-container py-14 md:py-20">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-[#a51d49]">
                  NeevKart Saree House
                </p>
                <h1 className="font-display text-4xl font-medium leading-tight text-[#1f1712] md:text-5xl">
                  {pageTitle}
                </h1>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#7f6758]">
                Explore premium drapes with calmer spacing, larger imagery, and practical filters for fabric, price, and occasion.
              </p>
            </div>
          </div>
        </section>

        <section className="luxury-container py-14 md:py-20">
          <div className="mb-10 flex flex-col gap-5 border-b border-[#eadfd6] pb-8 lg:flex-row lg:items-center lg:justify-between">
            <button
              onClick={() => setShowFilters((current) => !current)}
              className="w-fit rounded-full border border-[#a51d49]/35 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#a51d49] lg:hidden"
            >
              Filters
            </button>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#7f6758]">
              <span>
                <strong className="font-semibold text-[#1f1712]">{filteredProducts.length}</strong> products found
              </span>
              {querySearch && <span>Search: {querySearch}</span>}
            </div>

            <label className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[#1f1712]">
              Sort By
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="h-12 min-w-56 rounded-md border border-[#d4c4b0] bg-white px-5 text-sm font-medium normal-case tracking-normal text-[#1f1712] focus:border-[#a51d49] focus:outline-none"
              >
                <option value="newest">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Popular</option>
              </select>
            </label>
          </div>

          <div className="grid gap-12 lg:grid-cols-[320px_minmax(0,1fr)] xl:gap-16">
            <aside className={`${showFilters ? "block" : "hidden lg:block"} lg:sticky lg:top-44 lg:self-start`}>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.28em] text-[#1f1712]">Filter By</h2>
                <button onClick={resetFilters} className="text-sm font-medium text-[#8a7062] hover:text-[#a51d49]">
                  Reset
                </button>
              </div>

              <div className="border-t border-[#eadfd6]">
                <FilterGroup title="Category">
                  {categories.map((category) => (
                    <label key={category} className="flex cursor-pointer items-center gap-3 py-2.5 text-sm text-[#6f5948]">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 accent-[#a51d49]"
                      />
                      {category}
                    </label>
                  ))}
                </FilterGroup>

                <FilterGroup title="Price Range">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex cursor-pointer items-center gap-3 py-2.5 text-sm text-[#6f5948]">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange.min === range.min && selectedPriceRange.max === range.max}
                        onChange={() => setSelectedPriceRange({ min: range.min, max: range.max })}
                        className="h-4 w-4 accent-[#a51d49]"
                      />
                      {range.label}
                    </label>
                  ))}
                </FilterGroup>

                <FilterGroup title="Fabric">
                  <label className="flex cursor-pointer items-center gap-3 py-2.5 text-sm text-[#6f5948]">
                    <input
                      type="radio"
                      name="fabric"
                      checked={selectedFabric === null}
                      onChange={() => setSelectedFabric(null)}
                      className="h-4 w-4 accent-[#a51d49]"
                    />
                    All Fabrics
                  </label>
                  {fabricTypes.map((fabric) => (
                    <label key={fabric} className="flex cursor-pointer items-center gap-3 py-2.5 text-sm text-[#6f5948]">
                      <input
                        type="radio"
                        name="fabric"
                        checked={selectedFabric === fabric}
                        onChange={() => setSelectedFabric(fabric)}
                        className="h-4 w-4 accent-[#a51d49]"
                      />
                      {fabric}
                    </label>
                  ))}
                </FilterGroup>
              </div>
            </aside>

            <div className="min-w-0">
              {filteredProducts.length > 0 ? (
                <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1rem] border border-[#eadfd6] bg-[#fffaf5] px-8 py-16 text-center">
                  <p className="text-lg text-[#6f5948]">No products found for this selection.</p>
                  <button onClick={resetFilters} className="mt-5 text-sm font-semibold text-[#a51d49] underline">
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="border-t border-[#eadfd6] bg-[#fffaf5]">
          <div className="luxury-container grid gap-4 py-10 text-center text-sm text-[#6f5948] md:grid-cols-3">
            <p>Secure online payments only</p>
            <p>No Cash on Delivery (COD)</p>
            <p>All sales are final. No return or exchange.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-[#eadfd6] py-7">
      <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#8a3d08]">{title}</h3>
      <div className="grid gap-1">{children}</div>
    </div>
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
      querySearch={searchParams.get("search")}
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

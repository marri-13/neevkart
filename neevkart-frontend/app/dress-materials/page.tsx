"use client";

import { Suspense, useMemo, useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Footer from "../components/home/Footer";
import Navbar from "../components/navbar/Navbar";
import ProductCard from "../components/product/ProductCard";
import { products, type Product } from "@/lib/products";
import axios from "axios";
import { API_URL } from "@/lib/userAuth";

type SortOption = "recommended" | "price-low" | "price-high";

const materialTypes = ["All", "Georgette Blend", "Cotton Blend", "Silk Blend", "Organza Blend", "Chiffon Blend", "Rayon Blend"];
const occasionTypes = ["All", "Festive", "Daily Wear", "Party Wear", "Wedding", "Casual"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under Rs. 2,000", min: 0, max: 2000 },
  { label: "Rs. 2,000 - Rs. 3,500", min: 2000, max: 3500 },
  { label: "Above Rs. 3,500", min: 3500, max: Infinity },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function materialFromQuery(value: string | null) {
  if (!value) {
    return "All";
  }

  return materialTypes.find((material) => normalize(material).includes(normalize(value))) ?? "All";
}

function occasionFromQuery(value: string | null) {
  if (!value) {
    return "All";
  }

  return occasionTypes.find((occasion) => normalize(occasion).includes(normalize(value))) ?? "All";
}

function DressMaterialsContent() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Product[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState(materialFromQuery(searchParams.get("material")));
  const [selectedOccasion, setSelectedOccasion] = useState(occasionFromQuery(searchParams.get("occasion")));
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSelectedMaterial(materialFromQuery(searchParams.get("material")));
    setSelectedOccasion(occasionFromQuery(searchParams.get("occasion")));
  }, [searchParams]);

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
        console.warn("Failed to load dress materials from backend. Using static fallback.", err);
        setItems(products);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = items.filter((product) => product.category === "Dress Materials");

    if (selectedMaterial !== "All") {
      result = result.filter((product) => normalize(product.fabric) === normalize(selectedMaterial));
    }

    if (selectedOccasion !== "All") {
      result = result.filter((product) => normalize(product.occasion) === normalize(selectedOccasion));
    }

    result = result.filter((product) => product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max);

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedMaterial, selectedOccasion, selectedPriceRange, sortBy]);

  const resetFilters = () => {
    setSelectedMaterial("All");
    setSelectedOccasion("All");
    setSelectedPriceRange(priceRanges[0]);
    setSortBy("recommended");
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
              <span className="text-[#1f1712]">Dress Materials</span>
            </div>
          </div>
        </div>

        <section className="luxury-container py-10 md:py-14">
          <div className="mb-9 flex flex-col gap-5 border-b border-[#eadfd6] pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#a51d49]">
                NeevKart Catalogue
              </p>
              <h1 className="text-3xl font-semibold text-[#1f1712] md:text-4xl">
                Dress Materials
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7f6758]">
                Unstitched suit materials with kurta fabric, matching bottom, and dupatta sets.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters((current) => !current)}
                className="rounded-md border border-[#a51d49]/35 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#a51d49] lg:hidden"
              >
                Filters
              </button>
              <p className="text-sm text-[#7f6758]">
                <span className="font-semibold text-[#1f1712]">{filteredProducts.length}</span> products found
              </p>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="h-11 rounded-md border border-[#d4c4b0] bg-white px-4 text-sm text-[#1f1712] focus:border-[#a51d49] focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid gap-11 lg:grid-cols-[300px_minmax(0,1fr)] xl:gap-14">
            <aside className={`${showFilters ? "block" : "hidden lg:block"} lg:sticky lg:top-44 lg:self-start`}>
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.26em] text-[#1f1712]">Filter By</h2>
                <button onClick={resetFilters} className="text-sm text-[#8a7062] hover:text-[#a51d49]">
                  Reset
                </button>
              </div>

              <div className="border-t border-[#eadfd6]">
                <FilterGroup title="Material">
                  {materialTypes.map((material) => (
                    <RadioFilter
                      key={material}
                      name="material"
                      label={material}
                      checked={selectedMaterial === material}
                      onChange={() => setSelectedMaterial(material)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Occasion">
                  {occasionTypes.map((occasion) => (
                    <RadioFilter
                      key={occasion}
                      name="occasion"
                      label={occasion}
                      checked={selectedOccasion === occasion}
                      onChange={() => setSelectedOccasion(occasion)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Price Range">
                  {priceRanges.map((range) => (
                    <RadioFilter
                      key={range.label}
                      name="price"
                      label={range.label}
                      checked={selectedPriceRange.label === range.label}
                      onChange={() => setSelectedPriceRange(range)}
                    />
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
                <div className="border border-[#eadfd6] bg-[#fffaf5] px-8 py-14 text-center">
                  <p className="text-sm text-[#6f5948]">No dress materials found for this selection.</p>
                  <button onClick={resetFilters} className="mt-4 text-sm font-semibold text-[#a51d49] underline">
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-[#eadfd6] py-6">
      <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8a3d08]">{title}</h3>
      <div className="grid gap-1">{children}</div>
    </div>
  );
}

function RadioFilter({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2 text-sm text-[#6f5948]">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-[#a51d49]" />
      {label}
    </label>
  );
}

export default function DressMaterialsPage() {
  return (
    <Suspense fallback={null}>
      <DressMaterialsContent />
    </Suspense>
  );
}

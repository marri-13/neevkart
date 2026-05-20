import Image from "next/image";
import Link from "next/link";
import ProductCard from "../product/ProductCard";
import { products } from "@/lib/products";

export default function FeaturedProducts() {
  const featured = products
    .filter((product) => product.category !== "Dress Materials")
    .slice(0, 8);

  return (
    <section
      id="featured"
      className="bg-[#fffaf5] pb-36 pt-28 md:pb-44 md:pt-36"
    >
      <div className="luxury-container">

        {/* HEADER */}
        <div className="mx-auto mb-24 max-w-2xl text-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a51d49]">
            Signature Edit
          </p>

          <h2 className="font-display text-1xl font-medium text-[#1f1712] md:text-[2.25rem]">
            Customer Favourites
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#7f6758]">
            A polished selection of premium drapes chosen for weddings,
            celebrations, and graceful everyday styling.
          </p>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* EXPLORE BUTTON */}
        <div className="mt-24 text-center">
          <Link
            href="/sarees"
            className="inline-flex items-center justify-center rounded-full border border-[#a51d49] bg-[#a51d49] px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_35px_rgba(165,29,73,0.18)] transition hover:-translate-y-0.5 hover:bg-[#8b1840]"
          >
            Explore Saree Collections
          </Link>
        </div>

        {/* POLICY BANNER */}
        <div className="mt-40 grid gap-6 rounded-[1.3rem] border border-[#eadfd6] bg-white px-8 py-9 text-center text-sm text-[#6f5948] shadow-[0_16px_40px_rgba(43,33,27,0.05)] md:grid-cols-3">
          <p>Secure online payments through Razorpay.</p>
          <p>COD is not available on NeevKart.</p>
          <p>All sales are final. No return or exchange available.</p>
        </div>

      </div>
    </section>
  );
}
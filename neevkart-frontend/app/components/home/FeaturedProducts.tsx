import Image from "next/image";
import Link from "next/link";
import ProductCard from "../product/ProductCard";
import { products } from "@/lib/products";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section id="featured" className="bg-[#fffaf5] pb-28 pt-10 md:pb-36 md:pt-16">
      <div className="luxury-container">

        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a51d49]">
            Signature Edit
          </p>
          <h2 className="font-display text-3xl font-medium text-[#1f1712] md:text-[2.65rem]">
            Customer Favourites
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#7f6758]">
            A polished selection of premium drapes chosen for weddings, celebrations, and graceful everyday styling.
          </p>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* EXPLORE BUTTON */}
        <div className="mt-16 text-center">
          <Link
            href="/sarees"
            className="inline-flex items-center justify-center rounded-full border border-[#a51d49] bg-[#a51d49] px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_35px_rgba(165,29,73,0.18)] transition hover:-translate-y-0.5 hover:bg-[#8b1840]"
          >
            Explore Saree Collections
          </Link>
        </div>

        {/* SHOP THE LOOK */}
        <div className="mt-36 rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(43,33,27,0.08)] ring-1 ring-[#efe3d8] md:p-10">

          <div className="mb-10 text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a51d49]">
              Styled Stories
            </p>
            <h2 className="font-display text-3xl font-medium text-[#1f1712] md:text-[2.1rem]">
              Shop The Look
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-4 md:gap-7">
            {featured.map((product) => (
              <Link
                key={`look-${product.id}`}
                href={`/product/${product.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-[1.3rem] bg-[#f4e8de] shadow-[0_15px_35px_rgba(43,33,27,0.10)]"
              >
                <Image
                  src={product.image}
                  alt={`${product.name} look`}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1712]/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>

        </div>

        {/* POLICY BANNER */}
        <div className="mt-32 grid gap-5 rounded-[1.5rem] border border-[#eadfd6] bg-white px-6 py-7 text-center text-sm text-[#6f5948] shadow-[0_16px_40px_rgba(43,33,27,0.05)] md:grid-cols-3">
          <p>Secure online payments through Razorpay.</p>
          <p>COD is not available on NeevKart.</p>
          <p>All sales are final. No return or exchange available.</p>
        </div>

      </div>
    </section>
  );
}
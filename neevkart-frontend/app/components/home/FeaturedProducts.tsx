import Link from "next/link";
import ProductCard from "../product/ProductCard";
import { products } from "@/lib/products";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section id="featured" className="bg-white pb-24 md:pb-32">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-medium text-[#1f1712] md:text-[2rem]">Customer Favourites</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-16 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/sarees"
            className="inline-flex items-center justify-center rounded-full bg-[#a51d49] px-12 py-4 text-base font-semibold text-white transition hover:bg-[#8b1840]"
          >
            View All Collections
          </Link>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl font-medium text-[#1f1712] md:text-[2rem]">Shop The Look</h2>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
            {featured.map((product) => (
              <Link key={`look-${product.id}`} href={`/product/${product.slug}`} className="group relative aspect-[4/5] overflow-hidden rounded-md bg-[#f4e8de]">
                <img
                  src={product.image}
                  alt={`${product.name} look`}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-5 border-y border-[#eadfd6] py-8 text-center text-sm text-[#6f5948] md:grid-cols-3">
          <p>Secure online payments through Razorpay.</p>
          <p>COD is not available on NeevKart.</p>
          <p>All sales are final. No return or exchange available.</p>
        </div>
      </div>
    </section>
  );
}

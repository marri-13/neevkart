import Link from "next/link";
import Image from "next/image";
import { products, getProductBySlug, formatPrice } from "@/lib/products";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/home/Footer";
import ProductDetailsClient from "@/app/components/product/ProductDetails";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-[#eadfd6]">
          <div className="luxury-container py-4">
            <div className="flex items-center gap-2 text-sm text-[#8a7062]">
              <Link href="/" className="hover:text-[#1f1712]">
                Home
              </Link>
              <span>/</span>
              <Link href="/sarees" className="hover:text-[#1f1712]">
                Sarees
              </Link>
              <span>/</span>
              <span className="text-[#1f1712]">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="luxury-container py-12">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
            <ProductDetailsClient product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#eadfd6]">
            <div className="luxury-container py-16">
              <h2 className="mb-12 text-2xl font-medium text-[#1f1712]">More from {product.category}</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`} className="group">
                    <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-[#f4e8de]">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover object-top transition duration-700 group-hover:scale-[1.025]"
                      />
                      {relatedProduct.tag && (
                        <span className="absolute left-3 top-3 rounded-full bg-white/94 px-3 py-1.5 text-xs font-semibold text-[#a51d49]">
                          {relatedProduct.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8a7062]">
                      {relatedProduct.fabric}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-sm text-[#2f2722]">{relatedProduct.name}</h3>
                    <p className="mt-2 font-semibold text-[#1f1712]">{formatPrice(relatedProduct.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

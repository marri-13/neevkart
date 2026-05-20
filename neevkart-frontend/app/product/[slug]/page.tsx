import Link from "next/link";
import { products, getProductBySlug } from "@/lib/products";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/home/Footer";
import ProductCard from "@/app/components/product/ProductCard";
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
  const parentHref = product.category === "Dress Materials" ? "/dress-materials" : "/sarees";
  const parentLabel = product.category === "Dress Materials" ? "Dress Materials" : "Sarees";

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
              <Link href={parentHref} className="hover:text-[#1f1712]">
                {parentLabel}
              </Link>
              <span>/</span>
              <span className="text-[#1f1712]">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="luxury-container py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-[0.96fr_1.04fr] lg:gap-14">
            <ProductDetailsClient product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#eadfd6] bg-white">
            <div className="luxury-container py-16 md:py-24">
              <div className="mb-12 text-center">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#a51d49]">
                  More From This Edit
                </p>
                <h2 className="font-display text-3xl font-medium text-[#1f1712] md:text-5xl">
                  {product.category}
                </h2>
              </div>
              <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
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

import Link from "next/link";
import { products, getProductBySlug, type Product } from "@/lib/products";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/home/Footer";
import ProductCard from "@/app/components/product/ProductCard";
import ProductDetailsClient from "@/app/components/product/ProductDetails";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let product: Product | null = null;
  let allProducts: Product[] = [];

  // Try to fetch from backend
  try {
    const [detailRes, allRes] = await Promise.all([
      fetch(`${API_URL}/api/products/${slug}`, { next: { revalidate: 60 } }).then(res => res.json()),
      fetch(`${API_URL}/api/products`, { next: { revalidate: 60 } }).then(res => res.json())
    ]);

    if (detailRes.success && detailRes.product) {
      product = {
        ...detailRes.product,
        id: detailRes.product.id || detailRes.product._id
      };
    }
    
    if (allRes.success && allRes.products) {
      allProducts = allRes.products.map((p: any) => ({
        ...p,
        id: p.id || p._id
      }));
    }
  } catch (err) {
    console.warn("Failed to fetch product details from backend. Using static fallback.", err);
  }

  // Fallback to local data if backend fetch didn't yield anything
  if (!product) {
    product = getProductBySlug(slug) || null;
  }
  if (allProducts.length === 0) {
    allProducts = products;
  }

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
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

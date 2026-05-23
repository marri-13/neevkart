"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetailsClient({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const soldOut = product.stock === 0;

  const handleAddToCart = () => {
    if (soldOut) {
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/register?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    addItem(product, quantity);
    setAddedToCart(true);
    window.setTimeout(() => router.push("/cart"), 700);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <>
      <div className="min-w-0">
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#f4e8de]">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover object-top"
            priority
          />
          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <span className="rounded bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#a51d49]">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {product.images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded border bg-[#f4e8de] ${
                selectedImage === index ? "border-[#a51d49]" : "border-[#e5d6ca]"
              }`}
              aria-label={`Show product image ${index + 1}`}
            >
              <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover object-top" />
            </button>
          ))}
        </div>
      </div>

      <section className="min-w-0 bg-white text-[#2b211b]">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a7062]">
          <span>{product.category}</span>
          {product.tag && <span className="text-[#a51d49]">{product.tag}</span>}
        </div>

        <h1 className="mt-4 max-w-2xl text-2xl font-medium leading-snug text-[#1f1712] md:text-3xl">
          {product.name}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f5948]">{product.description}</p>

        <div className="mt-6 border-y border-[#eadfd6] py-5">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold text-[#1f1712]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#9b897d] line-through">{formatPrice(product.originalPrice)}</span>
            )}
            {product.originalPrice && (
              <span className="text-sm font-semibold text-[#a51d49]">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-[#8a7062]">Inclusive of all taxes</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {!soldOut && (
            <label className="flex h-12 items-center gap-3 px-4 text-sm text-[#2b211b] focus-within:outline-none focus-within:ring-0">
              Qty
              <select value={quantity} onChange={handleQuantityChange} className="h-full w-full rounded-md border border-[#d9c6b5] bg-transparent px-2 font-medium outline-none focus:outline-none focus:ring-0">
                {Array.from({ length: Math.min(product.stock, 10) }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label>
          )}

          <button
            onClick={handleAddToCart}
            disabled={soldOut}
            className={`h-12 flex-1 rounded-md px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition ${
              soldOut
                ? "cursor-not-allowed bg-[#c8b7a8]"
                : addedToCart
                  ? "bg-[#2d9d4e]"
                  : "bg-[#a51d49] hover:bg-[#8b1840]"
            }`}
          >
            {soldOut ? "Sold Out" : addedToCart ? "Added to Bag" : "Add to Bag"}
          </button>
        </div>

        <div className="mt-7 border-t border-[#eadfd6] pt-6">
          <h2 className="text-base font-semibold text-[#1f1712]">Product Details</h2>
          <div className="mt-4 divide-y divide-[#f0e3d9] text-sm">
            <DetailRow label="Fabric" value={product.fabric} />
            <DetailRow label="Occasion" value={product.occasion} />
            <DetailRow label="Color" value={product.color} />
            <DetailRow label="Stock" value={soldOut ? "Out of stock" : `${product.stock} available`} />
          </div>

          <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#6f5948]">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="mt-7 border-t border-[#eadfd6] pt-5 text-sm leading-7 text-[#6f5948]">
          <p>Secure Razorpay checkout only. COD is not available.</p>
          <p className="font-semibold text-[#a51d49]">All sales are final. No return or exchange available.</p>
        </div>
      </section>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-3">
      <span className="text-[#8a7062]">{label}</span>
      <span className="font-medium text-[#2b211b]">{value}</span>
    </div>
  );
}
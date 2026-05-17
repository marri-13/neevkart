"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => {
      router.push("/cart");
    }, 1000);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <>
      {/* Image Gallery */}
      <div>
        {/* Main Image */}
        <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-lg bg-[#f4e8de]">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover object-top"
            priority
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-2xl font-semibold text-white">Sold Out</span>
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-3">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative h-20 w-20 overflow-hidden rounded-md border-2 transition ${
                selectedImage === idx
                  ? "border-[#a51d49]"
                  : "border-[#eadfd6] hover:border-[#d4c4b0]"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} view ${idx + 1}`}
                fill
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div>
        {/* Category & Tag */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a7062]">
            {product.category}
          </span>
          {product.tag && (
            <span className="inline-block rounded-full bg-[#fff1f5] px-3 py-1 text-xs font-semibold text-[#a51d49]">
              {product.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-medium text-[#1f1712] md:text-4xl">
          {product.name}
        </h1>

        {/* Fabric */}
        <p className="mb-6 text-sm text-[#8a7062]">Fabric: {product.fabric}</p>

        {/* Price */}
        <div className="mb-8 border-y border-[#eadfd6] py-6">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-[#1f1712]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-[#9b897d] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <p className="mt-2 text-sm text-[#a51d49] font-medium">
              Save {formatPrice(product.originalPrice - product.price)}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="mb-8 text-[#6f5948] leading-relaxed">{product.description}</p>

        {/* Details */}
        <div className="mb-8">
          <h3 className="mb-4 font-medium text-[#1f1712]">Product Details</h3>
          <ul className="space-y-2">
            {product.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-[#6f5948]">
                <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#a51d49]" />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Stock Status */}
        <div className="mb-8">
          {product.stock === 0 ? (
            <p className="text-lg font-semibold text-[#a51d49]">Out of Stock</p>
          ) : (
            <p className="text-sm text-[#6f5948]">
              Only <span className="font-semibold text-[#1f1712]">{product.stock} left</span> in stock
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <div className="mb-8 flex gap-4">
          <select
            value={quantity}
            onChange={handleQuantityChange}
            disabled={product.stock === 0}
            className="rounded border border-[#d4c4b0] px-4 py-3 text-[#1f1712] focus:border-[#a51d49] focus:outline-none disabled:opacity-50"
          >
            {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Qty: {i + 1}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 rounded px-6 py-3 font-medium text-white transition ${
              product.stock === 0
                ? "cursor-not-allowed bg-[#d4c4b0]"
                : addedToCart
                  ? "bg-[#2d9d4e]"
                  : "bg-[#a51d49] hover:bg-[#8a1c39]"
            }`}
          >
            {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>

        {/* Policies */}
        <div className="space-y-3 border-t border-[#eadfd6] pt-6 text-sm text-[#6f5948]">
          <p>✓ Secure online payments through Razorpay</p>
          <p>✓ No Cash on Delivery (COD) available</p>
          <p className="font-medium text-[#a51d49]">✗ All sales are final. No return or exchange available.</p>
        </div>
      </div>
    </>
  );
}

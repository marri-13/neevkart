"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  const handleProceedToCheckout = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/register?redirect=%2Fcheckout");
      return;
    }
    router.push("/checkout");
  };

  if (items.length === 0) {
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
                <span className="text-[#1f1712]">Cart</span>
              </div>
            </div>
          </div>

          {/* Empty Cart */}
          <div className="luxury-container flex flex-col items-center justify-center py-24">
            <div className="text-center">
              <div className="mb-6 text-6xl">🛍️</div>
              <h1 className="mb-2 text-3xl font-medium text-[#1f1712]">Your cart is empty</h1>
              <p className="mb-8 text-[#8a7062]">Add some beautiful sarees to get started!</p>
              <Link
                href="/sarees"
                className="inline-block rounded bg-[#a51d49] px-8 py-3 font-medium text-white hover:bg-[#8a1c39]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
              <span className="text-[#1f1712]">Shopping Cart</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-[#eadfd6]">
          <div className="luxury-container py-8">
            <h1 className="text-3xl font-medium text-[#1f1712] md:text-4xl">Shopping Cart</h1>
            <p className="mt-2 text-[#8a7062]">
              {items.length} {items.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="luxury-container py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6 border-b border-[#eadfd6] pb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 border-b border-[#eadfd6] pb-6 last:border-0">
                    {/* Product Image */}
                    <Link href={`/product/${item.slug}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[#f4e8de]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/product/${item.slug}`} className="mb-2 block">
                        <h3 className="font-medium text-[#1f1712] hover:text-[#a51d49]">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mb-4 text-sm text-[#8a7062]">{item.fabric}</p>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-[#d4c4b0] text-[#1f1712] hover:bg-[#f4e8de]"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium">{item.cartQuantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-[#d4c4b0] text-[#1f1712] hover:bg-[#f4e8de]"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-[#1f1712]">
                            {formatPrice(item.price * item.cartQuantity)}
                          </p>
                          <p className="text-xs text-[#8a7062]">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="self-start text-[#8a7062] hover:text-[#a51d49]"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link
                  href="/sarees"
                  className="text-[#a51d49] hover:text-[#8a1c39] underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-[#eadfd6] p-6">
                <h2 className="mb-6 text-lg font-medium text-[#1f1712]">Order Summary</h2>

                <div className="space-y-4 border-b border-[#eadfd6] pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7062]">Subtotal</span>
                    <span className="text-[#1f1712]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7062]">Shipping</span>
                    <span className="text-[#2d9d4e]">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7062]">Tax</span>
                    <span className="text-[#1f1712]">{formatPrice(totalPrice * 0.18)}</span>
                  </div>
                </div>

                <div className="my-6 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-[#a51d49]">{formatPrice(totalPrice + totalPrice * 0.18)}</span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="mb-3 w-full rounded bg-[#a51d49] py-3 font-medium text-white hover:bg-[#8a1c39]"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => clearCart()}
                  className="w-full rounded border border-[#d4c4b0] py-3 font-medium text-[#1f1712] hover:bg-[#f4e8de]"
                >
                  Clear Cart
                </button>

                {/* Policies */}
                <div className="mt-6 space-y-2 border-t border-[#eadfd6] pt-6 text-xs text-[#6f5948]">
                  <p>✓ Secure online payments</p>
                  <p>✓ No Cash on Delivery</p>
                  <p className="font-medium text-[#a51d49]">✗ All sales final</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

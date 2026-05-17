"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  customer_notify: number;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  handler: (response: RazorpayPaymentResponse) => Promise<void>;
  modal: {
    ondismiss: () => void;
  };
};

type RazorpayConstructor = new (options: RazorpayOptions) => {
  open: () => void;
};

type WindowWithRazorpay = Window & {
  Razorpay: RazorpayConstructor;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.18;
  const finalPrice = totalPrice + tax;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white">
          <div className="luxury-container flex flex-col items-center justify-center py-24">
            <h1 className="mb-4 text-2xl font-medium text-[#1f1712]">Your cart is empty</h1>
            <Link href="/sarees" className="text-[#a51d49] hover:underline">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const options: RazorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag",
          amount: Math.round(finalPrice * 100),
          currency: "INR",
          name: "NeevKart",
          description: "Purchase Sarees",
          customer_notify: 1,
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          handler: async (response) => {
            console.log("Payment successful:", response);
            clearCart();
            router.push(`/order-confirmation?payment_id=${response.razorpay_payment_id}`);
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
              console.log("Payment modal closed");
            },
          },
        };

        const rzp = new (window as unknown as WindowWithRazorpay).Razorpay(options);
        rzp.open();
        setLoading(false);
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

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
              <Link href="/cart" className="hover:text-[#1f1712]">
                Cart
              </Link>
              <span>/</span>
              <span className="text-[#1f1712]">Checkout</span>
            </div>
          </div>
        </div>

        <div className="luxury-container py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <h1 className="mb-8 text-2xl font-medium text-[#1f1712]">Delivery Address</h1>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1f1712] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full rounded border px-4 py-2.5 text-[#1f1712] placeholder:text-[#9a7c67] focus:outline-none ${
                      errors.fullName ? "border-[#d32f2f] focus:border-[#d32f2f]" : "border-[#d4c4b0] focus:border-[#a51d49]"
                    }`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-[#d32f2f]">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#1f1712] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full rounded border px-4 py-2.5 text-[#1f1712] placeholder:text-[#9a7c67] focus:outline-none ${
                      errors.email ? "border-[#d32f2f] focus:border-[#d32f2f]" : "border-[#d4c4b0] focus:border-[#a51d49]"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-[#d32f2f]">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#1f1712] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full rounded border px-4 py-2.5 text-[#1f1712] placeholder:text-[#9a7c67] focus:outline-none ${
                      errors.phone ? "border-[#d32f2f] focus:border-[#d32f2f]" : "border-[#d4c4b0] focus:border-[#a51d49]"
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-[#d32f2f]">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-[#1f1712] mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Apartment 4B"
                    className={`w-full rounded border px-4 py-2.5 text-[#1f1712] placeholder:text-[#9a7c67] focus:outline-none ${
                      errors.address ? "border-[#d32f2f] focus:border-[#d32f2f]" : "border-[#d4c4b0] focus:border-[#a51d49]"
                    }`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-[#d32f2f]">{errors.address}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[#1f1712] mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className={`w-full rounded border px-4 py-2.5 text-[#1f1712] placeholder:text-[#9a7c67] focus:outline-none ${
                      errors.city ? "border-[#d32f2f] focus:border-[#d32f2f]" : "border-[#d4c4b0] focus:border-[#a51d49]"
                    }`}
                  />
                  {errors.city && <p className="mt-1 text-xs text-[#d32f2f]">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-[#1f1712] mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="NY"
                    className={`w-full rounded border px-4 py-2.5 text-[#1f1712] placeholder:text-[#9a7c67] focus:outline-none ${
                      errors.state ? "border-[#d32f2f] focus:border-[#d32f2f]" : "border-[#d4c4b0] focus:border-[#a51d49]"
                    }`}
                  />
                  {errors.state && <p className="mt-1 text-xs text-[#d32f2f]">{errors.state}</p>}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-[#1f1712] mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="123456"
                    maxLength={6}
                    className={`w-full rounded border px-4 py-2.5 text-[#1f1712] placeholder:text-[#9a7c67] focus:outline-none ${
                      errors.pincode ? "border-[#d32f2f] focus:border-[#d32f2f]" : "border-[#d4c4b0] focus:border-[#a51d49]"
                    }`}
                  />
                  {errors.pincode && <p className="mt-1 text-xs text-[#d32f2f]">{errors.pincode}</p>}
                </div>

                {/* Policies */}
                <div className="rounded bg-[#fff1f5] p-4 text-sm text-[#a51d49]">
                  <p className="font-medium">✗ All sales are final. No return or exchange available.</p>
                  <p className="mt-2 text-[#8a7062]">By placing this order, you agree to our return policy.</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded bg-[#a51d49] py-3 font-medium text-white hover:bg-[#8a1c39] disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-[#eadfd6] p-6 sticky top-20">
                <h2 className="mb-6 text-lg font-medium text-[#1f1712]">Order Summary</h2>

                {/* Items */}
                <div className="mb-6 space-y-4 border-b border-[#eadfd6] pb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-[#f4e8de]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-[#1f1712] line-clamp-2">{item.name}</p>
                        <p className="mt-1 text-[#8a7062]">Qty: {item.cartQuantity}</p>
                        <p className="mt-1 font-medium text-[#1f1712]">
                          {formatPrice(item.price * item.cartQuantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7062]">Subtotal</span>
                    <span className="text-[#1f1712]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7062]">Shipping</span>
                    <span className="text-[#2d9d4e]">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7062]">Tax (18%)</span>
                    <span className="text-[#1f1712]">{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="my-4 border-t border-[#eadfd6]" />

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total</span>
                  <span className="text-[#a51d49]">{formatPrice(finalPrice)}</span>
                </div>

                {/* Info */}
                <div className="text-xs text-[#8a7062] space-y-2">
                  <p>✓ Secure payment via Razorpay</p>
                  <p>✓ Free shipping on all orders</p>
                  <p>✓ 100% authentic products</p>
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

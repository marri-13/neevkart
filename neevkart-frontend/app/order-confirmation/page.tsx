"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

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
              <span className="text-[#1f1712]">Order Confirmation</span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="luxury-container flex flex-col items-center justify-center py-24">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mb-6 text-6xl">✓</div>

            {/* Message */}
            <h1 className="mb-3 text-3xl font-medium text-[#1f1712]">Order Confirmed!</h1>
            <p className="mb-4 text-lg text-[#8a7062]">Thank you for your purchase</p>

            {/* Payment ID */}
            {paymentId && (
              <div className="mb-8 rounded-lg bg-[#f9f6f2] p-4">
                <p className="text-sm text-[#8a7062] mb-1">Payment ID</p>
                <p className="font-mono text-[#1f1712] font-medium break-all">{paymentId}</p>
              </div>
            )}

            {/* Details */}
            <div className="mb-8 space-y-2 text-[#8a7062]">
              <p>✓ Order confirmation sent to your email</p>
              <p>✓ Your order is being prepared</p>
              <p>✓ Tracking details will be sent soon</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/orders"
                className="rounded bg-[#a51d49] px-8 py-3 font-medium text-white hover:bg-[#8a1c39]"
              >
                View Orders
              </Link>
              <Link
                href="/sarees"
                className="rounded border border-[#d4c4b0] px-8 py-3 font-medium text-[#1f1712] hover:bg-[#f4e8de]"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Policy Notice */}
            <div className="mt-12 border-t border-[#eadfd6] pt-8 text-sm text-[#8a7062]">
              <p className="font-medium text-[#a51d49] mb-3">
                ✗ All sales are final. No return or exchange available.
              </p>
              <p>If you have any questions about your order, please contact our support team.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

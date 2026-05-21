"use client";

import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f9] to-white py-8 px-4">
      {/* Header with Back Button */}
      <div className="mx-auto max-w-6xl mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8f5c70] hover:text-[#a51d49] transition font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Account Content */}
      <div className="mx-auto max-w-6xl">
        <UserProfile routing="hash" />
      </div>
    </div>
  );
}

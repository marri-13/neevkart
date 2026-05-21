"use client";

import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f9] to-white py-8 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg border border-[#f0e2d8] bg-white shadow-[0_8px_32px_rgba(43,33,27,0.08)] overflow-hidden">
          <UserProfile routing="hash" />
        </div>
      </div>
    </div>
  );
}

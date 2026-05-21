"use client";

import { useCart } from "@/lib/cart";

export default function CartCount() {
  const { getTotalItems } = useCart();
  const count = getTotalItems();

  return (
    <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#c44778] text-[10px] font-semibold text-white">
      {count}
    </span>
  );
}
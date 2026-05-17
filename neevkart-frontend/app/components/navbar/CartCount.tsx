"use client";

import { useCart } from "@/lib/cart";

export default function CartCount() {
  const { getTotalItems } = useCart();
  const count = getTotalItems();

  return (
    <span className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-full bg-[#a51d49] text-[9px] font-semibold text-white">
      {count}
    </span>
  );
}

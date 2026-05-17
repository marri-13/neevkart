import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const soldOut = product.stock === 0;
  const stickerLabel = soldOut ? "Sold Out" : product.tag;

  return (
    <article className="group rounded-[1.6rem] bg-white p-3 shadow-[0_18px_45px_rgba(43,33,27,0.08)] ring-1 ring-[#efe3d8] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(43,33,27,0.14)]">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-[#f4e8de]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1712]/26 via-transparent to-transparent opacity-75" />

          {stickerLabel && (
            <span
              className={`absolute left-4 top-4 inline-flex rotate-[-4deg] items-center gap-1.5 rounded-[0.8rem] border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] shadow-[0_12px_28px_rgba(31,23,18,0.20)] backdrop-blur-sm ${
                soldOut
                  ? "border-[#2a211b] bg-[#241b16]/92 text-white"
                  : "border-[#f3d89f] bg-[#fff7df]/96 text-[#9b173f]"
              }`}
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-current/10 text-[9px]">✦</span>
              {stickerLabel}
            </span>
          )}
        </div>

        <div className="px-2 pb-2 pt-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a51d49]">{product.fabric}</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#9b897d]">{product.occasion}</p>
          </div>
          <h3 className="min-h-12 font-display text-[1.05rem] leading-6 text-[#241c18] transition group-hover:text-[#a51d49]">
            {product.name}
          </h3>
          <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#f1e7dd] pt-4">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-[#1f1712]">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="text-xs text-[#9b897d] line-through">{formatPrice(product.originalPrice)}</p>
              )}
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a51d49]">View</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

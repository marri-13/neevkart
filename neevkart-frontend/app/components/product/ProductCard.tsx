import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const soldOut = product.stock === 0;

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#f4e8de]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.025]"
          />

          {product.tag && (
            <span
              className={`absolute left-3 top-3 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-sm ${
                soldOut ? "bg-[#1f1712]/88 text-white" : "bg-white/94 text-[#a51d49]"
              }`}
            >
              {soldOut ? "Sold Out" : product.tag}
            </span>
          )}
        </div>

        <div className="pt-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8a7062]">{product.fabric}</p>
          <h3 className="mt-2 min-h-10 text-sm leading-5 text-[#2f2722]">{product.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm font-semibold text-[#1f1712]">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-[#9b897d] line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

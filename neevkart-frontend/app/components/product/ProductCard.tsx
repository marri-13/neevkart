import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const soldOut = product.stock === 0;
  const label = soldOut ? "Sold Out" : product.tag;

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[0.9rem] bg-[#f4e8de] shadow-[0_18px_45px_rgba(43,33,27,0.08)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1712]/28 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

          {label && (
            soldOut ? (
              <div className="absolute z-20 flex items-center justify-center rounded-full bg-[#E91E63] text-white font-bold uppercase shadow-md transform rotate-3" style={{ top: '8px', right: '8px', width: '60px', height: '60px', fontSize: '0.75rem' }}>
                SOLD OUT 
                <div className="absolute bottom-0 right-0 rounded-br-full bg-[#C2185B]" style={{ width: '15px', height: '15px', clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}></div>
              </div>
            ) : ( 
              <span className="absolute left-0 top-6 rounded-r-md bg-[#a51d49] px-2.5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_28px_rgba(165,29,73,0.28)] [writing-mode:vertical-rl]">
                {label}
              </span>
            )
          )}

          <span className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full bg-white px-7 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a51d49] shadow-[0_16px_35px_rgba(31,23,18,0.16)] transition duration-300 group-hover:block">
            View Details
          </span>
        </div>

        <div className="pt-5">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a51d49]">{product.fabric}</p>
            <p className="text-[11px] text-[#9b897d]">{product.color}</p>
          </div>

          <h3 className="min-h-[3rem] text-[15px] font-medium leading-6 text-[#2b211b] transition group-hover:text-[#a51d49]">
            {product.name}
          </h3>

          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-base font-semibold text-[#1f1712]">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-[#9b897d] line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
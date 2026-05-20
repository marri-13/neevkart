import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const trends = [
    {
      title: "Summer Pastels",
      subtitle: "Soft colors, light drapes, and warm-weather elegance.",
      image: "/images/hero-heritage.png",
      href: "/sarees?type=summer",
      position: "object-center",
    },
    {
      title: "Wedding Season",
      subtitle: "Occasion sarees with zari, richness, and graceful finish.",
      image: "/images/hero-elegance.png",
      href: "/sarees?category=wedding",
      position: "object-center",
    },
  ];

  return (
    <section id="categories" className="bg-white py-32 md:py-44">
      <div className="luxury-container">

        <div className="mx-auto mb-24 max-w-2xl text-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a51d49]">
            Occasion Edits
          </p>
          <h2 className="font-display text-1xl font-medium text-[#1f1712] md:text-[2.25rem]">
            Shop By Trend
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {trends.map((trend) => (
            <Link
              key={trend.title}
              href={trend.href}
              className="group relative h-[420px] overflow-hidden rounded-[1.4rem] bg-[#f5e8dc] shadow-[0_20px_60px_rgba(43,33,27,0.10)] md:h-[520px]"
            >
              <Image
                src={trend.image}
                alt={trend.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`object-cover ${trend.position} transition duration-700 group-hover:scale-[1.04]`}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#271914]/72 via-[#271914]/28 to-transparent" />

              <div className="absolute inset-0 flex items-center p-8 md:p-12">
                <div className="max-w-[360px]">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f2d893]">
                    NeevKart Edit
                  </p>
                  <h3 className="font-display text-3xl font-medium leading-tight text-white md:text-[2.65rem]">
                    {trend.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/86">
                    {trend.subtitle}
                  </p>
                  <div className="mt-7">
                    <span className="relative inline-block text-xs font-bold uppercase tracking-[0.24em] text-white">
  Shop Now
  <span className="absolute -bottom-1 left-0 h-px w-full bg-white transition-all group-hover:w-0" />
  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#f2d893] transition-all group-hover:w-full" />
</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 flex justify-center gap-2">
          <span className="h-px w-16 bg-[#8c8178]" />
          <span className="h-px w-8 bg-[#d8c8bd]" />
        </div>

      </div>
    </section>
  );
}

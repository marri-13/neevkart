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
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a51d49]">Occasion Edits</p>
          <h2 className="font-display text-3xl font-medium text-[#1f1712] md:text-[2.4rem]">Shop By Trend</h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
    <section id="categories" className="bg-white py-28 md:py-36">
      <div className="luxury-container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a51d49]">Occasion Edits</p>
          <h2 className="font-display text-3xl font-medium text-[#1f1712] md:text-[2.65rem]">Shop By Trend</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2">

          {trends.map((trend) => (
            <Link
              key={trend.title}
              href={trend.href}

              className="group relative h-[390px] overflow-hidden rounded-[2rem] animate-luxury-rise bg-[#f5e8dc] shadow-[0_24px_70px_rgba(43,33,27,0.12)] md:h-[470px]"

              className="group relative h-[390px] overflow-hidden rounded-[2rem] bg-[#f5e8dc] shadow-[0_24px_70px_rgba(43,33,27,0.12)] md:h-[470px]"

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
                  <p className="mt-4 text-sm leading-6 text-white/86">{trend.subtitle}</p>
                  <div className="mt-7">
                    <span className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#a51d49] transition group-hover:bg-[#f2d893] group-hover:text-[#2b211b]">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex justify-center gap-2">
          <span className="h-px w-16 bg-[#8c8178]" />
          <span className="h-px w-8 bg-[#d8c8bd]" />
        </div>
      </div>
    </section>
  );
}

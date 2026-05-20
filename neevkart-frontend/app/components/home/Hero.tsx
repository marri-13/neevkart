"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hero-heritage.png",
    eyebrow: "Exquisite Collections",
    title: "Timeless Elegance in Every Stitch",
    text: "Discover our curated selection of traditional wear, blending classic designs with contemporary grace.",
    cta: "Explore Collection",
  },

  {
    image: "/images/hero-bridal.png",
    eyebrow: "Wedding Couture",
    title: "Luxury Sarees For Weddings",
    text: "Rich festive weaves curated for unforgettable occasions and bridal elegance.",
    cta: "Shop Wedding",
  },

  {
    image: "/images/hero-elegance.png",
    eyebrow: "Cotton Classics",
    title: "Simple Sarees With Charm",
    text: "Soft cotton drapes designed for comfort, grace, and everyday sophistication.",
    cta: "Explore Cotton",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#fffaf5] pt-5 pb-16 md:pb-24">
      <div className="luxury-container">

        <div className="relative overflow-hidden rounded-[2rem] border border-[#eadfd6] bg-[#f8efe7] shadow-[0_15px_45px_rgba(43,33,27,0.06)]">

          {/* HERO HEIGHT */}
          <div className="relative h-[360px] md:h-[520px]">

            {/* SLIDES */}
            {slides.map((slide, index) => (
              <div
                key={slide.image}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === activeSlide
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              >

                {/* IMAGE */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />

                {/* LIGHT SOFT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf5]/78 via-[#fffaf5]/30 to-transparent" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex items-center">

                  <div className="ml-6 max-w-[430px] md:ml-16">

                    {/* EYEBROW */}
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#a51d49]">
                      {slide.eyebrow}
                    </p>

                    {/* TITLE */}
                    <h1 className="font-display text-[2.2rem] leading-[1] text-[#9d1f46] md:text-[4.6rem]">
                      {slide.title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-5 max-w-[390px] text-sm leading-7 text-[#6f5948] md:text-base">
                      {slide.text}
                    </p>

                    {/* BUTTONS */}
                    <div className="mt-8 flex flex-wrap gap-3">

                      <a
                        href="#featured"
                        className="inline-flex items-center justify-center rounded-full border border-[#e2c7b2] bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7c67] transition hover:bg-[#fffaf5]"
                      >
                        {slide.cta}
                      </a>

                      <a
                        href="/sarees"
                        className="inline-flex items-center justify-center rounded-full border border-[#e2c7b2] bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7c67] transition hover:bg-[#fffaf5]"
                      >
                        View Collections
                      </a>

                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* SLIDER DOTS */}
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  aria-label={`Show ${slide.eyebrow}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "w-12 bg-[#a51d49]"
                      : "w-7 bg-[#a51d49]/25"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
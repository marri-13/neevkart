"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hero-heritage.png",
    eyebrow: "New Collection",
    title: "Sarees for graceful celebrations",
    text: "Fresh occasion drapes in soft florals, jewel tones, and timeless craft.",
    cta: "Shop Now",
    position: "object-center",
  },
  {
    image: "/images/hero-bridal.png",
    eyebrow: "Wedding Edit",
    title: "Regal drapes for wedding moments",
    text: "Rich zari, heirloom reds, and ceremonial elegance for special days.",
    cta: "Shop Wedding",
    position: "object-[center_10%]",
  },
  {
    image: "/images/hero-elegance.png",
    eyebrow: "Luxury Silks",
    title: "Quiet elegance in every drape",
    text: "Soft shimmer, delicate borders, and a refined festive finish.",
    cta: "Explore Silks",
    position: "object-center",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const active = slides[activeSlide];

  return (
    <section className="bg-white py-5">
      <div className="luxury-container">
        <div className="relative h-[520px] overflow-hidden rounded-md bg-[#f4e6d8] md:h-[68vh] md:min-h-[610px]">
          {slides.map((slide, index) => (
            <Image
              key={slide.image}
              src={slide.image}
              alt={`${slide.eyebrow} saree collection`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover ${slide.position} transition-opacity duration-700 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#201611]/68 via-[#201611]/32 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="ml-7 max-w-[360px] text-white sm:ml-12 md:ml-20">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f4d995]">
                {active.eyebrow}
              </p>
              <h1 className="font-display text-[2.15rem] font-medium leading-[1.12] md:text-[2.85rem]">
                {active.title}
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/86">{active.text}</p>
              <div className="mt-8">
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold text-[#a51d49] transition hover:bg-[#f4d995] hover:text-[#2b211b]"
                >
                  {active.cta}
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                aria-label={`Show ${slide.eyebrow}`}
                className={`h-0.5 rounded-full transition-all ${
                  index === activeSlide ? "w-16 bg-white" : "w-10 bg-white/45"
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hero-heritage.png",
    eyebrow: "The NeevKart Atelier",
    title: "Sarees crafted for graceful celebrations",
    text: "Premium drapes in refined palettes, elegant borders, and timeless Indian craftsmanship.",
    cta: "Explore Collection",
    position: "object-center",
  },
  {
    image: "/images/hero-bridal.png",
    eyebrow: "Wedding Couture",
    title: "Regal drapes for unforgettable moments",
    text: "Statement silks, heirloom reds, and ceremonial detailing for your grand occasions.",
    cta: "Shop Wedding",
    position: "object-[center_10%]",
  },
  {
    image: "/images/hero-elegance.png",
    eyebrow: "Luxury Silks",
    title: "Quiet elegance in every drape",
    text: "Soft shimmer, delicate borders, and a refined finish designed to feel truly premium.",
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
    <section className="bg-[#fffaf5] pb-20 pt-8 md:pb-28">
      <div className="luxury-container">
        <div className="relative h-[560px] overflow-hidden rounded-[2rem] bg-[#f4e6d8] shadow-[0_28px_80px_rgba(43,33,27,0.16)] ring-1 ring-[#eadfd6] md:h-[72vh] md:min-h-[650px] animate-luxury-rise">
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

          <div className="absolute inset-0 bg-gradient-to-r from-[#160f0b]/78 via-[#160f0b]/38 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="ml-7 max-w-[520px] text-white sm:ml-12 md:ml-20">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#f4d995]">
                {active.eyebrow}
              </p>
              <h1 className="font-display text-[2.35rem] font-medium leading-[1.08] md:text-[3.9rem]">
                {active.title}
              </h1>
              <p className="mt-6 max-w-[430px] text-base leading-8 text-white/86">{active.text}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#featured"
                  className="inline-flex min-w-52 items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#a51d49] shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#f4d995] hover:text-[#2b211b]"
                >
                  {active.cta}
                </a>
                <a
                  href="/sarees?category=wedding"
                  className="inline-flex min-w-48 items-center justify-center rounded-full border border-white/70 bg-white/10 px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/18"
                >
                  Wedding Edit
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
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

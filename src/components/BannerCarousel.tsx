"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Slide = {
  href: string;
  src: string;
  alt: string;
  title?: string;
};

export default function BannerCarousel({ slides }: { slides: Slide[] }) {
  const canLoop = slides.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: canLoop,     // ✅ 得 2 張或以上先 loop
    align: "start",
    skipSnaps: false,
  });

  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!slides.length) return null;

  return (
    <div className="relative">
      {/* viewport */}
      <div ref={emblaRef} className="overflow-hidden rounded-2xl">
        {/* container */}
        <div className="flex">
          {slides.map((s, i) => (
            <a
              key={i}
              href={s.href}
              className="shrink-0 w-full relative"  // ✅ 每張固定 100%
            >
              <img
                src={s.src}
                alt={s.alt}
                className="h-[260px] w-full object-cover block"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {s.title ? (
                <div className="absolute bottom-3 left-3 rounded-xl bg-black/50 px-3 py-2 text-white">
                  {s.title}
                </div>
              ) : null}
            </a>
          ))}
        </div>
      </div>

      {/* buttons：得 1 張就唔顯示 */}
      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 shadow"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 shadow"
            aria-label="Next"
          >
            ›
          </button>

          {/* dots 可要可唔要；你想再簡潔可刪 */}
          <div className="mt-3 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 w-2 rounded-full ${
                  i === selected ? "bg-black" : "bg-black/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
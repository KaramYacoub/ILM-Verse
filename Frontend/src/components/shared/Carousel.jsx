import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const slides = [1, 2, 3, 4, 5]; // Replace with your actual content

  return (
    <div className="relative max-w-screen h-80 overflow-hidden">
      {/* Viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex gap-3 h-full">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] h-full">
              <div className="bg-gray-200 rounded-lg h-full flex items-center justify-center text-4xl font-bold">
                Slide {slide}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inside Controls */}
      <button
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        className="absolute top-1/2 left-5 -translate-y-1/2 btn btn-circle btn-md bg-base-100 shadow-md hover:scale-110 transition-transform"
      >
        ❮
      </button>
      <button
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        className="absolute top-1/2 right-5 -translate-y-1/2 btn btn-circle btn-md bg-base-100 shadow-md hover:scale-110 transition-transform"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;

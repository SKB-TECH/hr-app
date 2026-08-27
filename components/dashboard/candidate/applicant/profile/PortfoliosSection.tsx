


"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface Portfolio {
  id: number;
  title: string;
  image: string;
  accentColor: string;
}

interface PortfoliosSectionProps {
  portfolios?: Portfolio[];
}


const defaultPortfolios: Portfolio[] = [
  {
    id: 1,
    title: "Clinically - clinic & health care website",
    image: "/img_design/Clinically.png",
    accentColor: "#4640DE",
  },
  {
    id: 2,
    title: "Growthly - SaaS Analytics & Sales Website",
    image: "/img_design/growthly.png",
    accentColor: "#A78BFA",
  },
  {
    id: 3,
    title: "Planna - Project Management App",
    image: "/img_design/planna.png",
    accentColor: "#E5E7EB",
  },
  {
    id: 4,
    title: "Funiro - furniture website",
    image: "/img_design/funiro.png",
    accentColor: "#E5E7EB",
  },
];


const MIN_CARDS_FOR_BAR = 4; 

export default function PortfoliosSection({ portfolios = defaultPortfolios }: PortfoliosSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 1) {
      setCanScroll(false);
      setProgress(0);
      return;
    }

    setCanScroll(true);
    setProgress(scrollLeft / maxScroll);
  };

  useEffect(() => {
    updateProgress();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
    
  }, [portfolios]);

  const showBar = portfolios.length >= MIN_CARDS_FOR_BAR;
  const THUMB_WIDTH_PERCENT = 30;
  const trackAvailable = 100 - THUMB_WIDTH_PERCENT;
  const thumbLeft = progress * trackAvailable;

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-bold text-[#202430]">Portfolios</h2>
        <button className="cursor-pointer border border-gray-200 p-1.5  ">
          <PlusIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide"
      >
        {portfolios.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-[200px] sm:w-[calc(33.333%-12px)] md:w-[calc(28%-12px)]"
          >
            <div
              className="h-[140px] rounded-lg overflow-hidden mb-2 border-t-4"
              style={{ borderColor: p.accentColor }}
            >
              <Image
                src={p.image}
                alt={p.title}
                width={200}
                height={140}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <p className="text-[13px] text-gray-500 leading-snug">{p.title}</p>
          </div>
        ))}
      </div>

    
      {canScroll && showBar && (
        <div className="relative h-[3px] bg-gray-100 rounded-full mt-3 overflow-hidden">
          <div
            className="absolute top-0 h-full bg-brand rounded-full transition-[left] duration-150 ease-out"
            style={{
              width: `${THUMB_WIDTH_PERCENT}%`,
              left: `${thumbLeft}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
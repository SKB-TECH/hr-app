import React from "react";
import Image from "next/image";
import { Epilogue } from "next/font/google";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {  MapPinIcon } from "lucide-react";

const epilogue = Epilogue({ subsets: ["latin"] });

interface HeroSectionProps {
  title: string;
  highlight: string;
  subtitle: string;
  searchEnabled?: boolean;
  popularTags?: string[];
}

const ReusableHeroSection = ({
  title,
  highlight,
  subtitle,
  searchEnabled,
  popularTags,
}: HeroSectionProps) => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <Image
        fill
        src="/BG.webp"
        alt="Hero background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-0">
        <div className="text-center pt-15">
          <h1 className="text-4xl md:text-5xl font-bold font-clash text-neutral-100">
            {title}{" "}
            <span className="relative inline-block text-accent-light-blue">
              {highlight}
              <img
                src="/image.png"
                alt="underline"
                className="h-[11px] ml-4 mt-2"
              />
            </span>
          </h1>
          <p className="mt-4 text-neutral-80 font-epilogue">{subtitle}</p>
        </div>

        {searchEnabled && (
          <>
            {/* Search bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-5 px-4 md:px-5 py-4 md:py-0 w-full min-h-[104px] bg-white shadow-md mt-10 mx-auto">
              {/* Search Input */}
              <div className="flex items-center w-full md:w-1/2 md:ml-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-neutral-100 mr-3 shrink-0" />

                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full py-2 border-b-2 border-brand-light-neutral focus:outline-none"
                />
              </div>

              {/* Divider - Desktop Only */}
              <div className="hidden md:block h-10 border-l border-brand-light-neutral" />

              {/* Location Input */}
              <div className=" flex items-center w-full md:w-1/2">
                <MapPinIcon className="h-5 w-5 text-neutral-100 mr-3 shrink-0" />
                <select className="w-full py-2 pr-8 border-b-2 border-brand-light-neutral focus:outline-none">
                  <option>Florence, Italy</option>
                  <option>New York, USA</option>
                  <option>London, UK</option>
                </select>
              </div>

              {/* Search Button */}
              <button className="w-full md:w-auto bg-brand text-white px-5 py-2 hover:bg-brand-dark transition">
                Search
              </button>
            </div>
            {popularTags && popularTags.length > 0 && (
              <p className="mt-4 text-[16px] text-neutral-80 font-epilogue pb-20">
                Popular:{" "}
                {popularTags.map((tag, index) => (
                  <span key={index} className="inline-block mr-2">
                    {tag}
                  </span>
                ))}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default React.memo(ReusableHeroSection);

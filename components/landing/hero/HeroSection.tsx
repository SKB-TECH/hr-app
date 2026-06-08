"use client";

import { useState } from "react";
import Image from "next/image";
import { SearchIcon, PinIcon, ChevronIcon } from "@/components/landing/icons";
import Link from "next/link";

function HeroTitle() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-5xl md:text-6xl font-semibold font-heading leading-tight text-gray-900">
        Discover<br />more than
      </h1>
      <div className="relative inline-block mt-2">
        <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">5000+ Jobs</h1>
        <svg viewBox="0 0 400 20" className="absolute -bottom-3 left-0 w-full" preserveAspectRatio="none">
          <path
            d="M4 12 Q100 2 200 12 Q300 22 396 10"
            stroke="#26A4FF"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
            <path
                d="M4 12 Q100 2 200 12 Q300 22 396 10"
                stroke="#26A4FF"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
      </div>
    </div>
  );
}

function SearchInput({ value, onChange, placeholder = "Job title or keyword" }: { value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-white flex-1 min-w-0">
      <SearchIcon />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 text-sm border-b-2 py-3 text-gray-700 placeholder-gray-500 outline-none bg-transparent"
      />
    </div>
  );
}

function LocationSelector({ value, onChange }: { value: string; onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; }) {
  return (
    <div className="flex items-center gap-2 px-5 py-3 bg-white border-l border-gray-100">
      <PinIcon className="w-5 h-5 text-gray-400" />
      <select
        value={value}
        onChange={onChange}
        className="text-sm text-gray-700 border-b-2 py-3 outline-none bg-transparent pr-2 appearance-none cursor-pointer"
      >
        <option>Florence, Italy</option>
        <option>Rome, Italy</option>
        <option>Milan, Italy</option>
        <option>Amsterdam, NL</option>
        <option>London, UK</option>
        <option>New York, US</option>
      </select>
      <ChevronIcon className="w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

function SearchButton({ onClick, children = "Search my job" }: { onClick: () => void; children?: React.ReactNode; }) {
  return (
    <button
      onClick={onClick}
      className=" bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm px-8 py-3  transition-colors whitespace-nowrap"
    >
      {children}
    </button>
  );
}

function PopularTags({ tags = ["UI Designer", "UX Researcher", "Android", "Admin"] }: { tags?: string[] }) {
  return (
    <p className="text-sm text-gray-600 mt-4">
      <span className="font-semibold text-gray-700">Popular :</span>{" "}
      {tags.map((t, i) => (
        <span key={t}>
          <Link href="#" className="text-gray-600 hover:text-indigo-600 hover:underline transition-colors">
            {t}
          </Link>
          {i < tags.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}

export default function HeroSection() {
  const [jobQuery, setJobQuery] = useState("");
  const [location, setLocation] = useState("Florence, Italy");

  const handleSearch = () => {
    console.log(`Searching for "${jobQuery || "all jobs"}" in ${location}`);
  };

  return (
    <section className="bg-pattern relative from-[#F5F6FB] to-[#EDEEF7] overflow-hidden min-h-screen lg:min-h-[650px] flex items-center py-12 lg:py-0">
      {/* Gradient Blobs */}
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-gradient-to-br from-indigo-200 to-blue-100 rounded-full opacity-30 blur-3xl pointer-events-none hidden lg:block" />
      <div className="absolute -right-20 -bottom-32 w-80 h-80 bg-gradient-to-tl from-blue-100 to-indigo-100 rounded-full opacity-25 blur-3xl pointer-events-none hidden lg:block" />

      <div className="max-w-6xl mx-auto w-full px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 z-10 relative">
        {/* Left Content */}
        <div className="flex-1 w-full">
          <HeroTitle />
          
          <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-md">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* Search Bar */}
          <div className="p-4 mt-10 flex flex-col sm:flex-row items-stretch overflow-hidden shadow-md bg-white max-w-3xl h-auto">
            <SearchInput
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
            />
            <LocationSelector value={location} onChange={(e) => setLocation(e.target.value)} />
            <SearchButton onClick={handleSearch} />
          </div>

          {/* Popular Tags */}
          <PopularTags tags={["UI Designer", "UX Researcher", "Android", "Admin"]} />
        </div>

        {/* Right Side - Person Image with Decorative Elements */}
        <div className="relative flex-shrink-0 hidden lg:flex items-center justify-center w-full lg:w-[420px] h-[520px]">
          {/* Decorative Grid Background - positioned behind image */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-15 pointer-events-none">
            <svg width="340" height="360" viewBox="0 0 340 360" fill="none">
              {[0, 50, 100, 150].map((o, i) => (
                <rect
                  key={i}
                  x={o}
                  y={o}
                  width={340 - o * 2}
                  height={360 - o * 2}
                  rx="6"
                  stroke="#818CF8"
                  strokeWidth="2"
                  fill="none"
                />
              ))}
            </svg>
          </div>

          {/* Background Gradient Container */}
          <div className="absolute inset-0 " />

          {/* Image Container */}
          <div className=" relative z-20 flex flex-col items-center justify-center h-full">
            <div className=" h-full  flex items-center justify-center overflow-hidden ">
              <Image
                src="/images/landingImg.png"
                alt="Professional"
                width={300}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

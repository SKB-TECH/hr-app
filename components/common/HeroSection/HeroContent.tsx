// components/HeroContent.tsx

import SearchBar, { SearchBarProps } from "@/components/ui/SearchBar";

export interface HeroContentProps {
  heading?: string;
  headingHighlight?: string;
  subheading?: string;
  searchBar?: SearchBarProps;
}

export default function HeroContent({
  heading = "Discover\nmore than",
  headingHighlight = "5000+ Jobs",
  subheading = "Great platform for the job seeker that searching for\nnew career heights and passionate about startups.",
  searchBar = {},
}: HeroContentProps) {
  return (
    <div className="relative z-10 flex-shrink-0 py-8 max-w-[520px] overflow-visible">
        
      {/* Main heading */}
      <h1 className="text-[58px] font-extrabold leading-[1.08] tracking-[-1.5px] text-[#202430] m-0 whitespace-pre-line">
        {heading}
      </h1>

      {/* Highlighted heading + hand-drawn underline */}
      <div className="relative inline-block mb-8">
        <h1 className="text-[58px] font-extrabold leading-[1.08] tracking-[-1.5px] text-[#26A4FF] m-0">
          {headingHighlight}
        </h1>
        {/* Hand-drawn underline SVG */}
        <svg
          className="absolute w-full"
          style={{ bottom: "-10px", left: 0, height: "16px" }}
          viewBox="0 0 310 16"
          fill="none"
        >
          <path
            d="M2 10 C40 4, 100 13, 160 8 C220 3, 270 11, 308 7"
            stroke="#26A4FF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M2 13 C50 9, 110 14, 170 11 C230 8, 278 13, 308 10"
            stroke="#26A4FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Subheading */}
      <p className="text-[15.5px] text-gray-400 leading-[1.65] max-w-[380px] mb-10 mt-2 whitespace-pre-line">
        {subheading}
      </p>

      <SearchBar {...searchBar} />
    </div>
  );
}
// // components/HeroContent.tsx

import SearchBar, { SearchBarProps } from "@/components/ui/SearchBar";
import Image from "next/image";

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
    <>
    <div className="relative z-10 flex-shrink-0 py-10 w-full max-w-[520px] overflow-visible">

      <h1 className="text-[40px] sm:text-[58px] font-extrabold leading-[1.08] tracking-[-1.5px] text-[#202430] m-0 whitespace-pre-line">
        {heading}
      </h1>

      <div className="relative inline-block mb-8">
        <h1 className="text-[40px] sm:text-[58px] font-extrabold leading-[1.08] tracking-[-1.5px] text-[#26A4FF] m-0">
          {headingHighlight}
        </h1>
        <Image src="/underline.png" alt="Underline" width={310} height={16} className="absolute w-full" style={{ bottom: "-10px", top:"70px" ,left: 0, height: "16px" }} />
      </div>

      <p className="text-[14px] sm:text-[15.5px] text-gray-400 leading-[1.65] max-w-[380px] mb-10 mt-2 whitespace-pre-line">
        {subheading}
      </p>

      <SearchBar {...searchBar} />
    </div>
    </>
  
  );
}
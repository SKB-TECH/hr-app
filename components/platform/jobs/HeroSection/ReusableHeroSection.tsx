import React from "react";
import Image from "next/image";
import HeroSearchBar from "./HeroSearchBar";
import HeroTitle from "./HeroTitle";

export const UNDERLINE_SIZES = {
  sm: { width: 230, height: 0 },
  md: { width: 350, height: 0 },
  lg: { width: 400, height: 0 },
};

interface HeroSectionProps {
  title: string;
  highlight: string;
  subtitle: string;
  searchEnabled?: boolean;
  popularTags?: string[];
  underlineSize?: keyof typeof UNDERLINE_SIZES;
}

const ReusableHeroSection = ({
  title,
  highlight,
  subtitle,
  searchEnabled,
  popularTags,
  underlineSize = "sm",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0B132B] via-[#132745] to-[#0A1128] border-b border-[#1E3A66]">
      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          fill
          src="/BG.webp"
          alt="Hero background"
          priority
          className="object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-transparent to-[#0B132B]/90" />
      </div>

      <div className="relative z-10 px-4 md:px-12 w-full max-w-7xl mx-auto py-8 md:py-12">
        <HeroTitle
          title={title}
          highlight={highlight}
          subtitle={subtitle}
          underlineSize={underlineSize}
        />

        {searchEnabled && <HeroSearchBar popularTags={popularTags} />}
      </div>
    </section>
  );
};

export default React.memo(ReusableHeroSection);


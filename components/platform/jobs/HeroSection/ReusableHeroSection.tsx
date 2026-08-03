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
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <Image
        fill
        src="/BG.webp"
        alt="Hero background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 px-4 md:px-12   w-full max-w-7xl mx-auto">
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

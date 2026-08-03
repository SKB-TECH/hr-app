import React from "react";
import Image from "next/image";
import { UNDERLINE_SIZES } from "./ReusableHeroSection";

interface HeroTitleProps {
  title: string;
  highlight: string;
  subtitle: string;
  underlineSize?: keyof typeof UNDERLINE_SIZES;
}

const HeroTitle = ({
  title,
  highlight,
  subtitle,
  underlineSize = "sm",
}: HeroTitleProps) => {
  const { width, height } = UNDERLINE_SIZES[underlineSize];

  return (
    <div className="text-center pt-15">
      <h1 className="text-4xl md:text-5xl font-bold font-clash text-neutral-100">
        {title}{" "}
        <span className="relative inline-block text-accent-light-blue">
          {highlight}
          <Image
            width={width}
            height={height}
            src="/image.png"
            alt="underline"
            className="mt-2"
          />
        </span>
      </h1>
      <p className="mt-4 text-neutral-80 font-epilogue">{subtitle}</p>
    </div>
  );
};

export default React.memo(HeroTitle);

import React from "react";


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
}: HeroTitleProps) => {
  return (
    <div className="text-center pt-10 md:pt-14 max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-clash text-white tracking-tight leading-tight">
        {title}{" "}
        <span className="text-[#26A4FF] underline decoration-[#26A4FF]/40 underline-offset-8">
          {highlight}
        </span>
      </h1>
      <p className="mt-4 text-base sm:text-lg text-white/80 font-normal leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default React.memo(HeroTitle);

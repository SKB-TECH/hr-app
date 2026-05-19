import type { ReactNode } from "react";

interface ReusableHeroProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  children?: ReactNode;
}

export default function ReusableHero({
  title,
  subtitle,
  tag,
  children,
}: ReusableHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#132745]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/heroImage.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#132745]/70" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-6 py-16 md:px-12">
        {children ?? (
          <>
            {tag && (
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/70">
                {tag}
              </p>
            )}
            {title && (
              <h1
                className="text-4xl leading-tight text-white uppercase sm:text-7xl md:text-8xl lg:text-[100px]"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.15em] text-white sm:text-base">
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

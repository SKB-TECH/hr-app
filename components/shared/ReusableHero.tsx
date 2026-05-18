// components/shared/ReusableHero.tsx

interface ReusableHeroProps {
  title: string;
  subtitle?: string;
  tag?: string;
}

export default function ReusableHero({ title, subtitle, tag }: ReusableHeroProps) {
  return (
    <section className="relative bg-[#132745] overflow-hidden">
     
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/heroImage.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#132745]/70" />
      </div>

      
      <div className="relative z-10 px-6 py-16 md:px-12 max-w-7xl mx-auto">
        {tag && (
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/70">
            {tag}
          </p>
        )}
        <h1
          className="text-4xl leading-tight sm:text-7xl md:text-8xl lg:text-[100px] text-white uppercase"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-white font-medium text-sm sm:text-base uppercase tracking-[0.15em]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
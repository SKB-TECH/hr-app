import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative flex-1 overflow-hidden bg-[#132745]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/heroImage.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#132745]/70" />
      </div>
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-6 py-16 md:px-12">
        <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80">
          Recruitment for creative people
        </p>
        <h2
          className="text-4xl leading-tight sm:text-7xl md:text-8xl lg:text-[100px] text-white wrap-break-word"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          <span className="text-[#39f3e5]">TALENT?</span>
          <br />
          MEET
          <br />
          OPPORTUNITY.
        </h2>
        <Button
          variant="outline-white"
          className="mt-8 flex h-auto items-center gap-3 border border-white/70 px-6 py-3 text-sm uppercase tracking-[0.18em]"
        >
          Job Openings
          <span className="text-sm">
            <ArrowRightIcon />
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Hero;

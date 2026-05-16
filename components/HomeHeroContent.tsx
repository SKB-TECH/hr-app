import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

function HomeHeroContent() {
  return (
    <>
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
    </>
  );
}

export default HomeHeroContent;

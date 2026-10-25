import Image from "next/image";
import ExecutiveAboutSection from "@/components/platform/landing/about/ExecutiveAboutSection";
import ExecutiveVisionSection from "@/components/platform/landing/vision/ExecutiveVisionSection";
import ExecutiveMilestonesSection from "@/components/platform/landing/milestones/ExecutiveMilestonesSection";
import ExecutiveStatsSection from "@/components/platform/landing/stats/ExecutiveStatsSection";
import PostJobsCta from "@/components/platform/companies/PostJobsCta";
import { getTranslations } from "next-intl/server";

const AboutUsPage = async () => {
  const t = await getTranslations("landing");

  return (
    <div className="w-full bg-[#F8F8FD]">
      {/* Hero Banner Inspired by Exuta "About Us" Header in Screenshot */}
      <section className="relative bg-[#132745] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.png"
            alt="Executive Office Background"
            fill
            priority
            className="object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#132745]/90 to-[#1C315E]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFB836] mb-3 block">
            Executive Search & Advisory
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            {t("about.heading")}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
            Discover our heritage of placing transformative leadership and building enduring corporate partnerships across global markets.
          </p>
        </div>
      </section>

      {/* Narrative Sections */}
      <ExecutiveAboutSection />
      <ExecutiveStatsSection />
      <ExecutiveVisionSection />
      <ExecutiveMilestonesSection />

      {/* Closing CTA */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-7xl mx-auto">
        <PostJobsCta />
      </div>
    </div>
  );
};

export default AboutUsPage;

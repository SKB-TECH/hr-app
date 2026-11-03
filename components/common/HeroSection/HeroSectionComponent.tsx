import Image from "next/image";
import { Sparkles, ShieldCheck, Briefcase } from "lucide-react";
import { getTranslations } from "next-intl/server";
import HeroSearchForm from "./HeroSearchForm";

export default async function HeroSectionComponent() {
  const t = await getTranslations("common");

  const popularItems = [
    t("heroSection.popular.uiDesigner"),
    t("heroSection.popular.uxResearcher"),
    t("heroSection.popular.android"),
    t("heroSection.popular.admin"),
  ];

  return (
    <section className="relative overflow-hidden bg-[#132745] text-white">
      {/* Local Background Photography with Brand Navy & Indigo Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="Executive Office Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#132745]/90 to-[#1C315E]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(70,64,222,0.2),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 pt-14 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subheading, and Isolated Client Search Bar */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Top Badge with rounded-none */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/10 backdrop-blur-md border border-white/15 text-[#FFB836] text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles size={14} className="text-[#26A4FF]" aria-hidden="true" />
              <span>Executive Search &amp; Talent Matching</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold tracking-tight text-white leading-[1.12]">
              {t("heroSection.headingLine1")}{" "}
              <span className="text-white/90">
                {t("heroSection.headingLine2")}
              </span>{" "}
              <span className="relative inline-block text-[#26A4FF] underline decoration-[#FFB836]/60 decoration-wavy decoration-2 underline-offset-8">
                {t("heroSection.headingHighlight")}
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              {t("heroSection.subheading")}
            </p>

            {/* Isolated Client Search Bar & Popular Pills */}
            <HeroSearchForm
              searchPlaceholder={t("heroSection.searchPlaceholder")}
              selectLocationOption={t("heroSection.selectLocationOption")}
              searchButtonLabel={t("heroSection.searchButton")}
              popularLabel={t("heroSection.popular.label")}
              popularItems={popularItems}
            />

            {/* Trust Markers Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#26A4FF]" aria-hidden="true" />
                <span>Verified Executive Roles</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-[#FFB836]" aria-hidden="true" />
                <span>Confidential Search</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#26A4FF] animate-pulse" aria-hidden="true" />
                <span>Active Global Matching</span>
              </div>
            </div>
          </div>

          {/* Right Column: Local Executive Portrait Card (Hero Headshot with priority) */}
          <div className="lg:col-span-4 hidden lg:flex justify-end relative">
            <div className="relative w-[340px] xl:w-[380px]">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#4640DE]/25 via-[#26A4FF]/20 to-transparent blur-md" />

              {/* Main Image Card with rounded-none — sole priority image */}
              <div className="relative rounded-none overflow-hidden border-2 border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] aspect-[4/5] bg-[#132745]">
                <Image
                  src="/images/hero2.png"
                  alt="Executive Recruitment Director"
                  fill
                  priority
                  sizes="(max-width: 1280px) 340px, 380px"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Stat Badge 1 (Top Left) with rounded-none */}
              <div className="absolute -top-4 -left-6 bg-white text-[#132745] p-3.5 rounded-none shadow-xl border border-gray-100 flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-none bg-[#EEF2FF] flex items-center justify-center text-[#4640DE] font-bold text-lg">
                  15Y
                </div>
                <div>
                  <p className="text-xs font-bold text-[#132745]">
                    Industry Leader
                  </p>
                  <p className="text-[11px] text-[#7C8493]">Executive Search</p>
                </div>
              </div>

              {/* Floating Stat Badge 2 (Bottom Right) with rounded-none */}
              <div className="absolute -bottom-5 -right-5 bg-[#132745] text-white p-4 rounded-none shadow-2xl border border-white/15 flex items-center gap-3.5 backdrop-blur-md">
                <div className="w-10 h-10 rounded-none bg-[#4640DE]/20 flex items-center justify-center text-[#26A4FF]">
                  <Sparkles size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#FFB836]">98%</p>
                  <p className="text-xs text-white/80">Placement Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

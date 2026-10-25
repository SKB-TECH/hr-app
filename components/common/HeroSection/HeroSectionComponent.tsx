"use client";

import Image from "next/image";
import { Search, MapPin, Sparkles, ShieldCheck, Briefcase } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountrySelect from "@/components/ui/CountrySelect";
import { useTranslations } from "next-intl";

export default function HeroSectionComponent() {
  const t = useTranslations("common");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (selectedLocation) params.set("location", selectedLocation);
    const queryString = params.toString();
    router.push(`/jobs${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#132745] text-white">
      {/* Background Photography with Brand Navy & Indigo Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Executive Office"
          fill
          priority
          quality={85}
          className="object-cover object-center opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#132745]/90 to-[#1C315E]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(70,64,222,0.2),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 pt-14 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subheading, and Search */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFB836] text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles size={14} className="text-[#26A4FF]" />
              <span>Executive Search & Talent Matching</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold tracking-tight text-white leading-[1.12]">
              {t("heroSection.headingLine1")}{" "}
              <span className="text-white/90">{t("heroSection.headingLine2")}</span>{" "}
              <span className="relative inline-block text-[#26A4FF] underline decoration-[#FFB836]/60 decoration-wavy decoration-2 underline-offset-8">
                {t("heroSection.headingHighlight")}
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              {t("heroSection.subheading")}
            </p>

            {/* Modern Floating Search Bar in Brand Blue */}
            <div className="mt-8 w-full max-w-3xl bg-white rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Keyword Search Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0">
                <Search size={20} className="shrink-0 text-[#25324B]/60" />
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={t("heroSection.searchPlaceholder")}
                  className="h-10 sm:h-12 border-0 bg-transparent text-[#25324B] text-sm sm:text-base placeholder:text-[#7C8493] shadow-none focus-visible:ring-0 px-0"
                />
              </div>

              {/* Divider on Desktop */}
              <div className="hidden sm:block w-px h-8 bg-gray-200" />

              {/* Location Select Input */}
              <div className="flex-1 flex items-center gap-2 px-3 py-2 sm:py-0">
                <MapPin size={20} className="shrink-0 text-[#25324B]/60" />
                <div className="w-full">
                  <CountrySelect
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    placeholder={t("heroSection.selectLocationOption")}
                    className="h-10 sm:h-12 border-0 bg-transparent text-[#25324B] text-sm sm:text-base shadow-none px-0"
                  />
                </div>
              </div>

              {/* Search CTA Button in Brand Blue */}
              <Button
                onClick={handleSearch}
                className="h-11 sm:h-12 px-7 rounded-xl sm:rounded-full bg-[#4640DE] hover:bg-[#3730C9] text-white font-semibold text-sm sm:text-base shadow-[0_4px_16px_rgba(70,64,222,0.4)] transition-all cursor-pointer shrink-0"
              >
                {t("heroSection.searchButton")}
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70">
              <span className="font-medium text-white/90">
                {t("heroSection.popular.label")}
              </span>
              {[
                t("heroSection.popular.uiDesigner"),
                t("heroSection.popular.uxResearcher"),
                t("heroSection.popular.android"),
                t("heroSection.popular.admin"),
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setKeyword(item);
                    router.push(`/jobs?q=${encodeURIComponent(item)}`);
                  }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/90 hover:text-white transition-colors cursor-pointer text-xs"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Trust Markers Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#26A4FF]" />
                <span>Verified Executive Roles</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-[#FFB836]" />
                <span>Confidential Search</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#26A4FF] animate-pulse" />
                <span>Active Global Matching</span>
              </div>
            </div>
          </div>

          {/* Right Column: Refined Executive Portrait Card */}
          <div className="lg:col-span-4 hidden lg:flex justify-end relative">
            <div className="relative w-[340px] xl:w-[380px]">
              {/* Outer Decorative Ring in Brand Blue */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#4640DE]/25 via-[#26A4FF]/20 to-transparent blur-xl" />

              {/* Main Rounded Image Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] aspect-[4/5] bg-[#132745]">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Executive Recruitment Director"
                  fill
                  priority
                  sizes="(max-width: 1280px) 340px, 380px"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Stat Badge 1 (Top Left) */}
              <div className="absolute -top-4 -left-6 bg-white text-[#132745] p-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4640DE] font-bold text-lg">
                  15Y
                </div>
                <div>
                  <p className="text-xs font-bold text-[#132745]">Industry Leader</p>
                  <p className="text-[11px] text-[#7C8493]">Executive Search</p>
                </div>
              </div>

              {/* Floating Stat Badge 2 (Bottom Right) */}
              <div className="absolute -bottom-5 -right-5 bg-[#132745] text-white p-4 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-3.5 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-[#4640DE]/20 flex items-center justify-center text-[#26A4FF]">
                  <Sparkles size={20} />
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

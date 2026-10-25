"use client";

import { useTranslations } from "next-intl";

export default function ExecutiveStatsSection() {
  const t = useTranslations("landing");

  const stats = [
    {
      value: t("executiveStats.stat1Value"),
      label: t("executiveStats.stat1Label"),
    },
    {
      value: t("executiveStats.stat2Value"),
      label: t("executiveStats.stat2Label"),
    },
    {
      value: t("executiveStats.stat3Value"),
      label: t("executiveStats.stat3Label"),
    },
    {
      value: t("executiveStats.stat4Value"),
      label: t("executiveStats.stat4Label"),
    },
  ];

  return (
    <section className="bg-[#132745] text-white py-14 sm:py-16 md:py-20 border-y border-white/10 relative overflow-hidden">
      {/* Background glow effects in Brand Blue & Gold */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[#4640DE]/15 rounded-none blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[#FFB836]/10 rounded-none blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-10 text-center">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-none bg-white/[0.03] border border-white/10 hover:border-[#4640DE]/40 hover:bg-white/[0.06] transition-all duration-300 ${
                index < stats.length - 1 ? "md:border-r md:border-r-white/10" : ""
              }`}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFB836] tracking-tight">
                {item.value}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

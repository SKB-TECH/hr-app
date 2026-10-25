"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ExecutiveMilestonesSection() {
  const t = useTranslations("landing");

  const milestones = [
    {
      year: t("executiveMilestones.milestone1Year"),
      title: t("executiveMilestones.milestone1Title"),
      desc: t("executiveMilestones.milestone1Desc"),
      highlighted: false,
    },
    {
      year: t("executiveMilestones.milestone2Year"),
      title: t("executiveMilestones.milestone2Title"),
      desc: t("executiveMilestones.milestone2Desc"),
      highlighted: false,
    },
    {
      year: t("executiveMilestones.milestone3Year"),
      title: t("executiveMilestones.milestone3Title"),
      desc: t("executiveMilestones.milestone3Desc"),
      highlighted: true, // Deep navy card matching Exuta
    },
    {
      year: t("executiveMilestones.milestone4Year"),
      title: t("executiveMilestones.milestone4Title"),
      desc: t("executiveMilestones.milestone4Desc"),
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F8FD] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Executive Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(19,39,69,0.15)] border-4 border-white bg-[#132745] group">
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80"
                alt="Executive Career Leader"
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column: Story & 2x2 Milestones Grid */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Coral Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF1F0] border border-[#FF6550]/30 text-[#FF6550] text-xs font-bold uppercase tracking-wider mb-4">
              {t("executiveMilestones.badge")}
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#132745] leading-[1.2] tracking-tight">
              {t("executiveMilestones.heading")}
            </h2>

            {/* Subtitle Description */}
            <p className="mt-4 text-base sm:text-lg text-[#7C8493] leading-relaxed max-w-2xl">
              {t("executiveMilestones.description")}
            </p>

            {/* 2x2 Milestones Grid Inspired by Exuta */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl transition-all duration-300 ${
                    m.highlighted
                      ? "bg-[#132745] text-white shadow-xl border border-white/10 hover:shadow-2xl"
                      : "bg-white text-[#25324B] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-md hover:border-[#4640DE]/30"
                  }`}
                >
                  {/* Year Tag */}
                  <span
                    className={`text-lg sm:text-xl font-black ${
                      m.highlighted ? "text-[#FFB836]" : "text-[#FF6550]"
                    }`}
                  >
                    {m.year}
                  </span>

                  {/* Title */}
                  <h3
                    className={`mt-2 text-base sm:text-lg font-bold ${
                      m.highlighted ? "text-white" : "text-[#132745]"
                    }`}
                  >
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${
                      m.highlighted ? "text-white/80" : "text-[#7C8493]"
                    }`}
                  >
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

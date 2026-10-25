"use client";

import Image from "next/image";
import { Users, Database, ShieldCheck, Check } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ExecutiveVisionSection() {
  const t = useTranslations("landing");

  const capabilities = [
    {
      icon: <Users size={22} className="text-[#4640DE]" />,
      title: t("executiveVision.card1Title"),
      description: t("executiveVision.card1Desc"),
    },
    {
      icon: <Database size={22} className="text-[#FFB836]" />,
      title: t("executiveVision.card2Title"),
      description: t("executiveVision.card2Desc"),
    },
    {
      icon: <ShieldCheck size={22} className="text-[#FF6550]" />,
      title: t("executiveVision.card3Title"),
      description: t("executiveVision.card3Desc"),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision Details & Capabilities */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Coral Label with rounded-none */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-[#FFF1F0] border border-[#FF6550]/30 text-[#FF6550] text-xs font-bold uppercase tracking-wider mb-4">
              {t("executiveVision.badge")}
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#132745] leading-[1.2] tracking-tight">
              {t("executiveVision.heading")}
            </h2>

            {/* Capability Features Grid with rounded-none */}
            <div className="mt-8 space-y-6 w-full">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-none bg-[#F8F8FD] border border-gray-100 hover:border-[#4640DE]/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-none bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#132745] group-hover:text-[#4640DE] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#7C8493] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlighted Deep Navy Card with rounded-none */}
            <div className="mt-8 w-full p-6 sm:p-7 rounded-none bg-[#132745] text-white shadow-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4640DE]/20 rounded-none blur-2xl pointer-events-none" />
              <p className="text-sm text-white/90 leading-relaxed font-normal">
                {t("executiveVision.highlightDesc")}
              </p>
              <div className="mt-5 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-none bg-[#4640DE] flex items-center justify-center text-white shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {t("executiveVision.highlightItem1")}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-none bg-[#4640DE] flex items-center justify-center text-white shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {t("executiveVision.highlightItem2")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Local Tall Executive Portrait with rounded-none */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-none overflow-hidden shadow-[0_25px_60px_rgba(19,39,69,0.18)] border-4 border-white bg-[#132745] group">
              <Image
                src="/images/image4.png"
                alt="Executive Leader in Modern Office Lounge"
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

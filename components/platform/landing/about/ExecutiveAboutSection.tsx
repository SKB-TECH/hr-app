"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { CheckCircle2, Play, ArrowRight, Award } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ExecutiveAboutSection() {
  const t = useTranslations("landing");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F8FD] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Collage with Local Images and rounded-none */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Primary Tall Portrait */}
              <div className="col-span-7 relative">
                <div className="relative aspect-[3/4] rounded-none overflow-hidden shadow-[0_20px_40px_rgba(19,39,69,0.12)] border-4 border-white bg-[#132745]">
                  <Image
                    src="/images/image.png"
                    alt="Senior Executive Search Specialist"
                    fill
                    sizes="(max-width: 1024px) 50vw, 320px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Experience Badge in Deep Navy & Gold with rounded-none */}
                <div className="absolute -bottom-6 left-2 right-2 sm:right-6 bg-[#132745] text-white p-4 rounded-none shadow-xl border border-white/10 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-[#4640DE]/20 flex items-center justify-center text-[#FFB836] shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {t("executiveAbout.experienceYears")}
                      </p>
                      <p className="text-[11px] text-white/70 leading-tight">
                        {t("executiveAbout.experienceLabel")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Secondary Images Stack */}
              <div className="col-span-5 flex flex-col gap-4">
                {/* Image 1: Handshake / Agreement */}
                <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-md border-2 border-white bg-gray-100">
                  <Image
                    src="/images/image1.png"
                    alt="Executive Candidate Interview"
                    fill
                    sizes="(max-width: 1024px) 30vw, 220px"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Image 2: Team Collaboration */}
                <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-md border-2 border-white bg-gray-100">
                  <Image
                    src="/images/image2.png"
                    alt="Corporate Strategy Meeting"
                    fill
                    sizes="(max-width: 1024px) 30vw, 220px"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Video Feature Card with Play Button */}
                <div className="relative aspect-[16/10] rounded-none overflow-hidden shadow-lg border-2 border-white bg-[#0B132B] group cursor-pointer">
                  <Image
                    src="/images/image3.png"
                    alt="Recruitment Excellence Overview"
                    fill
                    sizes="(max-width: 1024px) 30vw, 220px"
                    className="object-cover opacity-75 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      aria-label="Play Introduction Video"
                      className="w-11 h-11 rounded-none bg-white text-[#4640DE] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    >
                      <Play size={18} className="translate-x-0.5 fill-[#4640DE]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Content with rounded-none */}
          <div className="lg:col-span-6 flex flex-col items-start pt-6 lg:pt-0">
            {/* Coral Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#FFF1F0] border border-[#FF6550]/30 text-[#FF6550] text-xs font-bold uppercase tracking-wider mb-4">
              {t("executiveAbout.badge")}
            </div>

            {/* Main Section Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#132745] leading-[1.2] tracking-tight">
              {t("executiveAbout.heading")}
            </h2>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-[#7C8493] leading-relaxed">
              {t("executiveAbout.description")}
            </p>

            {/* Key Benefits List */}
            <div className="mt-8 space-y-4 w-full">
              {[
                t("executiveAbout.benefit1"),
                t("executiveAbout.benefit2"),
                t("executiveAbout.benefit3"),
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3.5 group">
                  <div className="w-6 h-6 rounded-none bg-[#EEF2FF] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#4640DE] transition-colors">
                    <CheckCircle2 size={16} className="text-[#4640DE] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-[#25324B]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTA in Brand Blue with rounded-none */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none bg-[#4640DE] hover:bg-[#3730C9] text-white font-bold text-sm sm:text-base shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span>{t("executiveAbout.cta")}</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none border-2 border-[#132745]/20 hover:border-[#132745] text-[#132745] font-semibold text-sm sm:text-base transition-colors"
              >
                <span>Our Methodology</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

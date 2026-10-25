import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";

type PostJobsCtaProps = {
  copy?: {
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
};

export default async function PostJobsCta({ copy }: PostJobsCtaProps) {
  const t = await getTranslations("landing");

  const title = copy?.title ?? t("executiveCta.heading");
  const subtitle = copy?.subtitle ?? t("executiveCta.subtitle");
  const buttonLabel = copy?.buttonLabel ?? t("executiveCta.button");

  return (
    <section
      aria-label={t("postJobsCta.ariaLabel")}
      className="relative w-full overflow-hidden my-12 md:my-20 rounded-3xl bg-[#132745] shadow-[0_25px_60px_rgba(19,39,69,0.25)] border border-white/10"
    >
      {/* Background Photography with Brand Navy & Indigo Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
          alt="Executive Workspace Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#132745]/90 to-[#1C315E]/85" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4640DE]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Inner Content Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 px-6 sm:px-10 md:px-14 py-12 md:py-16">
        {/* Text & CTAs */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFB836] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={13} className="text-[#26A4FF]" />
            <span>Executive Search & Placement</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-[1.2] tracking-tight">
            {title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#4640DE] hover:bg-[#3730C9] text-white text-base font-bold rounded-full shadow-[0_6px_20px_rgba(70,64,222,0.4)] hover:shadow-[0_8px_25px_rgba(70,64,222,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>{buttonLabel}</span>
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-base font-semibold rounded-full border border-white/20 transition-all duration-300"
            >
              <span>{t("executiveCta.secondaryButton")}</span>
            </Link>
          </div>
        </div>

        {/* Mock browser preview card */}
        <div className="w-full lg:w-[460px] xl:w-[500px] shrink-0" aria-hidden>
          <div className="w-full bg-[#1C315E]/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/15">
            {/* Header Chrome Dots */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B132B]/90 border-b border-white/10">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6550]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB836]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#26A4FF]" />
              </div>
              <span className="text-[11px] text-white/60 font-mono tracking-wide">
                fast2hire.com/executive
              </span>
            </div>

            {/* Dashboard Preview */}
            <div className="p-3 bg-white/5">
              <Image
                src="/logo/dashboard-preview.png"
                alt={t("postJobsCta.dashboardPreviewAlt")}
                width={500}
                height={320}
                className="w-full h-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
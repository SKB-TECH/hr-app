"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import ImageGrid from "./ImageGrid";
import { Link } from "@/i18n/routing";

type Props = {
  company: string;
  companyLogo: string;
  description: string;
  mainImage: string;
  topRightImage: string;
  bottomRightImage: string;
  className?: string;
  companyId: string;
};

export default function CompanyOverviewSection({
  company,
  companyLogo,
  description,
  mainImage,
  topRightImage,
  bottomRightImage,
  className = "",
  companyId,
}: Props) {
  const t = useTranslations("findJobs");

  return (
    <section
      className={`py-8 md:py-20 flex flex-col lg:flex-row justify-between gap-20   ${className}`}
    >
      <div className="w-full lg:max-w-2xl">
        <div className="flex items-center gap-4">
          <Image
            src={companyLogo}
            alt={`${company} logo`}
            width={48}
            height={48}
            quality={100}
          />
          <div className="ml-4">
            <h3 className="text-[32px] font-bold text-neutral-100">
              {company}
            </h3>
            <Link
              href={`/companies/${companyId}`}
              className="flex items-center gap-2 text-brand"
            >
              <span className="font-semibold">{t("detail.companyOverview.readMore", { company })}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-neutral-80 text-[16px] leading-[1.6] tracking-normal font-epilogue">
            {description}
          </p>
        </div>
      </div>
      <ImageGrid
        mainImage={mainImage}
        topRightImage={topRightImage}
        bottomRightImage={bottomRightImage}
      />
    </section>
  );
}

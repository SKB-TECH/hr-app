"use client";

import { useTranslations } from "next-intl";
import PerkCard from "./PerkCard";

type Perk = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  perks: Perk[];
  className?: string;
};

export default function JobPerksSection({ perks, className = "" }: Props) {
  const t = useTranslations("findJobs");

  return (
    <section
      className={`border-y border-gray-200 py-8 md:py-20   ${className}`}
    >
      <div className="mb-8">
        <h2 className=" leading-[1.6] tracking-normal text-[32px] font-bold text-neutral-100">
          {t("detail.perks.title")}
        </h2>
        <p className="text-[16px] text-neutral-80 leading-[1.6] tracking-normal">
          {t("detail.perks.description")}
        </p>
      </div>
      <div className="grid gap-x-10 gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((perk) => (
          <PerkCard
            key={perk.title}
            icon={perk.icon}
            title={perk.title}
            description={perk.description}
          />
        ))}
      </div>
    </section>
  );
}

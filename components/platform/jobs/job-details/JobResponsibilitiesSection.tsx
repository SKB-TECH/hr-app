"use client";

import { useTranslations } from "next-intl";
import JobBulletList from "./JobBulletList";

type Props = {
  responsibilities: string[];
  whoYouAre: string[];
  niceToHaves: string[];
  className?: string;
};

export default function JobResponsibilitiesSection({
  responsibilities,
  whoYouAre,
  niceToHaves,
  className = "",
}: Props) {
  const t = useTranslations("findJobs");

  return (
    <div className={className}>
      <JobBulletList title={t("detail.responsibilities.title")} items={responsibilities} />
      {/* separator for small devices */}
      <hr className="block md:hidden border-t border-light-brand-neutral my-6" />
      <JobBulletList
        title={t("detail.responsibilities.whoYouAreTitle")}
        items={whoYouAre}
        className="md:pt-10 "
      />
      {/* separator for small devices */}
      <hr className="block md:hidden border-t border-light-brand-neutral my-6" />
      <JobBulletList
        title={t("detail.responsibilities.niceToHaveTitle")}
        items={niceToHaves}
        className="md:pt-10"
      />
      {/* separator for small devices */}
      <hr className="block md:hidden border-t border-light-brand-neutral my-6" />
    </div>
  );
}

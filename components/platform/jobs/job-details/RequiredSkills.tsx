"use client";

import { useTranslations } from "next-intl";
import StatusLabel from "./StatusLabel";

type Skill = {
  id: string | number;
  name: string;
};

type Props = {
  skills: Skill[];
  className?: string;
};

export default function RequiredSkills({ skills, className = "" }: Props) {
  const t = useTranslations("findJobs");

  return (
    <div className={`py-8 ${className}`}>
      <h1 className="pb-4  text-[24px] md:text-[32px] text-neutral-100 font-bold font-clash">
        {t("detail.requiredSkills.title")}
      </h1>
      <div className="flex items-center gap-4 flex-wrap">
        {skills.map((skill) => (
          <StatusLabel
            key={skill.id}
            className="rounded-none font-normal bg-accent-light-brand text-brand"
            label={skill.name}
          />
        ))}
      </div>
    </div>
  );
}

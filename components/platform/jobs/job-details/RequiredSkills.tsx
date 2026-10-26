"use client";

import { useTranslations } from "next-intl";

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

  if (!skills || skills.length === 0) return null;

  return (
    <div className={`border border-[#D6DDEB] bg-white p-6 rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] mt-6 ${className}`}>
      <h3 className="pb-3 text-lg text-[#132745] font-bold font-clash tracking-tight">
        {t("detail.requiredSkills.title")}
      </h3>
      <div className="flex items-center gap-2 flex-wrap">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="inline-block px-3 py-1.5 text-xs font-semibold rounded-none bg-[#F8F9FC] text-[#132745] border border-[#D6DDEB] hover:border-[#4640DE] hover:text-[#4640DE] transition-colors"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}


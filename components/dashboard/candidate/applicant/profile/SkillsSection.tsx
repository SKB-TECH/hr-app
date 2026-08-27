
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";

interface SkillsSectionProps {
  skills?: string[];
}

const defaultSkills = [
  "Communication",
  "Analytics",
  "Facebook Ads",
  "Content Planning",
  "Community Manager",
];

export default function SkillsSection({ skills = defaultSkills }: SkillsSectionProps) {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-bold text-[#202430]">Skills</h2>
        <div className="flex items-center gap-2">
          <button className="cursor-pointer border border-gray-200 p-1.5  ">
            <PlusIcon className="w-4 h-4 text-brand" />
          </button>
          <button className="cursor-pointer border border-gray-200 p-1.5   ">
            <PencilSquareIcon className="w-4 h-4 text-brand" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-[13px] font-medium text-brand bg-indigo-50 px-4 py-2 "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useSkillsDirectory } from "@/core/hooks/candidate/use-skills-directory";

interface SkillInputProps {
  label?: string;
  placeholder?: string;
  defaultSkills?: string[];
  onChange?: (skills: string[]) => void;
}

export default function SkillInput({
  label = "Required Skills",
  placeholder = "Search a skill",
  defaultSkills = [],
  onChange,
}: SkillInputProps) {
  const skills = defaultSkills;
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { data: directory = [], isLoading } = useSkillsDirectory(input);

  const openPicker = () => {
    if (!showInput) {
      setShowInput(true);
    }
  };

  const addSkill = (value: string) => {
    if (skills.includes(value)) {
      setInput("");
      return;
    }

    const updatedSkills = [...skills, value];

    onChange?.(updatedSkills);

    setInput("");
    setShowInput(false);
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter((item) => item !== skill);

    onChange?.(updatedSkills);
  };

  return (
    <div className="space-y-5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Add Button */}
      <button
        type="button"
        onClick={openPicker}
        className="inline-flex items-center gap-2 border border-[#D6DDEB] hover:border-[#4640DE] bg-white px-4 py-2 text-xs font-bold text-[#4640DE] rounded-none transition-all cursor-pointer shadow-sm"
      >
        <Plus size={15} />
        Add Skill
      </button>

      {showInput && (
        <div className="max-w-md space-y-2">
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full border border-[#D6DDEB] bg-white rounded-none px-3.5 py-2 text-sm text-[#132745] outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]"
          />
          <div className="max-h-52 overflow-y-auto border border-[#D6DDEB] bg-white rounded-none shadow-lg">
            {isLoading && <p className="p-3 text-xs text-gray-500">Loading skills...</p>}
            {!isLoading && directory.length === 0 && (
              <p className="p-3 text-xs text-gray-500">No predefined skill found. Press enter or click to add custom skill.</p>
            )}
            {directory
              .filter((skill) => !skills.includes(skill.name))
              .map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => addSkill(skill.name)}
                  className="block w-full border-b border-[#F0F2F7] px-3.5 py-2 text-left text-xs sm:text-sm last:border-b-0 hover:bg-[#F8F9FC] text-[#132745] font-medium transition-colors"
                >
                  {skill.name}
                  {skill.category?.name && (
                    <span className="ml-2 text-xs text-gray-400 font-normal">{skill.category.name}</span>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Added Skills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="inline-flex items-center gap-2 bg-[#F8F9FC] border border-[#D6DDEB] px-3 py-1.5 text-xs font-semibold text-[#132745] rounded-none"
          >
            <span>{skill}</span>

            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer rounded-none"
              aria-label={`Remove skill ${skill}`}
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

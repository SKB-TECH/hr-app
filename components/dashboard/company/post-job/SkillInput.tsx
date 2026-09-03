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
        className="flex items-center gap-2 border border-neutral-20 px-4 py-2 font-medium text-brand "
      >
        <Plus size={18} />
        Add Skill
      </button>

      {showInput && (
        <div className="max-w-md space-y-2">
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full border border-neutral-20 px-3 py-2 outline-none focus:border-brand"
          />
          <div className="max-h-52 overflow-y-auto border border-neutral-20 bg-white">
            {isLoading && <p className="p-3 text-sm text-gray-500">Loading skills...</p>}
            {!isLoading && directory.length === 0 && (
              <p className="p-3 text-sm text-gray-500">No predefined skill found.</p>
            )}
            {directory
              .filter((skill) => !skills.includes(skill.name))
              .map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => addSkill(skill.name)}
                  className="block w-full border-b border-neutral-20 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-[#F8F8FD]"
                >
                  {skill.name}
                  {skill.category?.name && (
                    <span className="ml-2 text-xs text-gray-400">{skill.category.name}</span>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Added Skills */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 bg-[#F8F8FD] px-4 py-2 text-sm font-medium text-brand"
          >
            {skill}

            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="rounded-full p-1 hover:bg-gray-200"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

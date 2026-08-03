"use client";

import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";

interface SkillInputProps {
  label?: string;
  placeholder?: string;
  defaultSkills?: string[];
  onChange?: (skills: string[]) => void;
}

export default function SkillInput({
  label = "Required Skills",
  placeholder = "Enter a skill",
  defaultSkills = [],
  onChange,
}: SkillInputProps) {
  const [skills, setSkills] = useState<string[]>(defaultSkills);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  const addSkill = () => {
    // First click only opens the input
    if (!showInput) {
      setShowInput(true);
      return;
    }

    const value = input.trim();

    if (!value) return;

    if (skills.includes(value)) {
      setInput("");
      return;
    }

    const updatedSkills = [...skills, value];

    setSkills(updatedSkills);
    onChange?.(updatedSkills);

    setInput("");
    setShowInput(false);
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter((item) => item !== skill);

    setSkills(updatedSkills);
    onChange?.(updatedSkills);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Add Button */}
      <button
        type="button"
        onClick={addSkill}
        className="flex items-center gap-2 border border-neutral-20 px-4 py-2 font-medium text-brand "
      >
        <Plus size={18} />
        Add Skill
      </button>

      {/* Show input only after Add button is clicked */}
      {showInput && (
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-w-[180px] border border-neutral-20 px-3 py-2 outline-none focus:border-brand"
        />
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

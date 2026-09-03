"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SparklesIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import SubmitButton from "../shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { useSkillsDirectory } from "@/core/hooks/candidate/use-skills-directory";
import { useAttachCandidateSkills } from "@/core/hooks/candidate/use-attach-candidate-skills";
import { useDebouncedValue } from "@/core/hooks/shared/use-debounced-value";
import type { CandidateSkill } from "@/core/types/candidate-skill";
import { ApiError } from "@/core/types/api";

interface SkillsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentSkills: CandidateSkill[];
}

export default function SkillsModal({ open, onOpenChange, currentSkills }: SkillsModalProps) {
  const attachSkills = useAttachCandidateSkills();
  const isPending = attachSkills.isPending;
  const submittingRef = useRef(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { data: directory = [], isLoading } = useSkillsDirectory(debouncedSearch);

  const [selected, setSelected] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (!open) return;
    setSearch("");
    setSelected(new Map(currentSkills.map((skill) => [skill.skillId, skill.name])));
  }, [open, currentSkills]);

  const groups = useMemo(() => {
    const byCategory = new Map<string, { label: string; entries: typeof directory }>();
    for (const entry of directory) {
      const label = entry.category?.name || "Other";
      const key = entry.categoryId || label;
      if (!byCategory.has(key)) byCategory.set(key, { label, entries: [] });
      byCategory.get(key)!.entries.push(entry);
    }
    return Array.from(byCategory.values());
  }, [directory]);

  const toggleSkill = (skillId: string, name: string) => {
    setSelected((previous) => {
      const next = new Map(previous);
      if (next.has(skillId)) next.delete(skillId);
      else next.set(skillId, name);
      return next;
    });
  };

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    try {
      await attachSkills.mutateAsync({ skillIds: Array.from(selected.keys()) });
      toast.success("Skills updated successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Something went wrong. Please try again.");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <ProfileEntryModal
      open={open}
      onOpenChange={onOpenChange}
      isPending={isPending}
      icon={<SparklesIcon className="h-5 w-5" />}
      title="Add Skills"
      description="Search the skills directory and select the ones that best represent your expertise."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        className="mt-5 space-y-4"
      >
        {selected.size > 0 && (
          <div className="flex flex-wrap gap-2">
            {Array.from(selected.entries()).map(([skillId, name]) => (
              <span
                key={skillId}
                className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-[13px] font-medium text-brand"
              >
                {name}
                <button
                  type="button"
                  onClick={() => toggleSkill(skillId, name)}
                  aria-label={`Remove ${name}`}
                  className="cursor-pointer text-brand/70 hover:text-brand"
                >
                  <XMarkIcon className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search skills e.g. React, SQL, Copywriting"
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-brand"
          />
        </div>

        <div className="max-h-64 space-y-4 overflow-y-auto pr-1">
          {isLoading && <p className="text-[14px] text-gray-500">Searching skills…</p>}

          {!isLoading && groups.length === 0 && (
            <p className="text-[14px] text-gray-500">No skills found. Try a different search term.</p>
          )}

          {!isLoading &&
            groups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-gray-400">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.entries.map((entry) => {
                    const isSelected = selected.has(entry.id);
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => toggleSkill(entry.id, entry.name)}
                        className={`cursor-pointer rounded-full border px-3 py-1.5 text-[13px] font-medium transition ${
                          isSelected
                            ? "border-brand bg-brand text-white"
                            : "border-gray-200 text-[#25324B] hover:border-brand"
                        }`}
                      >
                        {entry.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>

        <DialogFooter className="-mx-6 -mb-6 mt-2 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <SubmitButton isPending={isPending} label="Save Skills" pendingLabel="Saving..." className="bg-brand text-white hover:bg-[#3730c4]" />
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}

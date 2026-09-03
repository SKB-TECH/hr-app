export type SkillCategory = {
  id: string;
  name: string;
};

export type SkillDirectoryEntry = {
  id: string;
  name: string;
  categoryId: string | null;
  category?: SkillCategory | null;
};

export type CandidateSkill = {
  id: string;
  skillId: string;
  name: string;
  categoryId: string | null;
};

export type AttachCandidateSkillsInput = {
  skillIds: string[];
};

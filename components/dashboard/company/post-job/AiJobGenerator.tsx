"use client";

import { useState } from "react";
import { CheckCircle2, Eye, FileText, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useGenerateJobDraft } from "@/core/hooks/ai/use-generate-job-draft";
import { ApiError } from "@/core/types/api";
import { usePlatformReferences } from "@/core/hooks/references/use-platform-references";
import { useSkillsDirectory } from "@/core/hooks/candidate/use-skills-directory";
import {
  DEFAULT_JOB_CATEGORIES,
  JOB_CATEGORY_CODES,
} from "@/core/constants/job-categories";
import type { JobData } from "./types";

type Props = {
  data: JobData;
  updateData: (values: Partial<JobData>) => void;
  companyName: string;
  industry?: string | null;
  saving: boolean;
  onGenerated: () => void;
  onReview: () => void;
  onManual: () => void;
  onSave: (status: "DRAFT" | "LIVE") => void;
};

export default function AiJobGenerator({ data, updateData, companyName, industry, saving, onGenerated, onReview, onManual, onSave }: Props) {
  const [brief, setBrief] = useState("");
  const [generated, setGenerated] = useState(false);
  const generate = useGenerateJobDraft();
  const { data: categories = [] } = usePlatformReferences("job_category");
  const { data: benefits = [] } = usePlatformReferences("benefit");
  const { data: skillDirectory = [] } = useSkillsDirectory("");
  const displayedCategories = categories.length
    ? categories
    : DEFAULT_JOB_CATEGORIES;

  const submit = () => {
    if (brief.trim().length < 20) return toast.error("Décrivez le poste en au moins 20 caractères");
    generate.mutate({
      brief: brief.trim(),
      company: { name: companyName, industry },
      existingDraft: { title: data.jobTitle || undefined, location: data.location || undefined, employmentTypes: data.employmentTypes, category: data.category || undefined, salary: { min: data.minSalary, max: data.maxSalary }, skills: data.skills, benefits: data.benefits },
    }, {
      onSuccess: (draft) => {
        const qualifications = [draft.minimumExperienceYears != null ? `${draft.minimumExperienceYears} années d’expérience minimum` : null, ...draft.education, ...draft.languages].filter(Boolean).join("\n");
        const categoryAliases: Record<string, string> = { development: "ENGINEERING" };
        const categoryText = `${draft.title} ${brief}`.toLowerCase();
        const inferredCategory =
          /dévelop|develop|engineer|frontend|front-end|backend|full.?stack|software|program/.test(categoryText)
            ? "ENGINEERING"
            : /informatique|technology|cloud|devops|data|cyber/.test(categoryText)
              ? "TECHNOLOGY"
              : /design|ux|ui|graph/.test(categoryText)
                ? "DESIGN"
                : /marketing|seo|communication/.test(categoryText)
                  ? "MARKETING"
                  : /vente|sales|commercial/.test(categoryText)
                    ? "SALES"
                    : /finance|comptab|audit/.test(categoryText)
                      ? "FINANCE"
                      : /ressources humaines|human resource|recrut/.test(categoryText)
                        ? "HUMAN_RESOURCE"
                        : "";
        const requestedCategory = draft.category
          ? categoryAliases[draft.category.toLowerCase()] || draft.category
          : inferredCategory;
        const generatedCategory = categories.find((item) =>
          [item.code, item.name].some((value) => value.toLowerCase() === requestedCategory.toLowerCase()),
        );
        const generatedSkills = draft.requiredSkills.flatMap((name) => {
          const match = skillDirectory.find((item) => item.name.toLowerCase() === name.toLowerCase());
          return [match?.name || name];
        });
        const generatedBenefits = draft.benefits.flatMap((benefit, index) => {
          const match = benefits.find((item) => item.name.toLowerCase() === benefit.title.toLowerCase());
          return [{ id: Date.now() + index, title: match?.name || benefit.title, description: match?.description || benefit.description, icon: match?.icon || benefit.icon }];
        });
        updateData({
          jobTitle: draft.title || data.jobTitle,
          location: draft.location || data.location,
          employmentTypes: draft.employmentTypes.length ? draft.employmentTypes : data.employmentTypes,
          category:
            generatedCategory?.code ||
            (JOB_CATEGORY_CODES.has(requestedCategory)
              ? requestedCategory
              : data.category),
          minSalary: draft.salary?.min ?? data.minSalary,
          maxSalary: draft.salary?.max ?? data.maxSalary,
          jobDescription: draft.summary || data.jobDescription || brief.trim(),
          responsibilities: draft.responsibilities.length
            ? draft.responsibilities.join("\n")
            : draft.summary || data.responsibilities || brief.trim(),
          skills: generatedSkills.length ? generatedSkills : data.skills,
          whoYouAre:
            qualifications || draft.summary || data.whoYouAre || brief.trim(),
          niceToHave: draft.niceToHaveSkills.length
            ? draft.niceToHaveSkills.join("\n")
            : data.niceToHave,
          benefits: generatedBenefits.length ? generatedBenefits : data.benefits,
        });
        setGenerated(true);
        onGenerated();
        toast.success("Tous les champs disponibles ont été générés");
      },
      onError: (error) => toast.error(error instanceof ApiError ? error.message : "La génération IA est indisponible"),
    });
  };

  return <section className="border border-brand bg-gradient-to-br from-[#f2efff] via-white to-white p-5 shadow-sm sm:p-7">
    <div className="flex items-start gap-3"><span className="grid size-11 shrink-0 place-items-center bg-brand text-white"><Sparkles size={20}/></span><div><p className="text-xs font-bold uppercase tracking-wider text-brand">Commencer avec l’IA</p><h2 className="mt-1 text-xl font-bold text-neutral-100">Créez toute l’offre en une seule génération</h2><p className="mt-1 text-sm text-neutral-60">Renseignez d’abord les éléments essentiels. L’IA complétera les informations, la description, les compétences et les avantages.</p></div></div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <label className="text-sm font-semibold text-neutral-100">Titre du poste<input value={data.jobTitle} onChange={(event) => updateData({ jobTitle: event.target.value })} placeholder="Ex. Senior Full-Stack Developer" className="mt-2 h-12 w-full border border-brand-light-neutral bg-white px-3 font-normal outline-none focus:border-brand"/></label>
      <label className="text-sm font-semibold text-neutral-100">Localisation<input value={data.location} onChange={(event) => updateData({ location: event.target.value })} placeholder="Ex. Kinshasa, RDC ou Remote" className="mt-2 h-12 w-full border border-brand-light-neutral bg-white px-3 font-normal outline-none focus:border-brand"/></label>
      <label className="text-sm font-semibold text-neutral-100">Type de contrat<select value={data.employmentTypes[0] || ""} onChange={(event) => updateData({ employmentTypes: event.target.value ? [event.target.value] : [] })} className="mt-2 h-12 w-full border border-brand-light-neutral bg-white px-3 font-normal outline-none focus:border-brand"><option value="">À déterminer par l’IA</option>{["Full-Time", "Part-Time", "Remote", "Internship", "Contract"].map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
      <label className="text-sm font-semibold text-neutral-100">Catégorie<select value={data.category} onChange={(event) => updateData({ category: event.target.value })} className="mt-2 h-12 w-full border border-brand-light-neutral bg-white px-3 font-normal outline-none focus:border-brand"><option value="">À déterminer par l’IA</option>{displayedCategories.map((category) => <option key={category.id} value={category.code}>{category.name}</option>)}</select></label>
    </div>
    <label className="mt-4 block text-sm font-semibold text-neutral-100">Besoin, niveau et contraintes<textarea value={brief} onChange={(event) => setBrief(event.target.value)} placeholder="Décrivez l’expérience, les technologies, le contrat, le salaire, les responsabilités, les langues et les avantages…" className="mt-2 min-h-32 w-full border border-brand-light-neutral bg-white p-3 font-normal outline-none focus:border-brand"/></label>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={onManual} className="h-12 border border-brand px-5 text-sm font-bold text-brand">Remplir manuellement</button><button type="button" disabled={generate.isPending} onClick={submit} className="flex h-12 items-center gap-2 bg-brand px-6 text-sm font-bold text-white disabled:opacity-50"><Sparkles size={17}/>{generate.isPending ? "Génération complète…" : generated ? "Régénérer l’offre" : "Générer toute l’offre"}</button></div>
    {generated && <div className="mt-6 border-t border-brand-light-neutral pt-5"><div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 size={18}/>L’offre complète est prête.</div><div className="flex flex-wrap gap-3"><button type="button" onClick={onReview} className="inline-flex h-11 items-center gap-2 border border-brand px-4 text-sm font-bold text-brand"><Eye size={16}/>Vérifier et modifier</button><button type="button" disabled={saving} onClick={() => onSave("DRAFT")} className="inline-flex h-11 items-center gap-2 border border-brand px-4 text-sm font-bold text-brand disabled:opacity-50"><FileText size={16}/>Enregistrer en brouillon</button><button type="button" disabled={saving} onClick={() => onSave("LIVE")} className="h-11 bg-brand px-5 text-sm font-bold text-white disabled:opacity-50">{saving ? "Publication…" : "Publier maintenant"}</button></div></div>}
  </section>;
}

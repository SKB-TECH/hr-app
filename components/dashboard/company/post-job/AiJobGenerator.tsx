"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useGenerateJobDraft } from "@/core/hooks/ai/use-generate-job-draft";
import { ApiError } from "@/core/types/api";
import type { JobData } from "./types";

export default function AiJobGenerator({ data, updateData, companyName, industry }: { data: JobData; updateData: (values: Partial<JobData>) => void; companyName: string; industry?: string | null }) {
  const [brief, setBrief] = useState("");
  const generate = useGenerateJobDraft();
  const submit = () => {
    if (brief.trim().length < 20) return toast.error("Décrivez le poste en au moins 20 caractères");
    generate.mutate({
      brief: brief.trim(), company: { name: companyName, industry },
      existingDraft: { title: data.jobTitle || undefined, location: data.location || undefined, employmentTypes: data.employmentTypes, category: data.category || undefined, salary: { min: data.minSalary, max: data.maxSalary }, skills: data.skills },
    }, { onSuccess: (draft) => {
      const qualifications = [draft.minimumExperienceYears != null ? `${draft.minimumExperienceYears} years minimum experience` : null, ...draft.education, ...draft.languages].filter(Boolean).join("\n");
      updateData({ jobTitle: draft.title, jobDescription: draft.summary, responsibilities: draft.responsibilities.join("\n"), skills: draft.requiredSkills, whoYouAre: qualifications, niceToHave: draft.niceToHaveSkills.join("\n") });
      toast.success("Brouillon IA généré — vérifiez chaque information");
    }, onError: (error) => toast.error(error instanceof ApiError ? error.message : "La génération IA est indisponible") });
  };
  return <section className="border border-brand-light-neutral bg-gradient-to-r from-[#f5f3ff] to-white p-5 sm:p-6"><div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center bg-brand text-white"><Sparkles size={19}/></span><div><h2 className="font-bold text-neutral-100">Générer le brouillon avec l’IA</h2><p className="mt-1 text-sm text-neutral-60">Décrivez le besoin, le contexte, le niveau attendu et les contraintes. Le résultat reste modifiable et doit être validé avant publication.</p></div></div><textarea value={brief} onChange={(event)=>setBrief(event.target.value)} placeholder="Exemple : Nous recrutons un développeur React senior à Kinshasa pour construire une plateforme RH, avec TypeScript, tests automatisés et mentorat de l’équipe…" className="mt-4 min-h-24 w-full border border-brand-light-neutral bg-white p-3 text-sm outline-none focus:border-brand"/><div className="mt-3 flex justify-end"><button type="button" disabled={generate.isPending} onClick={submit} className="flex h-11 items-center gap-2 bg-brand px-5 text-sm font-bold text-white disabled:opacity-50"><Sparkles size={16}/>{generate.isPending?"Génération…":"Générer les informations"}</button></div></section>;
}

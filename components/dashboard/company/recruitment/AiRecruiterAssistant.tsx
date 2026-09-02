"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAiCandidateSearch, useRecruiterWorkflow } from "@/core/hooks/ai/use-recruiter-assistant";

const suggestions = [
  "Classe les 5 meilleurs candidats et explique les écarts",
  "Prépare des questions d’entretien pour les meilleurs profils",
  "Compare les candidats les plus pertinents",
];

export default function AiRecruiterAssistant({ jobId }: { jobId: string }) {
  const [request, setRequest] = useState("");
  const [mode, setMode] = useState<"analysis" | "search">("analysis");
  const workflow = useRecruiterWorkflow(jobId);
  const search = useAiCandidateSearch(jobId);
  const pending = workflow.isPending || search.isPending;
  const result = mode === "analysis" ? workflow.data : search.data;

  async function submit() {
    const value = request.trim();
    if (value.length < 10) return toast.error("Décrivez votre demande en au moins 10 caractères.");
    try {
      if (mode === "analysis") await workflow.mutateAsync({ request: value, limit: 5 });
      else await search.mutateAsync({ request: value, limit: 10 });
    } catch {
      toast.error("L’assistant IA est indisponible pour le moment.");
    }
  }

  return <section className="border border-brand-light-neutral bg-white">
    <header className="flex items-start gap-3 border-b border-brand-light-neutral bg-gradient-to-r from-[#f3f0ff] to-white p-5 lg:p-6">
      <span className="grid size-10 shrink-0 place-items-center bg-brand text-white"><Sparkles size={19}/></span>
      <div><h2 className="font-bold text-neutral-100">Assistant recruteur IA</h2><p className="mt-1 text-sm text-neutral-60">Analyse et recherche consultatives. Vérifiez toujours les résultats avant toute décision.</p></div>
    </header>
    <div className="p-5 lg:p-6">
      <div className="mb-4 flex gap-2">{([ ["analysis", "Analyser les candidatures"], ["search", "Rechercher des profils"] ] as const).map(([key, label]) => <button key={key} type="button" onClick={() => setMode(key)} className={`px-4 py-2 text-sm font-semibold ${mode === key ? "bg-brand text-white" : "border border-brand-light-neutral text-neutral-60"}`}>{label}</button>)}</div>
      <textarea value={request} onChange={(event) => setRequest(event.target.value)} maxLength={2000} placeholder={mode === "analysis" ? "Ex. Classe les meilleurs candidats et prépare des questions d’entretien…" : "Ex. Trouve des développeurs React seniors à Kinshasa…"} className="min-h-24 w-full border border-brand-light-neutral p-3 text-sm outline-none focus:border-brand"/>
      <div className="mt-3 flex flex-wrap items-center gap-2">{mode === "analysis" && suggestions.map((item) => <button key={item} type="button" onClick={() => setRequest(item)} className="border border-brand-light-neutral px-3 py-2 text-left text-xs text-neutral-60 hover:border-brand hover:text-brand">{item}</button>)}<button type="button" onClick={() => void submit()} disabled={pending} className="ml-auto inline-flex h-11 items-center gap-2 bg-brand px-5 text-sm font-bold text-white disabled:opacity-50">{mode === "search" ? <Search size={16}/> : <Sparkles size={16}/>} {pending ? "Analyse en cours…" : "Lancer"}</button></div>
      {result && <ResultView result={result}/>} 
    </div>
  </section>;
}

function ResultView({ result }: { result: unknown }) {
  const value = result as { outputs?: Array<{ rank?: number; name?: string; matchScore?: number; eligible?: boolean; explanation?: unknown; questions?: unknown; outreach?: unknown; brief?: unknown }>; candidates?: Array<Record<string, unknown>>; criteria?: Record<string, unknown>; errors?: string[] };
  return <div className="mt-6 border-t border-brand-light-neutral pt-5">
    <div className="mb-4 flex items-center justify-between"><h3 className="font-bold">Résultats</h3><span className="bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">Validation humaine requise</span></div>
    {value.errors?.map((error) => <p key={error} className="mb-2 text-sm text-accent-red">{error}</p>)}
    {value.criteria && <div className="mb-4 bg-[#f8f8fc] p-4"><p className="mb-2 text-xs font-bold uppercase text-neutral-60">Critères compris par l’IA</p><Readable value={value.criteria}/></div>}
    <div className="space-y-3">{value.outputs?.map((candidate, index) => <article key={`${candidate.name}-${index}`} className="border border-brand-light-neutral p-4"><div className="flex flex-wrap items-center gap-3"><span className="grid size-8 place-items-center bg-accent-light-brand font-bold text-brand">#{candidate.rank ?? index + 1}</span><h4 className="mr-auto font-bold">{candidate.name || "Candidat"}</h4>{candidate.matchScore != null && <span className="font-bold text-brand">{Math.round(candidate.matchScore)}%</span>}<span className={`px-2 py-1 text-xs font-semibold ${candidate.eligible ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{candidate.eligible ? "Éligible" : "À vérifier"}</span></div><div className="mt-3 space-y-3 text-sm text-neutral-60"><Readable value={candidate.explanation}/><Readable value={candidate.questions}/><Readable value={candidate.outreach}/><Readable value={candidate.brief}/></div></article>)}
      {value.candidates?.map((candidate, index) => <article key={String(candidate.id ?? index)} className="border border-brand-light-neutral p-4"><Readable value={candidate}/></article>)}
    </div>
    {!value.outputs?.length && !value.candidates?.length && !value.errors?.length && <Readable value={result}/>} 
  </div>;
}

function Readable({ value }: { value: unknown }) {
  if (value == null) return null;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return <p className="whitespace-pre-wrap">{String(value)}</p>;
  if (Array.isArray(value)) return <ul className="list-disc space-y-1 pl-5">{value.map((item, index) => <li key={index}><Readable value={item}/></li>)}</ul>;
  return <dl className="grid gap-2 sm:grid-cols-2">{Object.entries(value as Record<string, unknown>).map(([key, item]) => <div key={key}><dt className="text-xs font-bold capitalize text-neutral-100">{key.replace(/([A-Z])/g, " $1")}</dt><dd className="mt-0.5"><Readable value={item}/></dd></div>)}</dl>;
}

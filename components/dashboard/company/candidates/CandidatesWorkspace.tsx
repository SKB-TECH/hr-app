"use client";

import Image from "next/image";
import { Eye, GripVertical, LayoutGrid, List, Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useCompanyApplications } from "@/core/hooks/applications/use-company-applications";
import { usePipelineStages } from "@/core/hooks/applications/use-pipeline-stages";
import { useUpdateApplicationStage } from "@/core/hooks/applications/use-update-application-stage";
import { mediaUrl } from "@/core/lib/media-url";
import { Link } from "@/i18n/routing";
import type { CompanyApplication, PipelineStage } from "@/core/types/application";

export default function CandidatesWorkspace() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"pipeline" | "table">("pipeline");
  const company = useMyCompany();
  const companyId = company.data?.id || "";
  const applications = useCompanyApplications(companyId, { search, limit: 100 });
  const stages = usePipelineStages(companyId);
  const updateStage = useUpdateApplicationStage("company-pipeline");
  if (company.isError || applications.isError || stages.isError) return <div className="py-20 text-center"><p className="font-bold">Impossible de charger les candidats.</p><button onClick={() => { void company.refetch(); void applications.refetch(); void stages.refetch(); }} className="mt-4 bg-brand px-5 py-2 text-white">Réessayer</button></div>;
  if (company.isPending || applications.isPending || stages.isPending) return <p className="py-20 text-center text-neutral-60">Chargement du vivier de talents…</p>;
  const rows = applications.data?.data ?? [];
  const orderedStages = [...(stages.data ?? [])].sort((a, b) => a.order - b.order);
  const pipelineRows = rows.map((row) => row.stageId || !orderedStages[0] ? row : { ...row, stageId: orderedStages[0].id });
  async function move(application: CompanyApplication, stage: PipelineStage) { if (application.stageId === stage.id) return; try { await updateStage.mutateAsync({ applicationId: application.id, stageId: stage.id }); toast.success(`${application.fullName} déplacé vers ${stage.name}`); } catch { toast.error("Impossible de déplacer cette candidature."); } }
  return <div className="w-full"><header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-bold text-neutral-100">Candidats</h1><p className="mt-1 text-sm text-neutral-60">Toutes les candidatures reçues par votre entreprise.</p></div><div className="flex flex-wrap gap-2"><div className="flex border border-brand-light-neutral"><button onClick={() => setView("pipeline")} className={`grid size-10 place-items-center ${view === "pipeline" ? "bg-brand text-white" : "text-neutral-60"}`} title="Pipeline"><LayoutGrid size={17}/></button><button onClick={() => setView("table")} className={`grid size-10 place-items-center ${view === "table" ? "bg-brand text-white" : "text-neutral-60"}`} title="Liste"><List size={17}/></button></div><label className="flex h-10 items-center gap-2 border border-brand-light-neutral px-3"><Search size={16}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher" className="w-64 max-w-full outline-none"/></label></div></header>
    {view === "pipeline" ? <CompanyPipeline rows={pipelineRows} stages={orderedStages} onMove={move}/> : <CandidateTable rows={rows}/>} </div>;
}

function CompanyPipeline({ rows, stages, onMove }: { rows: CompanyApplication[]; stages: PipelineStage[]; onMove: (application: CompanyApplication, stage: PipelineStage) => Promise<void> }) {
  const [over, setOver] = useState<string | null>(null);
  return <section className="mt-7 overflow-x-auto"><p className="mb-3 text-xs text-neutral-60">Glissez une carte candidat vers une autre étape du recrutement.</p><div className="grid min-w-[1000px] gap-3" style={{ gridTemplateColumns: `repeat(${Math.max(stages.length, 1)}, minmax(230px, 1fr))` }}>{stages.map((stage) => { const candidates = rows.filter((row) => row.stageId === stage.id); return <div key={stage.id} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; setOver(stage.id); }} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOver(null); }} onDrop={(event) => { event.preventDefault(); const id = event.dataTransfer.getData("application/id"); const application = rows.find((row) => row.id === id); setOver(null); if (application) void onMove(application, stage); }} className={`min-h-[520px] border-2 p-3 transition-colors ${over === stage.id ? "border-brand bg-accent-light-brand" : "border-transparent bg-[#f8f8fb]"}`}><div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-bold text-brand">{stage.name}</h2><span className="grid size-7 place-items-center rounded-full bg-white text-xs font-bold text-neutral-60">{candidates.length}</span></div><div className="space-y-3">{candidates.map((row) => <CandidateCard key={row.id} row={row}/>)}</div></div>; })}</div></section>;
}

function CandidateCard({ row }: { row: CompanyApplication }) {
  const avatar = row.candidate?.avatar ? mediaUrl(row.candidate.avatar) : null;
  return <article draggable onDragStart={(event) => { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("application/id", row.id); }} className="cursor-grab border border-brand-light-neutral bg-white p-4 shadow-sm active:cursor-grabbing active:opacity-60"><div className="flex items-start gap-3"><GripVertical size={17} className="mt-2 shrink-0 text-neutral-40"/>{avatar ? <Image src={avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover"/> : <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-light-brand font-bold text-brand">{row.fullName.slice(0, 1)}</span>}<div className="min-w-0"><p className="truncate text-sm font-bold">{row.fullName}</p><p className="truncate text-xs text-neutral-60">{row.currentJobTitle || "Candidat"}</p></div></div><p className="mt-3 truncate text-xs text-neutral-60">{row.job?.title || "Poste"}</p><Link href={`/company/applicants/${row.id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand"><Eye size={14}/>Voir le candidat</Link></article>;
}

function CandidateTable({ rows }: { rows: CompanyApplication[] }) {
  return <section className="mt-7 overflow-x-auto border border-brand-light-neutral"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-[#fafaff] text-xs uppercase text-neutral-60"><tr><th className="px-5 py-4">Candidat</th><th>Contact</th><th>Poste</th><th>Étape</th><th>Date</th><th className="px-5 text-right">ATS</th></tr></thead><tbody>{rows.map((row) => { const avatar = row.candidate?.avatar ? mediaUrl(row.candidate.avatar) : null; return <tr key={row.id} className="border-t border-brand-light-neutral"><td className="px-5 py-3"><div className="flex items-center gap-3">{avatar ? <Image src={avatar} alt="" width={36} height={36} className="size-9 rounded-full object-cover"/> : <span className="grid size-9 place-items-center rounded-full bg-accent-light-brand font-bold text-brand">{row.fullName.slice(0,1)}</span>}<div><b>{row.fullName}</b><p className="text-xs text-neutral-60">{row.currentJobTitle || "Candidat"}</p></div></div></td><td><p>{row.email}</p><p className="text-xs text-neutral-60">{row.phone || "—"}</p></td><td>{row.job?.title || "—"}</td><td><span className="bg-accent-light-brand px-2 py-1 text-xs font-semibold text-brand">{row.stage?.name || "Non assignée"}</span></td><td>{new Date(row.appliedAt).toLocaleDateString()}</td><td className="px-5 text-right"><Link href={`/company/applicants/${row.id}`} className="inline-flex items-center gap-2 font-semibold text-brand"><Eye size={15}/>Ouvrir</Link></td></tr>; })}{rows.length === 0 && <tr><td colSpan={6} className="py-16 text-center text-neutral-60">Aucune candidature reçue.</td></tr>}</tbody></table></section>;
}

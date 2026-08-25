"use client";

import Image from "next/image";
import { Eye, Search } from "lucide-react";
import { useState } from "react";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useCompanyApplications } from "@/core/hooks/applications/use-company-applications";
import { mediaUrl } from "@/core/lib/media-url";
import { Link } from "@/i18n/routing";

export default function CandidatesWorkspace() {
  const [search, setSearch] = useState("");
  const company = useMyCompany();
  const applications = useCompanyApplications(company.data?.id || "", { search, limit: 100 });
  if (company.isError || applications.isError) return <div className="py-20 text-center"><p className="font-bold">Impossible de charger les candidats.</p><button onClick={() => { void company.refetch(); void applications.refetch(); }} className="mt-4 bg-brand px-5 py-2 text-white">Réessayer</button></div>;
  if (company.isPending || applications.isPending) return <p className="py-20 text-center text-neutral-60">Chargement du vivier de talents…</p>;
  const rows = applications.data?.data ?? [];
  return <div className="w-full"><header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-bold text-neutral-100">Candidats</h1><p className="mt-1 text-sm text-neutral-60">Toutes les candidatures reçues par votre entreprise.</p></div><label className="flex h-10 items-center gap-2 border border-brand-light-neutral px-3"><Search size={16}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher" className="w-64 max-w-full outline-none"/></label></header><section className="mt-7 overflow-x-auto border border-brand-light-neutral"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-[#fafaff] text-xs uppercase text-neutral-60"><tr><th className="px-5 py-4">Candidat</th><th>Contact</th><th>Poste</th><th>Étape</th><th>Date</th><th className="px-5 text-right">ATS</th></tr></thead><tbody>{rows.map((row) => { const avatar = mediaUrl(row.candidate?.avatar); return <tr key={row.id} className="border-t border-brand-light-neutral"><td className="px-5 py-3"><div className="flex items-center gap-3">{avatar ? <Image src={avatar} alt="" width={36} height={36} className="size-9 rounded-full object-cover"/> : <span className="grid size-9 place-items-center rounded-full bg-accent-light-brand font-bold text-brand">{row.fullName.slice(0,1)}</span>}<div><b>{row.fullName}</b><p className="text-xs text-neutral-60">{row.currentJobTitle || "Candidat"}</p></div></div></td><td><p>{row.email}</p><p className="text-xs text-neutral-60">{row.phone || "—"}</p></td><td>{row.job?.title || "—"}</td><td><span className="bg-accent-light-brand px-2 py-1 text-xs font-semibold text-brand">{row.stage?.name || "Non assignée"}</span></td><td>{new Date(row.appliedAt).toLocaleDateString()}</td><td className="px-5 text-right"><Link href={`/company/job-listing/${row.jobId}`} className="inline-flex items-center gap-2 font-semibold text-brand"><Eye size={15}/>Ouvrir</Link></td></tr>; })}{rows.length === 0 && <tr><td colSpan={6} className="py-16 text-center text-neutral-60">Aucune candidature reçue.</td></tr>}</tbody></table></section></div>;
}

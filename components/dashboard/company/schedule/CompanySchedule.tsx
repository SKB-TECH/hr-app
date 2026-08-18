"use client";

import { CalendarDays, Clock3, MapPin, Video } from "lucide-react";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useCompanyInterviews } from "@/core/hooks/interviews/use-company-interviews";

export default function CompanySchedule() {
  const company = useMyCompany();
  const interviews = useCompanyInterviews(company.data?.id || "");
  if (company.isPending || interviews.isPending) return <p className="py-20 text-center text-neutral-60">Chargement du calendrier…</p>;
  if (company.isError || interviews.isError) return <div className="py-20 text-center"><p className="font-bold">Impossible de charger le calendrier.</p><button onClick={() => { void company.refetch(); void interviews.refetch(); }} className="mt-4 bg-brand px-5 py-2 text-white">Réessayer</button></div>;
  const rows = [...(interviews.data ?? [])].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  return <main className="h-full overflow-y-auto bg-white px-4 py-6 lg:px-8"><header><h1 className="text-2xl font-bold">Calendrier des entretiens</h1><p className="mt-1 text-sm text-neutral-60">Tous les entretiens planifiés par votre équipe.</p></header><section className="mt-7 border border-brand-light-neutral"><div className="grid grid-cols-[110px_1fr] border-b bg-[#fafaff] px-5 py-3 text-xs font-bold uppercase text-neutral-60"><span>Date</span><span>Entretien</span></div>{rows.map((item) => { const date = new Date(item.scheduledAt); return <article key={item.id} className="grid grid-cols-[110px_1fr] gap-4 border-b border-brand-light-neutral px-5 py-5 last:border-0"><div><b className="block text-brand">{date.toLocaleDateString(undefined, { day: "2-digit", month: "short" })}</b><span className="text-xs text-neutral-60">{date.toLocaleDateString(undefined, { year: "numeric" })}</span></div><div><h2 className="font-bold">{item.title}</h2><p className="mt-1 text-sm text-neutral-60">{item.application?.fullName || "Candidat"} · {item.application?.job?.title || "Poste"}</p><div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-60"><span className="flex items-center gap-1"><Clock3 size={14}/>{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span><span className="flex items-center gap-1"><MapPin size={14}/>{item.location || "En ligne"}</span><span className="flex items-center gap-1"><Video size={14}/>{item.status}</span></div></div></article>; })}{rows.length === 0 && <div className="py-20 text-center text-neutral-60"><CalendarDays className="mx-auto mb-3"/><p>Aucun entretien planifié.</p><p className="mt-1 text-xs">Planifiez un entretien depuis l’ATS d’une offre.</p></div>}</section></main>;
}

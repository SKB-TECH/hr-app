"use client";

import Image from "next/image";
import { BriefcaseBusiness, Building2, MapPin, Search, SlidersHorizontal, UserRound, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { globalSearch, type GlobalSearchType } from "@/core/services/search/global-search.service";
import { mediaUrl } from "@/core/lib/media-url";

const filters: Array<{ value: GlobalSearchType; label: string }> = [
  { value: "all", label: "Tout" }, { value: "people", label: "Personnes" },
  { value: "jobs", label: "Offres" }, { value: "companies", label: "Entreprises" },
];

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<GlobalSearchType>("all");
  const [location, setLocation] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const term = query.trim();
  const results = useQuery({ queryKey: ["global-search", term, type, location.trim()], queryFn: () => globalSearch(term, { type, location }), enabled: term.length >= 2, staleTime: 30_000 });
  const total = (results.data?.jobs.length ?? 0) + (results.data?.companies.length ?? 0) + (results.data?.candidates.length ?? 0);
  const close = () => setQuery("");

  return <div className="relative hidden w-full max-w-xl md:block">
    <label className="flex h-11 items-center gap-2 border border-brand-light-neutral bg-[#fafaff] px-3"><Search size={18} className="text-neutral-60"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher des personnes, offres, entreprises…" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/><button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-label="Filtrer la recherche" className={filtersOpen || type !== "all" || location ? "text-brand" : "text-neutral-60"}><SlidersHorizontal size={17}/></button>{query && <button type="button" onClick={close} aria-label="Effacer"><X size={16}/></button>}</label>
    {filtersOpen && <div className="absolute inset-x-0 top-full z-[90] mt-2 border border-brand-light-neutral bg-white p-4 shadow-2xl"><p className="text-xs font-bold uppercase tracking-wide text-neutral-60">Type de résultat</p><div className="mt-3 flex flex-wrap gap-2">{filters.map((filter) => <button key={filter.value} type="button" onClick={() => setType(filter.value)} className={`border px-3 py-2 text-xs font-bold ${type === filter.value ? "border-brand bg-brand text-white" : "border-brand-light-neutral"}`}>{filter.label}</button>)}</div><label className="mt-4 flex h-10 items-center gap-2 border border-brand-light-neutral px-3"><MapPin size={16} className="text-neutral-60"/><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Ville ou pays" className="min-w-0 flex-1 text-sm outline-none"/>{location && <button type="button" onClick={() => setLocation("")}><X size={14}/></button>}</label><button type="button" onClick={() => setFiltersOpen(false)} className="mt-4 h-10 w-full bg-brand text-xs font-bold text-white">Afficher les résultats</button></div>}
    {term.length >= 2 && !filtersOpen && <div className="absolute inset-x-0 top-full z-[80] mt-2 max-h-[70vh] overflow-y-auto border border-brand-light-neutral bg-white p-2 shadow-2xl"><div className="flex items-center justify-between px-3 py-2"><span className="text-xs text-neutral-60">{filters.find((filter) => filter.value === type)?.label}{location ? ` · ${location}` : ""}</span><button type="button" onClick={() => setFiltersOpen(true)} className="text-xs font-bold text-brand">Modifier les filtres</button></div>{results.isPending && <p className="p-4 text-sm text-neutral-60">Recherche…</p>}{!results.isPending && total === 0 && <p className="p-4 text-sm text-neutral-60">Aucun résultat.</p>}<Group title="Offres" icon={<BriefcaseBusiness size={15}/>} items={results.data?.jobs.map((item) => ({ id: item.id, href: `/jobs/${item.id}`, title: item.title, subtitle: [item.companyName, item.location].filter(Boolean).join(" · "), image: item.companyLogo })) || []} close={close}/><Group title="Entreprises" icon={<Building2 size={15}/>} items={results.data?.companies.map((item) => ({ id: item.id, href: `/companies/${item.id}`, title: item.name, subtitle: [item.industry, item.location].filter(Boolean).join(" · "), image: item.logo })) || []} close={close}/><Group title="Personnes" icon={<UserRound size={15}/>} items={results.data?.candidates.map((item) => ({ id: item.id, href: `/candidates/${item.id}`, title: item.fullName, subtitle: item.profession || item.headline || [item.cityName, item.countryName].filter(Boolean).join(", "), image: item.avatar })) || []} close={close}/></div>}
  </div>;
}

function Group({ title, icon, items, close }: { title: string; icon: React.ReactNode; items: Array<{ id: string; href: string; title: string; subtitle: string; image: string | null }>; close: () => void }) {
  if (!items.length) return null;
  return <section className="py-1"><h3 className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-60">{icon}{title}</h3>{items.map((item) => <Link key={item.id} href={item.href as never} onClick={close} className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent-light-brand">{item.image ? <Image src={mediaUrl(item.image)} alt="" width={44} height={44} className="size-11 rounded-full object-cover"/> : <span className="grid size-11 place-items-center rounded-full bg-[#f1f1f7]">{icon}</span>}<span className="min-w-0"><b className="block truncate text-sm">{item.title}</b><small className="block truncate text-neutral-60">{item.subtitle}</small>{title === "Personnes" && <small className="mt-0.5 block font-semibold text-brand">Voir le profil public</small>}</span></Link>)}</section>;
}

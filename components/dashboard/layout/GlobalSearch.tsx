"use client";

import Image from "next/image";
import { Search, BriefcaseBusiness, Building2, UserRound, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { globalSearch } from "@/core/services/search/global-search.service";
import { mediaUrl } from "@/core/lib/media-url";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const term = query.trim();
  const results = useQuery({ queryKey: ["global-search", term], queryFn: () => globalSearch(term), enabled: term.length >= 2, staleTime: 30_000 });
  const total = (results.data?.jobs.length ?? 0) + (results.data?.companies.length ?? 0) + (results.data?.candidates.length ?? 0);
  const close = () => setQuery("");

  return <div className="relative hidden w-full max-w-md md:block"><label className="flex h-11 items-center gap-2 border border-brand-light-neutral bg-[#fafaff] px-3"><Search size={18} className="text-neutral-60"/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Rechercher offres, entreprises, candidats…" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/>{query&&<button type="button" onClick={close}><X size={16}/></button>}</label>{term.length>=2&&<div className="absolute inset-x-0 top-full z-[80] mt-2 max-h-[70vh] overflow-y-auto border border-brand-light-neutral bg-white p-2 shadow-2xl">{results.isPending&&<p className="p-4 text-sm text-neutral-60">Recherche…</p>}{!results.isPending&&total===0&&<p className="p-4 text-sm text-neutral-60">Aucun résultat.</p>}<Group title="Offres" icon={<BriefcaseBusiness size={15}/>} items={results.data?.jobs.map(item=>({id:item.id,href:`/jobs/${item.id}` as const,title:item.title,subtitle:[item.companyName,item.location].filter(Boolean).join(" · "),image:item.companyLogo}))||[]} close={close}/><Group title="Entreprises" icon={<Building2 size={15}/>} items={results.data?.companies.map(item=>({id:item.id,href:`/companies/${item.id}` as const,title:item.name,subtitle:[item.industry,item.location].filter(Boolean).join(" · "),image:item.logo}))||[]} close={close}/><Group title="Candidats" icon={<UserRound size={15}/>} items={results.data?.candidates.map(item=>({id:item.id,href:`/candidates/${item.id}` as const,title:item.fullName,subtitle:item.profession||item.headline||[item.cityName,item.countryName].filter(Boolean).join(", "),image:item.avatar}))||[]} close={close}/></div>}</div>;
}

function Group({title,icon,items,close}:{title:string;icon:React.ReactNode;items:Array<{id:string;href:string;title:string;subtitle:string;image:string|null}>;close:()=>void}) { if(!items.length)return null; return <section className="py-1"><h3 className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-60">{icon}{title}</h3>{items.map(item=><Link key={item.id} href={item.href as never} onClick={close} className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent-light-brand">{item.image?<Image src={mediaUrl(item.image)} alt="" width={36} height={36} className="size-9 rounded-full object-cover"/>:<span className="grid size-9 place-items-center rounded-full bg-[#f1f1f7]">{icon}</span>}<span className="min-w-0"><b className="block truncate text-sm">{item.title}</b><small className="block truncate text-neutral-60">{item.subtitle}</small></span></Link>)}</section> }

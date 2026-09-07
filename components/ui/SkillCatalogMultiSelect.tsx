"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useSkillsDirectory } from "@/core/hooks/candidate/use-skills-directory";

export default function SkillCatalogMultiSelect({values,onChange,placeholder="Rechercher une technologie"}:{values:string[];onChange:(values:string[])=>void;placeholder?:string}){
 const [search,setSearch]=useState(""); const {data:skills=[],isLoading}=useSkillsDirectory(search);
 return <div><label className="flex h-12 items-center gap-2 border border-brand-light-neutral px-3"><Search size={17}/><input value={search} onChange={event=>setSearch(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 outline-none"/></label>{search&&<div className="max-h-52 overflow-y-auto border-x border-b bg-white">{skills.filter(item=>!values.includes(item.name)).map(item=><button key={item.id} type="button" onClick={()=>{onChange([...values,item.name]);setSearch("")}} className="flex w-full justify-between px-3 py-2 text-left text-sm hover:bg-accent-light-brand"><span>{item.name}</span><small className="text-neutral-60">{item.category?.name}</small></button>)}{!isLoading&&!skills.length&&<p className="p-3 text-sm text-neutral-60">Aucune technologie trouvée.</p>}</div>}<div className="mt-3 flex flex-wrap gap-2">{values.map(value=><span key={value} className="inline-flex items-center gap-2 bg-accent-light-brand px-3 py-2 text-sm font-semibold text-brand">{value}<button type="button" onClick={()=>onChange(values.filter(item=>item!==value))}><X size={14}/></button></span>)}</div></div>;
}

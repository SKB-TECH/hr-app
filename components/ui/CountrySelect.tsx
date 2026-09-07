"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCountries } from "@/core/hooks/localization/use-countries";

export default function CountrySelect({id,value,onChange,placeholder="Sélectionner un pays",className=""}:{id?:string;value:string;onChange:(name:string)=>void;placeholder?:string;className?:string}){
 const [open,setOpen]=useState(false),[search,setSearch]=useState("");
 const {data:countries=[],isLoading}=useCountries();
 const selected=countries.find(country=>country.name===value);
 const filtered=useMemo(()=>{const q=search.trim().toLocaleLowerCase();return q?countries.filter(country=>`${country.name} ${country.code}`.toLocaleLowerCase().includes(q)):countries},[countries,search]);
 return <Popover open={open} onOpenChange={next=>{setOpen(next);if(!next)setSearch("")}}><PopoverTrigger asChild><button id={id} type="button" aria-haspopup="listbox" aria-expanded={open} className={`flex h-12 w-full items-center gap-3 border border-gray-300 bg-white px-4 text-left outline-none transition hover:border-brand focus:border-brand ${className}`}>{selected?<><ReactCountryFlag countryCode={selected.code} svg className="text-xl" aria-label={selected.name}/><span className="min-w-0 flex-1 truncate">{selected.name}</span><span className="text-xs uppercase text-neutral-60">{selected.code}</span></>:<span className="flex-1 text-neutral-60">{isLoading?"Chargement des pays…":placeholder}</span>}<ChevronDown size={17} className="shrink-0 text-neutral-60"/></button></PopoverTrigger><PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] min-w-72 rounded-none border border-brand-light-neutral bg-white p-0 shadow-xl"><div className="flex items-center gap-2 border-b border-brand-light-neutral px-3"><Search size={17} className="text-neutral-60"/><input autoFocus value={search} onChange={event=>setSearch(event.target.value)} placeholder="Rechercher un pays ou un code" className="h-11 min-w-0 flex-1 outline-none"/></div><div role="listbox" className="max-h-72 overflow-y-auto p-1">{filtered.map(country=><button key={country.code} type="button" role="option" aria-selected={country.name===value} onClick={()=>{onChange(country.name);setOpen(false);setSearch("")}} className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-accent-light-brand"><ReactCountryFlag countryCode={country.code} svg className="text-xl" aria-label={country.name}/><span className="flex-1">{country.name}</span><span className="text-xs uppercase text-neutral-60">{country.code}</span>{country.name===value&&<Check size={16} className="text-brand"/>}</button>)}{!isLoading&&!filtered.length&&<p className="p-5 text-center text-sm text-neutral-60">Aucun pays trouvé.</p>}</div></PopoverContent></Popover>;
}

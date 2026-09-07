"use client";

import { Check, ChevronDown, Languages, Search } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePlatformReferences } from "@/core/hooks/references/use-platform-references";

const FLAGS:Record<string,string>={fr:"FR",en:"GB",ln:"CD",sw:"TZ",kg:"CD",lua:"CD",rw:"RW",af:"ZA",sq:"AL",de:"DE",am:"ET",ar:"SA",hy:"AM",az:"AZ",bm:"ML",be:"BY",my:"MM",bs:"BA",bg:"BG",ca:"ES",zh:"CN",ko:"KR",hr:"HR",da:"DK",es:"ES",et:"EE",fi:"FI",ka:"GE"};
function LanguageFlag({code,name}:{code:string;name:string}){return FLAGS[code.toLowerCase()]?<ReactCountryFlag countryCode={FLAGS[code.toLowerCase()]} svg className="text-xl" aria-label={name}/>:<Languages size={19} className="text-brand"/>}
export default function LanguageSelect({id,value,onChange,placeholder="Sélectionner une langue"}:{id?:string;value:string;onChange:(code:string)=>void;placeholder?:string}){
 const [open,setOpen]=useState(false),[search,setSearch]=useState("");
 const {data:languages=[],isLoading}=usePlatformReferences("language",search);
 const selected=useMemo(()=>languages.find(language=>language.code.toLowerCase()===value.toLowerCase()),[languages,value]);
 return <Popover open={open} onOpenChange={next=>{setOpen(next);if(!next)setSearch("")}}><PopoverTrigger asChild><button id={id} type="button" className="flex h-12 w-full items-center gap-3 border border-gray-300 bg-white px-4 text-left outline-none hover:border-brand focus:border-brand">{selected?<><LanguageFlag code={selected.code} name={selected.name}/><span className="flex-1 truncate">{selected.name}</span><span className="text-xs uppercase text-neutral-60">{selected.code}</span></>:<span className="flex-1 text-neutral-60">{isLoading?"Chargement des langues…":placeholder}</span>}<ChevronDown size={17}/></button></PopoverTrigger><PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] min-w-72 rounded-none bg-white p-0 shadow-xl"><div className="flex items-center gap-2 border-b px-3"><Search size={17}/><input autoFocus value={search} onChange={event=>setSearch(event.target.value)} placeholder="Rechercher une langue" className="h-11 flex-1 outline-none"/></div><div className="max-h-72 overflow-y-auto p-1">{languages.map(language=><button key={language.id} type="button" onClick={()=>{onChange(language.code);setOpen(false);setSearch("")}} className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-accent-light-brand"><LanguageFlag code={language.code} name={language.name}/><span className="flex-1">{language.name}</span><span className="text-xs uppercase text-neutral-60">{language.code}</span>{language.code.toLowerCase()===value.toLowerCase()&&<Check size={16} className="text-brand"/>}</button>)}</div></PopoverContent></Popover>;
}

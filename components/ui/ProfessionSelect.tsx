"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useProfessions } from "@/core/hooks/references/use-professions";

export default function ProfessionSelect({ value, onChange, placeholder = "Sélectionner une profession" }: { value: string; onChange: (id: string) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: professions = [], isLoading } = useProfessions();
  const selected = professions.find((item) => item.id === value);
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return query ? professions.filter((item) => `${item.name} ${item.category ?? ""}`.toLocaleLowerCase().includes(query)) : professions;
  }, [professions, search]);

  return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><button type="button" className="flex h-14 w-full items-center gap-3 border border-gray-300 bg-white px-4 text-left"><span className={`min-w-0 flex-1 truncate ${selected ? "text-slate-900" : "text-slate-400"}`}>{selected?.name ?? (isLoading ? "Chargement…" : placeholder)}</span><ChevronDown size={17}/></button></PopoverTrigger><PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] min-w-80 rounded-none p-0"><div className="flex items-center gap-2 border-b px-3"><Search size={17}/><input autoFocus value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Rechercher une profession" className="h-11 min-w-0 flex-1 outline-none"/></div><div className="max-h-72 overflow-y-auto p-1">{filtered.map((item)=><button key={item.id} type="button" onClick={()=>{onChange(item.id);setOpen(false);setSearch("")}} className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-accent-light-brand"><span className="flex-1"><b className="block text-sm">{item.name}</b>{item.category&&<small className="text-neutral-60">{item.category}</small>}</span>{item.id===value&&<Check size={16} className="text-brand"/>}</button>)}</div></PopoverContent></Popover>;
}

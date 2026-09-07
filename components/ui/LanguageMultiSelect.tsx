"use client";
import { X } from "lucide-react";
import { usePlatformReferences } from "@/core/hooks/references/use-platform-references";
import LanguageSelect from "./LanguageSelect";

export default function LanguageMultiSelect({values,onChange}:{values:string[];onChange:(values:string[])=>void}){
 const {data:languages=[]}=usePlatformReferences("language");
 return <div><LanguageSelect value="" onChange={code=>{if(!values.includes(code))onChange([...values,code])}} placeholder="Ajouter une langue"/><div className="mt-3 flex flex-wrap gap-2">{values.map(code=>{const language=languages.find(item=>item.code.toLowerCase()===code.toLowerCase());return <span key={code} className="inline-flex items-center gap-2 bg-accent-light-brand px-3 py-2 text-sm font-semibold text-brand">{language?.name||code.toUpperCase()}<button type="button" onClick={()=>onChange(values.filter(value=>value!==code))} aria-label={`Retirer ${language?.name||code}`}><X size={14}/></button></span>})}</div></div>;
}

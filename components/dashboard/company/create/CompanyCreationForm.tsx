"use client";
import { FormEvent, useState } from "react";
import { Building2, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateCompany } from "@/core/hooks/company/use-create-company";
import { updateCompanyBranding } from "@/core/services/company/update-company-branding.service";
import { useRouter } from "@/i18n/routing";
import type { CompanyVisibility } from "@/core/types/company";
import { useQueryClient } from "@tanstack/react-query";
import { companyKeys } from "@/core/hooks/company/company-query-keys";

const sizes = ["1-10 employees", "11-50 employees", "51-100 employees", "101-250 employees", "251-500 employees", "500+ employees"];

export default function CompanyCreationForm() {
  const create = useCreateCompany();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", industry: "", location: "", companySize: "", foundationDate: "", website: "", description: "", visibility: "public" as CompanyVisibility });
  const [logo, setLogo] = useState<File>();
  const [cover, setCover] = useState<File>();
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const company = await create.mutateAsync({
        name: form.name.trim(), industry: form.industry.trim() || null, location: form.location.trim() || null,
        locations: form.location.trim() ? [form.location.trim()] : [], companySize: form.companySize || null,
        foundationDate: form.foundationDate ? new Date(form.foundationDate).toISOString() : null,
        website: form.website.trim() || null, description: form.description.trim() || null, visibility: form.visibility,
      });
      if (logo || cover) {
        const branded = await updateCompanyBranding(company.id, { logoFile: logo, coverFile: cover });
        queryClient.setQueryData(companyKeys.mine, branded);
      }
      await queryClient.invalidateQueries({ queryKey: companyKeys.mineList });
      toast.success("Entreprise créée avec succès");
      router.replace("/company");
    } catch { toast.error("Impossible de créer l’entreprise"); }
  };
  return <main className="h-full overflow-y-auto bg-[#f8f8fc] p-4 sm:p-6 lg:p-8"><form onSubmit={submit} className="mx-auto max-w-5xl border border-brand-light-neutral bg-white">
    <header className="border-b border-brand-light-neutral p-6 sm:p-8"><span className="grid size-12 place-items-center bg-accent-light-brand text-brand"><Building2/></span><h1 className="mt-4 text-2xl font-bold text-neutral-100">Créer une nouvelle entreprise</h1><p className="mt-2 text-sm text-neutral-60">Renseignez les informations qui seront utilisées sur le profil public et dans vos recrutements.</p></header>
    <div className="space-y-8 p-6 sm:p-8"><Section title="Identité de l’entreprise"><div className="grid gap-5 md:grid-cols-2"><Field required label="Nom officiel" value={form.name} onChange={(v)=>set("name",v)} placeholder="Infinity Innovation"/><Field required label="Secteur d’activité" value={form.industry} onChange={(v)=>set("industry",v)} placeholder="Technologie, Finance, Santé…"/><Field required label="Localisation principale" value={form.location} onChange={(v)=>set("location",v)} placeholder="Kinshasa, RDC"/><Select required label="Taille de l’entreprise" value={form.companySize} onChange={(v)=>set("companySize",v)} options={sizes}/><Field label="Date de fondation" type="date" value={form.foundationDate} onChange={(v)=>set("foundationDate",v)}/><Field label="Site web" type="url" value={form.website} onChange={(v)=>set("website",v)} placeholder="https://entreprise.com"/></div><label className="mt-5 block text-sm font-bold">Description<textarea required maxLength={2000} value={form.description} onChange={(e)=>set("description",e.target.value)} className="mt-2 min-h-32 w-full border border-brand-light-neutral p-3 font-normal outline-none focus:border-brand" placeholder="Présentez l’entreprise, sa mission et ses activités."/></label></Section>
    <Section title="Identité visuelle"><div className="grid gap-5 md:grid-cols-2"><Upload label="Logo" hint="PNG, JPG ou WebP — carré recommandé" file={logo} onChange={setLogo}/><Upload label="Image de couverture" hint="Format horizontal recommandé" file={cover} onChange={setCover}/></div></Section>
    <Section title="Visibilité"><Select label="Qui peut voir cette entreprise ?" value={form.visibility} onChange={(v)=>set("visibility",v)} options={["public","authenticated","verified_candidates","private"]}/></Section></div>
    <footer className="flex justify-end gap-3 border-t border-brand-light-neutral p-6 sm:px-8"><button type="button" onClick={()=>router.back()} className="h-11 border border-brand-light-neutral px-6 text-sm font-bold">Annuler</button><button disabled={create.isPending} className="h-11 bg-brand px-7 text-sm font-bold text-white disabled:opacity-50">{create.isPending?"Création…":"Créer l’entreprise"}</button></footer>
  </form></main>;
}

function Section({title,children}:{title:string;children:React.ReactNode}){return <section><h2 className="mb-5 border-b border-brand-light-neutral pb-3 text-lg font-bold">{title}</h2>{children}</section>}
function Field({label,value,onChange,type="text",placeholder,required}:{label:string;value:string;onChange:(v:string)=>void;type?:string;placeholder?:string;required?:boolean}){return <label className="block text-sm font-bold">{label}<input required={required} type={type} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="mt-2 h-12 w-full border border-brand-light-neutral px-3 font-normal outline-none focus:border-brand"/></label>}
function Select({label,value,onChange,options,required}:{label:string;value:string;onChange:(v:string)=>void;options:string[];required?:boolean}){return <label className="block text-sm font-bold">{label}<select required={required} value={value} onChange={(e)=>onChange(e.target.value)} className="mt-2 h-12 w-full border border-brand-light-neutral bg-white px-3 font-normal outline-none focus:border-brand"><option value="">Sélectionner</option>{options.map((option)=><option key={option} value={option}>{option.replaceAll("_"," ")}</option>)}</select></label>}
function Upload({label,hint,file,onChange}:{label:string;hint:string;file?:File;onChange:(file?:File)=>void}){return <label className="flex min-h-28 cursor-pointer items-center gap-4 border border-dashed border-brand-light-neutral p-4 hover:border-brand"><span className="grid size-10 shrink-0 place-items-center bg-accent-light-brand text-brand"><ImagePlus size={19}/></span><span className="min-w-0"><b className="block text-sm">{label}</b><small className="block truncate text-neutral-60">{file?.name||hint}</small></span><input hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={(e)=>onChange(e.target.files?.[0])}/></label>}

"use client";
import { FormEvent, useState } from "react";
import { Building2, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateCompany } from "@/core/hooks/company/use-update-company";
import { updateCompanyBranding } from "@/core/services/company/update-company-branding.service";
import { companyKeys } from "@/core/hooks/company/company-query-keys";
import type { Company, CompanyVisibility } from "@/core/types/company";

const sizes = ["1-10 employees", "11-50 employees", "51-100 employees", "101-250 employees", "251-500 employees", "500+ employees"];

export default function CompanyProfileEditor({ company }: { company: Company }) {
  const update = useUpdateCompany(company.id);
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: company.name, industry: company.industry || "", location: company.location || "", companySize: company.companySize || "",
    foundationDate: company.foundationDate?.slice(0, 10) || "", website: company.website || "", description: company.description || "", visibility: company.visibility,
  });
  const [logo, setLogo] = useState<File>();
  const [cover, setCover] = useState<File>();
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const saved = await update.mutateAsync({
        name: form.name.trim(), industry: form.industry.trim() || null, location: form.location.trim() || null,
        locations: form.location.trim() ? [form.location.trim()] : [], companySize: form.companySize || null,
        foundationDate: form.foundationDate ? new Date(form.foundationDate).toISOString() : null,
        website: form.website.trim() || null, description: form.description.trim() || null, visibility: form.visibility,
      });
      let finalCompany = saved;
      if (logo || cover) {
        setUploading(true);
        finalCompany = await updateCompanyBranding(company.id, { logoFile: logo, coverFile: cover });
        setLogo(undefined); setCover(undefined);
      }
      queryClient.setQueryData(companyKeys.mine, finalCompany);
      await queryClient.invalidateQueries({ queryKey: companyKeys.mineList });
      toast.success("Informations de l’entreprise mises à jour");
    } catch { toast.error("Impossible de modifier l’entreprise"); }
    finally { setUploading(false); }
  };
  const pending = update.isPending || uploading;
  return <form onSubmit={submit} className="max-w-4xl">
    <header className="mb-7"><span className="grid size-11 place-items-center bg-accent-light-brand text-brand"><Building2 size={22}/></span><h2 className="mt-4 text-xl font-bold">Profil de l’entreprise</h2><p className="mt-1 text-sm text-neutral-60">Modifiez les informations visibles par les candidats et utilisées dans vos recrutements.</p></header>
    <div className="space-y-8"><Section title="Identité et activité"><div className="grid gap-5 md:grid-cols-2"><Field required label="Nom officiel" value={form.name} onChange={(v)=>set("name",v)}/><Field required label="Secteur d’activité" value={form.industry} onChange={(v)=>set("industry",v)}/><Field required label="Localisation principale" value={form.location} onChange={(v)=>set("location",v)}/><Select required label="Taille de l’entreprise" value={form.companySize} onChange={(v)=>set("companySize",v)} options={sizes}/><Field label="Date de fondation" type="date" value={form.foundationDate} onChange={(v)=>set("foundationDate",v)}/><Field label="Site web" type="url" value={form.website} onChange={(v)=>set("website",v)} placeholder="https://entreprise.com"/></div><label className="mt-5 block text-sm font-bold">Description<textarea required maxLength={2000} value={form.description} onChange={(e)=>set("description",e.target.value)} className="mt-2 min-h-32 w-full border border-brand-light-neutral p-3 font-normal outline-none focus:border-brand"/></label></Section>
      <Section title="Identité visuelle"><div className="grid gap-5 md:grid-cols-2"><Upload label="Remplacer le logo" current={company.logo} file={logo} onChange={setLogo}/><Upload label="Remplacer la couverture" current={company.coverImage} file={cover} onChange={setCover}/></div></Section>
      <Section title="Visibilité"><Select label="Qui peut voir cette entreprise ?" value={form.visibility} onChange={(v)=>set("visibility",v as CompanyVisibility)} options={["public","authenticated","verified_candidates","private"]}/></Section>
    </div><button disabled={pending} className="mt-8 h-12 w-full bg-brand text-sm font-bold text-white disabled:opacity-50">{pending?"Enregistrement…":"Enregistrer les modifications"}</button>
  </form>;
}

function Section({title,children}:{title:string;children:React.ReactNode}){return <section><h3 className="mb-5 border-b border-brand-light-neutral pb-3 text-base font-bold">{title}</h3>{children}</section>}
function Field({label,value,onChange,type="text",placeholder,required}:{label:string;value:string;onChange:(v:string)=>void;type?:string;placeholder?:string;required?:boolean}){return <label className="block text-sm font-bold">{label}<input required={required} type={type} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="mt-2 h-12 w-full border border-brand-light-neutral px-3 font-normal outline-none focus:border-brand"/></label>}
function Select({label,value,onChange,options,required}:{label:string;value:string;onChange:(v:string)=>void;options:string[];required?:boolean}){return <label className="block text-sm font-bold">{label}<select required={required} value={value} onChange={(e)=>onChange(e.target.value)} className="mt-2 h-12 w-full border border-brand-light-neutral bg-white px-3 font-normal outline-none focus:border-brand"><option value="">Sélectionner</option>{options.map((option)=><option key={option} value={option}>{option.replaceAll("_"," ")}</option>)}</select></label>}
function Upload({label,current,file,onChange}:{label:string;current:string|null;file?:File;onChange:(file?:File)=>void}){return <label className="flex min-h-28 cursor-pointer items-center gap-4 border border-dashed border-brand-light-neutral p-4 hover:border-brand"><span className="grid size-10 shrink-0 place-items-center bg-accent-light-brand text-brand"><ImagePlus size={19}/></span><span className="min-w-0"><b className="block text-sm">{label}</b><small className="block truncate text-neutral-60">{file?.name || (current ? "Image actuelle enregistrée" : "Choisir une image")}</small></span><input hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={(e)=>onChange(e.target.files?.[0])}/></label>}

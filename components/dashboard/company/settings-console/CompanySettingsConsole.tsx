"use client";

import { useAddCompanyTeamMember } from "@/core/hooks/company/use-add-company-team-member";
import { useCreateCompany } from "@/core/hooks/company/use-create-company";
import { useDeactivateCompany } from "@/core/hooks/company/use-deactivate-company";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useReactivateCompany } from "@/core/hooks/company/use-reactivate-company";
import { useRemoveCompanyTeamMember } from "@/core/hooks/company/use-remove-company-team-member";
import { useScheduleCompanyDeletion } from "@/core/hooks/company/use-schedule-company-deletion";
import { useUpdateCompanyBranding } from "@/core/hooks/company/use-update-company-branding";
import { useUpdateCompany } from "@/core/hooks/company/use-update-company";
import type { Company, CompanyInput, CompanyVisibility } from "@/core/types/company";
import { ApiError } from "@/core/types/api";
import { Building2, ImagePlus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const empty: CompanyInput = { name: "", description: "", industry: "", location: "", locations: [], companySize: "", website: "", techStack: [], perks: [], gallery: [], visibility: "public", emailContactEnabled: true, inAppContactEnabled: true };

export default function CompanySettingsConsole() {
  const mine = useMyCompany();
  const create = useCreateCompany();
  const [form, setForm] = useState<CompanyInput>(empty);
  if (mine.isPending) return <p className="py-20 text-center text-neutral-60">Loading settings…</p>;
  if (mine.isError && (!(mine.error instanceof ApiError) || mine.error.status !== 404)) {
    return <LoadError message={mine.error.message} retry={() => void mine.refetch()} />;
  }
  if (!mine.data) return <CreateCompany form={form} setForm={setForm} pending={create.isPending} submit={async () => { try { await create.mutateAsync(form); toast.success("Company created"); } catch { toast.error("Unable to create company"); } }} />;
  return <ExistingCompanyEditor key={mine.data.id} company={mine.data} />;
}

function ExistingCompanyEditor({ company }: { company: Company }) {
  const [form, setForm] = useState<CompanyInput>({
    ...empty,
    ...company,
    foundationDate: company.foundationDate || undefined,
  });
  return <CompanyEditor companyId={company.id} form={form} setForm={setForm} status={company.status} team={company.teamMembers || []} />;
}

function CreateCompany({ form, setForm, pending, submit }: { form: CompanyInput; setForm: (form: CompanyInput) => void; pending: boolean; submit: () => void }) {
  return <form onSubmit={(e) => { e.preventDefault(); void submit(); }} className="mx-auto max-w-2xl bg-white p-7"><Building2 className="text-brand" size={36}/><h1 className="mt-3 text-2xl font-bold">Create your company profile</h1><p className="text-sm text-neutral-60">This profile is required before posting jobs and inviting recruiters.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Company name" value={form.name} onChange={(name) => setForm({ ...form, name })} required/><Field label="Industry" value={form.industry || ""} onChange={(industry) => setForm({ ...form, industry })}/><Field label="Location" value={form.location || ""} onChange={(location) => setForm({ ...form, location })}/><Field label="Website" type="url" value={form.website || ""} onChange={(website) => setForm({ ...form, website })}/></div><button disabled={pending} className="mt-6 h-12 w-full bg-brand font-bold text-white">{pending ? "Creating…" : "Create company"}</button></form>;
}

function CompanyEditor({ companyId, form, setForm, status, team }: { companyId: string; form: CompanyInput; setForm: (form: CompanyInput) => void; status: string; team: Array<{ id: string; name: string; role: string; avatar?: string }> }) {
  const update = useUpdateCompany(companyId); const branding = useUpdateCompanyBranding(companyId); const addTeam = useAddCompanyTeamMember(companyId); const removeTeam = useRemoveCompanyTeamMember(companyId); const deactivate = useDeactivateCompany(companyId); const reactivate = useReactivateCompany(companyId); const scheduleDeletion = useScheduleCompanyDeletion(companyId);
  const [logoFile, setLogoFile] = useState<File>(); const [coverFile, setCoverFile] = useState<File>(); const [teamName, setTeamName] = useState(""); const [teamRole, setTeamRole] = useState("");
  async function save(event: FormEvent) { event.preventDefault(); try { await update.mutateAsync(form); toast.success("Company profile updated"); } catch { toast.error("Update failed"); } }
  return <div className="mx-auto max-w-5xl space-y-6">
    <form onSubmit={save} className="bg-white p-6 lg:p-8"><Header title="Company profile" copy="Manage all public information shown to candidates."/><div className="grid gap-4 sm:grid-cols-2"><Field label="Company name" value={form.name} onChange={(name) => setForm({ ...form, name })} required/><Field label="Industry" value={form.industry || ""} onChange={(industry) => setForm({ ...form, industry })}/><Field label="Main location" value={form.location || ""} onChange={(location) => setForm({ ...form, location })}/><Field label="Company size" value={form.companySize || ""} onChange={(companySize) => setForm({ ...form, companySize })}/><Field label="Website" type="url" value={form.website || ""} onChange={(website) => setForm({ ...form, website })}/><Field label="Founded" type="date" value={form.foundationDate?.slice(0,10) || ""} onChange={(foundationDate) => setForm({ ...form, foundationDate })}/></div><label className="mt-4 block text-xs font-bold">Description<textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} className="mt-2 w-full border p-3 font-normal"/></label><Tags label="Office locations" values={form.locations || []} onChange={(locations) => setForm({ ...form, locations })}/><Tags label="Tech stack" values={form.techStack || []} onChange={(techStack) => setForm({ ...form, techStack })}/><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="LinkedIn" type="url" value={form.linkedin || ""} onChange={(linkedin) => setForm({ ...form, linkedin })}/><Field label="Facebook" type="url" value={form.facebook || ""} onChange={(facebook) => setForm({ ...form, facebook })}/><Field label="Instagram" type="url" value={form.instagram || ""} onChange={(instagram) => setForm({ ...form, instagram })}/><Field label="YouTube" type="url" value={form.youtube || ""} onChange={(youtube) => setForm({ ...form, youtube })}/></div><button disabled={update.isPending} className="mt-6 h-11 w-full bg-brand font-bold text-white">Save profile</button></form>
    <section className="bg-white p-6 lg:p-8"><Header title="Branding" copy="Upload your logo and cover image (maximum 5 MB each)."/><div className="grid gap-4 sm:grid-cols-2"><FileField label="Logo" onChange={setLogoFile}/><FileField label="Cover image" onChange={setCoverFile}/></div><button disabled={branding.isPending || (!logoFile && !coverFile)} onClick={() => branding.mutate({ logoFile, coverFile }, { onSuccess: () => toast.success("Branding updated"), onError: () => toast.error("Upload failed") })} className="mt-5 h-11 w-full bg-brand font-bold text-white disabled:opacity-40"><ImagePlus className="mr-2 inline" size={17}/>Upload branding</button></section>
    <section className="bg-white p-6 lg:p-8"><Header title="Privacy" copy="Control profile visibility and contact options."/><select value={form.visibility} onChange={(e) => setForm({ ...form, visibility: e.target.value as CompanyVisibility })} className="h-11 w-full border px-3"><option value="public">Public</option><option value="authenticated">Logged-in users</option><option value="verified_candidates">Verified candidates</option><option value="private">Private</option></select><Toggle label="Allow email contact" value={form.emailContactEnabled ?? true} onChange={(emailContactEnabled) => setForm({ ...form, emailContactEnabled })}/><Toggle label="Allow in-app contact" value={form.inAppContactEnabled ?? true} onChange={(inAppContactEnabled) => setForm({ ...form, inAppContactEnabled })}/><button onClick={() => update.mutate(form, { onSuccess: () => toast.success("Privacy updated") })} className="mt-4 h-11 w-full bg-brand font-bold text-white">Save privacy</button></section>
    <section className="bg-white p-6 lg:p-8"><Header title="Public team" copy="People displayed on your public company profile."/><div className="space-y-2">{team.map((member) => <div key={member.id} className="flex items-center justify-between border p-3"><div className="flex items-center gap-3">{member.avatar && <Image src={member.avatar} alt="" width={36} height={36} className="size-9 rounded-full object-cover"/>}<span><b>{member.name}</b><small className="block text-neutral-60">{member.role}</small></span></div><button onClick={() => removeTeam.mutate(member.id, { onSuccess: () => toast.success("Team member removed") })} className="text-accent-red"><Trash2 size={17}/></button></div>)}</div><form onSubmit={(e) => { e.preventDefault(); addTeam.mutate({ name: teamName, role: teamRole }, { onSuccess: () => { setTeamName(""); setTeamRole(""); toast.success("Team member added"); } }); }} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><input required value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Full name" className="h-11 border px-3"/><input required value={teamRole} onChange={(e) => setTeamRole(e.target.value)} placeholder="Role" className="h-11 border px-3"/><button className="h-11 bg-brand px-5 text-white"><Plus/></button></form></section>
    <section className="border border-red-200 bg-white p-6 lg:p-8"><Header title="Company lifecycle" copy={`Current status: ${status}`}/>{status === "deactivated" ? <button onClick={() => reactivate.mutate(undefined, { onSuccess: () => toast.success("Company reactivated") })} className="h-11 bg-brand px-5 font-bold text-white">Reactivate company</button> : <div className="flex flex-wrap gap-3"><button onClick={() => { const reason = window.prompt("Reason for deactivation?"); if (reason) deactivate.mutate(reason, { onSuccess: () => toast.success("Company deactivated") }); }} className="h-11 border border-red-500 px-5 font-bold text-red-600">Deactivate</button><button onClick={() => { const reason = window.prompt("Reason for deletion?"); if (reason) scheduleDeletion.mutate(reason, { onSuccess: () => toast.success("Deletion scheduled in 30 days") }); }} className="h-11 bg-red-600 px-5 font-bold text-white">Schedule deletion</button></div>}</section>
  </div>;
}

function Header({ title, copy }: { title: string; copy: string }) { return <header className="mb-6"><h2 className="text-xl font-bold">{title}</h2><p className="text-sm text-neutral-60">{copy}</p></header>; }
function Field({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) { return <label className="text-xs font-bold">{label}<input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 h-11 w-full border px-3 font-normal"/></label>; }
function Tags({ label, values, onChange }: { label: string; values: string[]; onChange: (value: string[]) => void }) { return <label className="mt-4 block text-xs font-bold">{label}<input value={values.join(", ")} onChange={(e) => onChange(e.target.value.split(",").map((v) => v.trim()).filter(Boolean))} placeholder="Separate values with commas" className="mt-2 h-11 w-full border px-3 font-normal"/></label>; }
function FileField({ label, onChange }: { label: string; onChange: (file?: File) => void }) { return <label className="border border-dashed p-5 text-center text-sm font-bold">{label}<input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} className="mt-3 block w-full text-xs font-normal"/></label>; }
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) { return <label className="mt-4 flex items-center justify-between border-b pb-3 text-sm font-semibold">{label}<input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)}/></label>; }
function LoadError({ message, retry }: { message: string; retry: () => void }) { return <div className="mx-auto max-w-xl border border-red-200 bg-white p-8 text-center"><h1 className="text-xl font-bold text-neutral-100">Unable to load company settings</h1><p className="mt-2 text-sm text-neutral-60">{message}</p><button onClick={retry} className="mt-5 bg-brand px-5 py-3 text-sm font-bold text-white">Try again</button></div>; }

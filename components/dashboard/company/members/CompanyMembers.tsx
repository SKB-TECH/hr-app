"use client";

import { useAddCompanyMember } from "@/core/hooks/company/use-add-company-member";
import { useCompanyInvitations } from "@/core/hooks/company/use-company-invitations";
import { useCompanyMembers } from "@/core/hooks/company/use-company-members";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useRemoveCompanyMember } from "@/core/hooks/company/use-remove-company-member";
import { useRevokeCompanyInvitation } from "@/core/hooks/company/use-revoke-company-invitation";
import { useUpdateCompanyMember } from "@/core/hooks/company/use-update-company-member";
import type { AddCompanyMemberInput, CompanyMemberRole } from "@/core/types/company";
import { Mail, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function CompanyMembers() {
  const mine = useMyCompany();
  const id = mine.data?.id || "";
  const members = useCompanyMembers(id);
  const invitations = useCompanyInvitations(id);
  const remove = useRemoveCompanyMember(id);
  const update = useUpdateCompanyMember(id);
  const revoke = useRevokeCompanyInvitation(id);
  const [inviteOpen, setInviteOpen] = useState(false);
  if (mine.isPending || members.isPending) return <p className="py-20 text-center text-neutral-60">Loading members…</p>;
  if (mine.isError || members.isError || invitations.isError) return <div className="py-20 text-center"><p className="font-bold text-neutral-100">Unable to load company members.</p><p className="mt-2 text-sm text-neutral-60">Check your connection and try again.</p><button onClick={() => { void mine.refetch(); void members.refetch(); void invitations.refetch(); }} className="mt-5 bg-brand px-5 py-3 text-sm font-bold text-white">Try again</button></div>;
  if (!mine.data) return <p className="py-20 text-center text-neutral-60">Create your company profile first.</p>;
  return <div className="w-full">
    <header className="flex items-center justify-between gap-4"><div><h1 className="text-2xl font-bold">Company Members</h1><p className="text-sm text-neutral-60">Manage access roles and pending invitations.</p></div><button onClick={() => setInviteOpen(true)} className="flex h-11 items-center gap-2 bg-brand px-5 text-sm font-bold text-white"><Plus size={17}/>Add member</button></header>
    <section className="mt-7 overflow-x-auto border border-brand-light-neutral"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-[#fafaff] text-xs uppercase text-neutral-60"><tr><th className="px-5 py-4">Member</th><th>Title</th><th>Role</th><th className="px-5 text-right">Actions</th></tr></thead><tbody>{members.data?.map((member) => <tr key={member.id} className="border-t"><td className="px-5 py-4"><div className="flex items-center gap-3">{member.user.avatar ? <Image src={member.user.avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" /> : <span className="grid size-10 place-items-center rounded-full bg-accent-light-brand font-bold text-brand">{member.user.fullName.slice(0, 2).toUpperCase()}</span>}<div><b>{member.user.fullName}</b><p className="text-xs text-neutral-60">{member.user.email}</p></div></div></td><td>{member.title || "—"}</td><td><select disabled={member.role === "COMPANY_OWNER" || update.isPending} value={member.role} onChange={(e) => update.mutate({ memberId: member.id, input: { role: e.target.value as CompanyMemberRole } }, { onSuccess: () => toast.success("Role updated"), onError: () => toast.error("Update failed") })} className="border px-2 py-2"><option value="COMPANY_OWNER">Owner</option><option value="HR_MANAGER">HR Manager</option><option value="RECRUITER">Recruiter</option></select></td><td className="px-5 text-right">{member.role !== "COMPANY_OWNER" && <button onClick={() => remove.mutate(member.id, { onSuccess: () => toast.success("Member removed"), onError: () => toast.error("Removal failed") })} className="text-accent-red"><Trash2 size={17}/></button>}</td></tr>)}</tbody></table></section>
    <section className="mt-7"><h2 className="font-bold">Pending invitations</h2><div className="mt-3 space-y-2">{invitations.data?.filter((item) => item.status === "pending").map((item) => <div key={item.id} className="flex items-center justify-between border p-4 text-sm"><div><b>{item.fullName || item.email}</b><p className="text-xs text-neutral-60">{item.email} · {item.role}</p></div><button onClick={() => revoke.mutate(item.id, { onSuccess: () => toast.success("Invitation revoked") })} className="text-accent-red"><X size={18}/></button></div>)}{!invitations.data?.some((item) => item.status === "pending") && <p className="text-sm text-neutral-60">No pending invitation.</p>}</div></section>
    {inviteOpen && <InviteModal companyId={id} onClose={() => setInviteOpen(false)} />}
  </div>;
}

function InviteModal({ companyId, onClose }: { companyId: string; onClose: () => void }) {
  const invite = useAddCompanyMember(companyId); const [form, setForm] = useState<AddCompanyMemberInput>({ email: "", fullName: "", title: "", role: "RECRUITER" });
  async function submit(event: FormEvent) { event.preventDefault(); try { await invite.mutateAsync(form); toast.success("Invitation sent"); onClose(); } catch { toast.error("Unable to send invitation"); } }
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"><form onSubmit={submit} className="relative w-full max-w-lg bg-white p-7"><button type="button" onClick={onClose} className="absolute right-4 top-4"><X/></button><h2 className="text-xl font-bold">Add company member</h2><p className="text-sm text-neutral-60">Unregistered users receive a secure email invitation.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Full name" value={form.fullName || ""} onChange={(fullName) => setForm({ ...form, fullName })}/><Field type="email" label="Email" value={form.email} onChange={(email) => setForm({ ...form, email })}/><Field label="Job title" value={form.title || ""} onChange={(title) => setForm({ ...form, title })}/><label className="text-xs font-bold">Role<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as CompanyMemberRole })} className="mt-2 h-11 w-full border px-3 font-normal"><option value="RECRUITER">Recruiter</option><option value="HR_MANAGER">HR Manager</option></select></label></div><button disabled={invite.isPending} className="mt-6 flex h-11 w-full items-center justify-center gap-2 bg-brand font-bold text-white"><Mail size={16}/>{invite.isPending ? "Sending…" : "Send invitation"}</button></form></div>;
}
function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <label className="text-xs font-bold">{label}<input required={label === "Email"} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 h-11 w-full border px-3 font-normal" /></label>; }

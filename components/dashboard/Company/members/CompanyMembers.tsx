"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { Check, ChevronDown, Mail, MoreHorizontal, Plus, Search, ShieldCheck, Trash2, UserCog, X } from "lucide-react";

type MemberRole = "Owner" | "Admin" | "Recruiter" | "Hiring Manager" | "Interviewer" | "Viewer";
type MemberStatus = "Active" | "Invited";
type Member = { id: number; name: string; email: string; title: string; role: MemberRole; status: MemberStatus; avatar: string };

const roles: { name: MemberRole; description: string }[] = [
  { name: "Owner", description: "Full access, billing and company ownership" },
  { name: "Admin", description: "Manage members, settings and all recruitment" },
  { name: "Recruiter", description: "Manage jobs, candidates and interviews" },
  { name: "Hiring Manager", description: "Review candidates and make hiring decisions" },
  { name: "Interviewer", description: "Access assigned interviews and evaluations" },
  { name: "Viewer", description: "Read-only access to recruitment information" },
];

const initialMembers: Member[] = [
  { id: 1, name: "Maria Kelly", email: "maria@nomad.com", title: "Company Director", role: "Owner", status: "Active", avatar: "/team/person3.png" },
  { id: 2, name: "Célestin Gardinier", email: "celestin@nomad.com", title: "Operations Lead", role: "Admin", status: "Active", avatar: "/profile1.jpg" },
  { id: 3, name: "Reynaud Colbert", email: "reynaud@nomad.com", title: "Talent Acquisition", role: "Recruiter", status: "Active", avatar: "/profile2.jpg" },
  { id: 4, name: "Arienne Lyon", email: "arienne@nomad.com", title: "Engineering Director", role: "Hiring Manager", status: "Active", avatar: "/profile3.jpg" },
  { id: 5, name: "Bernard Alexander", email: "bernard@nomad.com", title: "Senior Engineer", role: "Interviewer", status: "Active", avatar: "/profile4.jpg" },
  { id: 6, name: "Christine Johnson", email: "christine@nomad.com", title: "HR Assistant", role: "Viewer", status: "Invited", avatar: "/profileImage.jpg" },
];

export default function CompanyMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All roles" | MemberRole>("All roles");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => members.filter(member => {
    const matchesText = `${member.name} ${member.email} ${member.title}`.toLowerCase().includes(query.toLowerCase());
    return matchesText && (roleFilter === "All roles" || member.role === roleFilter);
  }), [members, query, roleFilter]);

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const changeRole = (id: number, role: MemberRole) => {
    setMembers(list => list.map(member => member.id === id ? { ...member, role } : member));
    setMenu(null); notify("Member role updated");
  };

  return (
    <div className="w-full">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold text-neutral-100">Company Members</h1><p className="mt-1 text-sm text-neutral-60">Manage your team and control each member&apos;s access.</p></div>
        <button onClick={() => setInviteOpen(true)} className="flex h-11 items-center justify-center gap-2 bg-brand px-5 text-sm font-bold text-white hover:bg-indigo-700"><Plus size={17}/>Add member</button>
      </header>

      <section className="mt-7 border border-brand-light-neutral">
        <div className="flex flex-col gap-3 border-b border-brand-light-neutral p-4 md:flex-row md:items-center md:justify-between">
          <div><h2 className="font-bold text-neutral-100">Team members</h2><p className="mt-1 text-xs text-neutral-60">{members.length} members · {members.filter(m => m.status === "Active").length} active</p></div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex h-10 items-center gap-2 border border-brand-light-neutral px-3 text-neutral-60"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search members" className="w-full bg-transparent text-sm outline-none sm:w-52"/></label>
            <label className="relative"><select value={roleFilter} onChange={e => setRoleFilter(e.target.value as typeof roleFilter)} className="h-10 w-full appearance-none border border-brand-light-neutral bg-white px-3 pr-9 text-sm text-neutral-80 outline-none sm:w-44"><option>All roles</option>{roles.map(role => <option key={role.name}>{role.name}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-3 text-neutral-60"/></label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-brand-light-neutral bg-[#fafaff] text-xs uppercase tracking-wide text-neutral-60"><tr><th className="px-5 py-4">Member</th><th>Job title</th><th>Access role</th><th>Status</th><th className="px-5 text-right">Actions</th></tr></thead>
            <tbody>{filtered.map(member => <tr key={member.id} className="border-b border-[#edf0f6] last:border-0 hover:bg-[#fafaff]"><td className="px-5 py-4"><div className="flex items-center gap-3"><Image src={member.avatar} alt="" width={42} height={42} className="size-10 rounded-full object-cover"/><div><p className="font-bold text-neutral-100">{member.name}</p><p className="mt-0.5 text-xs text-neutral-60">{member.email}</p></div></div></td><td className="text-neutral-80">{member.title}</td><td><span className="inline-flex items-center gap-1.5 bg-accent-light-brand px-2.5 py-1 text-xs font-bold text-brand"><ShieldCheck size={14}/>{member.role}</span></td><td><span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${member.status === "Active" ? "text-[#27886d]" : "text-[#b26910]"}`}><span className={`size-2 rounded-full ${member.status === "Active" ? "bg-accent-green" : "bg-accent-yellow"}`}/>{member.status}</span></td><td className="relative px-5 text-right"><button onClick={() => setMenu(menu === member.id ? null : member.id)} className="grid size-9 place-items-center text-neutral-60 hover:bg-accent-light-brand hover:text-brand"><MoreHorizontal size={18}/></button>{menu === member.id && <div className="absolute right-5 top-12 z-20 w-56 border border-brand-light-neutral bg-white py-2 text-left shadow-xl"><p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wide text-neutral-60">Change access role</p>{roles.filter(role => member.role !== "Owner" || role.name === "Owner").map(role => <button key={role.name} onClick={() => changeRole(member.id, role.name)} className="flex w-full items-center justify-between px-3 py-2 text-xs text-neutral-100 hover:bg-accent-light-brand"><span>{role.name}</span>{member.role === role.name && <Check size={14} className="text-brand"/>}</button>)}{member.role !== "Owner" && <><hr className="my-1"/><button onClick={() => { setMembers(list => list.filter(m => m.id !== member.id)); setMenu(null); notify("Member removed"); }} className="flex w-full items-center gap-2 px-3 py-2 text-xs text-accent-red hover:bg-accent-light-red"><Trash2 size={14}/>Remove member</button></>}</div>}</td></tr>)}</tbody>
          </table>
          {!filtered.length && <div className="py-16 text-center"><UserCog className="mx-auto text-neutral-60"/><p className="mt-3 font-bold text-neutral-100">No members found</p></div>}
        </div>
      </section>

      {inviteOpen && <InviteModal onClose={() => setInviteOpen(false)} onInvite={member => { setMembers(list => [...list, { ...member, id: Date.now(), avatar: "/team/person11.png", status: "Invited" }]); setInviteOpen(false); notify("Invitation sent successfully"); }}/>} 
      {toast && <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-100 px-4 py-3 text-sm font-semibold text-white shadow-xl"><Check size={17} className="text-accent-green"/>{toast}</div>}
    </div>
  );
}

function InviteModal({ onClose, onInvite }: { onClose: () => void; onInvite: (member: Omit<Member, "id" | "avatar" | "status">) => void }) {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [title, setTitle] = useState(""); const [role, setRole] = useState<MemberRole>("Recruiter");
  const submit = (event: FormEvent) => { event.preventDefault(); onInvite({ name, email, title, role }); };
  return <div className="fixed inset-0 z-50 grid place-items-center bg-neutral-100/50 p-4 backdrop-blur-[1px]" onMouseDown={e => e.target === e.currentTarget && onClose()}><form onSubmit={submit} className="relative w-full max-w-lg bg-white p-6 shadow-2xl lg:p-8"><button type="button" onClick={onClose} className="absolute right-4 top-4 grid size-8 place-items-center text-neutral-60 hover:bg-[#f4f4fa]"><X size={18}/></button><h2 className="text-xl font-bold text-neutral-100">Add company member</h2><p className="mt-1 text-sm text-neutral-60">The member will receive an invitation by email.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Full name" value={name} onChange={setName} placeholder="e.g. John Doe"/><Field label="Email address" value={email} onChange={setEmail} placeholder="john@company.com" type="email"/><Field label="Job title" value={title} onChange={setTitle} placeholder="e.g. Talent Partner"/><label className="text-xs font-bold text-neutral-80">Access role<select value={role} onChange={e => setRole(e.target.value as MemberRole)} className="mt-2 h-11 w-full border border-brand-light-neutral bg-white px-3 text-sm font-normal outline-none focus:border-brand">{roles.filter(r => r.name !== "Owner").map(r => <option key={r.name}>{r.name}</option>)}</select></label></div><div className="mt-5 bg-[#fafaff] p-4"><div className="flex gap-2"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-brand"/><div><p className="text-xs font-bold text-neutral-100">{role}</p><p className="mt-1 text-xs leading-5 text-neutral-60">{roles.find(r => r.name === role)?.description}</p></div></div></div><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="h-11 border border-brand-light-neutral px-5 text-sm font-bold text-neutral-80">Cancel</button><button type="submit" className="flex h-11 items-center gap-2 bg-brand px-5 text-sm font-bold text-white"><Mail size={16}/>Send invitation</button></div></form></div>;
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) { return <label className="text-xs font-bold text-neutral-80">{label}<input required type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="mt-2 h-11 w-full border border-brand-light-neutral px-3 text-sm font-normal outline-none placeholder:text-neutral-60 focus:border-brand"/></label>; }

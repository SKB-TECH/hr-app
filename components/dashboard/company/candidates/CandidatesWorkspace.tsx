"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BriefcaseBusiness, Check, ChevronLeft, ChevronRight, Eye, MapPin, Search, Send, X } from "lucide-react";
import { applicants } from "@/data/applicants";
import { jobListingData } from "@/data/company-job-listing";

type Candidate = (typeof applicants)[number];
type ProposalStatus = "Pending" | "Applied" | "Rejected" | "On-going" | "Hired";
type Proposal = { jobId: number | string; status: ProposalStatus; recruiter: string; note?: string };

const initialProposals: Record<number, Proposal[]> = {
  1: [
    { jobId: 1, status: "Rejected", recruiter: "Maria Kelly", note: "Blacklisted: Pre-screening" },
    { jobId: 3, status: "Rejected", recruiter: "Maria Kelly", note: "Blacklisted: Pre-screening" },
    { jobId: 4, status: "Rejected", recruiter: "Célestin Gardinier", note: "Blacklisted: Pre-screening" },
    { jobId: 6, status: "On-going", recruiter: "Reynaud Colbert", note: "Step: Pre-screening" },
    { jobId: 8, status: "Hired", recruiter: "Maria Kelly" },
  ],
};

export default function CandidatesWorkspace() {
  const [query, setQuery] = useState("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [proposals, setProposals] = useState<Record<number, Proposal[]>>(initialProposals);
  const [toast, setToast] = useState("");
  const candidates = useMemo(() => applicants.slice(0, 10).filter(item => item.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };

  return <div className="w-full">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><h1 className="text-2xl font-bold text-neutral-100">Candidates</h1><p className="mt-1 text-sm text-neutral-60">Explore your company&apos;s talent pool and propose open positions.</p></div>
      <label className="flex h-10 items-center gap-2 border border-brand-light-neutral px-3 text-neutral-60"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for anything..." className="w-full bg-transparent text-sm outline-none sm:w-64"/></label>
    </header>

    <section className="mt-7 border border-brand-light-neutral">
      <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-sm"><thead className="border-b border-brand-light-neutral bg-[#fafaff] text-xs uppercase tracking-wide text-neutral-60"><tr><th className="px-5 py-4">Name</th><th>Email</th><th>Phone</th><th>Experience</th><th>Applications</th><th>History</th><th className="px-5 text-right">Actions</th></tr></thead><tbody>{candidates.map((item, index) => { const historyCount = proposals[item.id]?.length ?? (index % 4) + 1; return <tr key={item.id} className="border-b border-[#edf0f6] last:border-0 hover:bg-[#fafaff]"><td className="px-5 py-3"><div className="flex items-center gap-3"><Image src={item.avatar} alt="" width={38} height={38} className="size-9 rounded-full object-cover"/><div><p className="font-bold text-neutral-100">{item.name}</p><p className="text-xs text-neutral-60">{item.jobRole || "Frontend Developer"}</p></div></div></td><td className="text-neutral-60">{item.name.toLowerCase().replace(" ", ".")}@email.com</td><td className="text-neutral-60">+243 812 123 456</td><td className="text-neutral-60">{item.jobRole || "Frontend Developer"} (Senior)</td><td className="text-neutral-80">{18 + index} <b>({Math.min(3, historyCount)} active)</b></td><td><button onClick={() => setCandidate(item)} className="text-xs font-semibold text-brand underline underline-offset-4">View details</button></td><td className="px-5"><button onClick={() => setCandidate(item)} className="ml-auto flex h-9 items-center gap-2 px-3 text-xs font-bold text-brand hover:bg-accent-light-brand"><BriefcaseBusiness size={15}/>Propose job</button></td></tr>; })}</tbody></table></div>
      <div className="flex items-center justify-center gap-1 border-t border-brand-light-neutral py-4 text-sm"><button className="grid size-9 place-items-center border border-brand-light-neutral"><ChevronLeft size={15}/></button><button className="size-9 bg-brand text-white">1</button><button className="size-9 text-neutral-60">2</button><button className="size-9 text-neutral-60">3</button><button className="grid size-9 place-items-center border border-brand-light-neutral"><ChevronRight size={15}/></button></div>
    </section>

    {candidate && <ProposeJobModal candidate={candidate} proposals={proposals[candidate.id] ?? []} onClose={() => setCandidate(null)} onPropose={jobId => { setProposals(all => ({...all, [candidate.id]: [...(all[candidate.id] ?? []), {jobId, status: "Pending", recruiter: "Maria Kelly"}]})); notify("Job proposal sent successfully"); }}/>} 
    {toast && <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 bg-neutral-100 px-4 py-3 text-sm font-semibold text-white shadow-xl"><Check size={17} className="text-accent-green"/>{toast}</div>}
  </div>;
}

function ProposeJobModal({ candidate, proposals, onClose, onPropose }: { candidate: Candidate; proposals: Proposal[]; onClose: () => void; onPropose: (jobId: number | string) => void }) {
  const [tab, setTab] = useState<"Jobs" | "Proposed" | "History">("Jobs");
  const [query, setQuery] = useState("");
  const [recruiter, setRecruiter] = useState("All recruiters");
  const [status, setStatus] = useState("All statuses");
  const proposedIds = proposals.map(item => item.jobId);
  const jobs = jobListingData.filter(job => job.status === "Live" && job.role.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  const proposalRows = proposals.length ? proposals : [1, 3, 4].map(jobId => ({ jobId, status: "Pending" as ProposalStatus, recruiter: "Maria Kelly" }));
  const historyRows = proposals.length ? proposals : initialProposals[1];
  const visibleHistory = historyRows.filter(item => (recruiter === "All recruiters" || item.recruiter === recruiter) && (status === "All statuses" || item.status === status));

  return <div className="fixed inset-0 z-50 grid place-items-center bg-neutral-100/55 p-4 backdrop-blur-[1px]" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl lg:p-8"><button onClick={onClose} className="absolute right-4 top-4 grid size-8 place-items-center text-neutral-60 hover:bg-[#f4f4fa]"><X size={18}/></button><h2 className="text-center text-lg font-bold text-neutral-100">Propose job</h2><div className="mt-5 flex items-center gap-3"><Image src={candidate.avatar} alt="" width={52} height={52} className="size-12 rounded-full border-2 border-brand object-cover"/><div><p className="text-sm font-bold text-brand">{candidate.name}</p><p className="mt-0.5 text-xs text-neutral-60">{candidate.jobRole || "Frontend Developer"} (Senior)</p></div></div>
    <div className="mt-5 flex border-b border-brand-light-neutral">{(["Jobs", "Proposed", "History"] as const).map(name => <button key={name} onClick={() => setTab(name)} className={`relative px-4 py-3 text-sm font-bold ${tab === name ? "text-brand" : "text-neutral-60"}`}>{name}{tab === name && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-brand"/>}</button>)}</div>

    {tab !== "History" && <label className="mt-4 flex h-10 items-center gap-2 bg-[#f5f5f7] px-3 text-neutral-60"><Search size={15}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for job" className="w-full bg-transparent text-xs outline-none"/></label>}
    {tab === "History" && <div className="mt-4 grid grid-cols-2 gap-3"><label className="text-xs font-bold text-neutral-80">Recruiter<select value={recruiter} onChange={e => setRecruiter(e.target.value)} className="mt-2 h-10 w-full border border-brand-light-neutral bg-white px-3 font-normal"><option>All recruiters</option><option>Maria Kelly</option><option>Célestin Gardinier</option><option>Reynaud Colbert</option></select></label><label className="text-xs font-bold text-neutral-80">Status<select value={status} onChange={e => setStatus(e.target.value)} className="mt-2 h-10 w-full border border-brand-light-neutral bg-white px-3 font-normal"><option>All statuses</option><option>Pending</option><option>Applied</option><option>Rejected</option><option>On-going</option><option>Hired</option></select></label></div>}

    <div className="mt-3 divide-y divide-[#edf0f6]">{tab === "Jobs" && jobs.map(job => <JobRow key={job.id} jobId={job.id} status={proposedIds.some(id => String(id) === String(job.id)) ? "Pending" : undefined} action={proposedIds.some(id => String(id) === String(job.id)) ? undefined : () => onPropose(job.id)}/>)}{tab === "Proposed" && proposalRows.filter(item => jobListingData.find(job => String(job.id) === String(item.jobId))?.role.toLowerCase().includes(query.toLowerCase())).map((item, index) => <JobRow key={`${item.jobId}-${index}`} jobId={item.jobId} status={item.status}/>)}{tab === "History" && visibleHistory.map((item, index) => <JobRow key={`${item.jobId}-${index}`} jobId={item.jobId} status={item.status} note={item.note}/>)}</div>
  </div></div>;
}

function JobRow({ jobId, status, action, note }: { jobId: number | string; status?: ProposalStatus; action?: () => void; note?: string }) {
  const job = jobListingData.find(item => String(item.id) === String(jobId)); if (!job) return null;
  const colors: Record<ProposalStatus, string> = { Pending: "border-brand text-brand", Applied: "border-accent-green text-[#27886d]", Rejected: "border-accent-red text-accent-red", "On-going": "border-accent-light-blue text-accent-light-blue", Hired: "border-accent-green text-[#27886d]" };
  return <article className="flex items-center gap-3 py-3"><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-brand">{job.role}</h3><div className="mt-1 flex flex-wrap gap-3 text-[10px] text-neutral-60"><span className="flex items-center gap-1"><BriefcaseBusiness size={11}/>Nomad</span><span className="flex items-center gap-1"><MapPin size={11}/>Kinshasa</span></div><p className="mt-1 text-[10px] text-neutral-60">$10 – $60 / hour · 12 months contract · {job.job_type}</p></div><div className="text-right">{action ? <button onClick={action} className="flex h-9 items-center gap-1.5 bg-brand px-3 text-xs font-bold text-white"><Send size={13}/>Send proposal</button> : status && <span className={`inline-flex border px-3 py-1.5 text-[10px] font-bold ${colors[status]}`}>{status}</span>}{note && <p className="mt-1 max-w-44 text-[9px] text-neutral-60">{note}</p>} {status && <Link href={`/company/job-listing/${jobId}`} className="mt-1 flex items-center justify-end gap-1 text-[9px] font-semibold text-brand underline"><Eye size={10}/>View on ATS</Link>}</div></article>;
}

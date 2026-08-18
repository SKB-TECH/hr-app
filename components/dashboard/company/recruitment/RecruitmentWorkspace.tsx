"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleSlash2, Clock3, Eye, History, Info, Mail, MoreVertical, MoveRight, Search, Sparkles, UserRound, X } from "lucide-react";
import { getCandidatesAppliedJob } from "@/lib/company_applicant";

type Stage = "Screening" | "Interview" | "Evaluation" | "Offer" | "Hired";
type Candidate = { id: number; name: string; avatar: string; score: number; stage: Stage; appliedDate: string; role: string; event: string };

const fallbackNames = ["Liam Carter", "Sophia Bennett", "Selena Brown", "Lorand Rawes", "Emma Taylor", "Ethan Mitchell", "Ava Reynolds", "Lucas Morgan", "Isabella Clarke", "Mason Hughes"];
const avatars = ["/team/person1.png", "/team/person2.png", "/team/person3.png", "/team/person4.png", "/team/person5.png", "/team/person6.png", "/team/person7.png", "/team/person8.png", "/team/person9.png", "/team/person10.png"];
const scores = [96, 88, 74, 69, 61, 93, 84, 78, 91, 66];
const stages: Stage[] = ["Screening", "Interview", "Evaluation", "Offer", "Hired"];

function initialCandidates(jobId: number | string, role: string): Candidate[] {
  const source = getCandidatesAppliedJob(Number(jobId));
  return fallbackNames.map((name, index) => {
    const original = source[index];
    return {
      id: original?.id ?? 100 + index,
      name,
      avatar: original?.avatar ?? avatars[index],
      score: original ? (original.score <= 5 ? Math.round(original.score * 20) : Math.round(original.score)) : scores[index],
      stage: index < 5 ? "Screening" : index < 8 ? "Interview" : index === 8 ? "Evaluation" : "Offer",
      appliedDate: original?.appliedDate ?? "11 August, 2026",
      role,
      event: index % 3 === 0 ? "Screening call · Aug 14, 10:30" : index % 3 === 1 ? "Interview · Not scheduled" : "Evaluation · Awaiting feedback",
    };
  });
}

function Score({ value }: { value: number }) {
  const tone = value >= 85 ? "bg-accent-light-green text-[#27886d]" : value >= 70 ? "bg-accent-light-yellow text-[#b26910]" : "bg-accent-light-red text-accent-red";
  return <span className={`inline-flex min-w-16 justify-center px-2.5 py-1 text-xs font-bold ${tone}`}>{value}%</span>;
}

export default function RecruitmentWorkspace({ jobId, role }: { jobId: number | string; role: string }) {
  const [tab, setTab] = useState<"applications" | "pipeline" | "rejected">("applications");
  const [candidates, setCandidates] = useState(() => initialCandidates(jobId, role));
  const [rejected, setRejected] = useState<Candidate[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [moveOpen, setMoveOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [details, setDetails] = useState<Candidate | null>(null);
  const [schedule, setSchedule] = useState<Candidate | null>(null);
  const [toast, setToast] = useState("");

  const visible = useMemo(() => candidates.filter(c => c.name.toLowerCase().includes(query.toLowerCase())), [candidates, query]);
  const toggle = (id: number) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const move = (stage: Stage, ids = selected) => {
    setCandidates(list => list.map(c => ids.includes(c.id) ? { ...c, stage, event: stage === "Hired" ? "Hired" : `${stage} · Not scheduled` } : c));
    setSelected([]); setMoveOpen(false); setActiveMenu(null); setToast(`${ids.length} candidate${ids.length > 1 ? "s" : ""} moved to ${stage}`);
    window.setTimeout(() => setToast(""), 2600);
  };
  const reject = (ids: number[]) => {
    const removed = candidates.filter(c => ids.includes(c.id));
    setRejected(list => [...removed, ...list]);
    setCandidates(list => list.filter(c => !ids.includes(c.id)));
    setSelected([]);
    setToast(`${removed.length} candidate${removed.length > 1 ? "s" : ""} rejected`);
  };

  return (
    <section className="relative min-h-[610px] border border-brand-light-neutral bg-white">
      <div className="flex flex-col gap-4 border-b border-brand-light-neutral px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex gap-6 overflow-x-auto">
          {([["applications", "Applications"], ["pipeline", "Recruitment process"], ["rejected", "Rejected"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`relative whitespace-nowrap py-2 text-sm font-semibold ${tab === key ? "text-brand" : "text-neutral-60"}`}>
              {label}{tab === key && <span className="absolute inset-x-0 -bottom-4 h-0.5 bg-brand" />}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-10 min-w-52 flex-1 items-center gap-2 border border-brand-light-neutral px-3 text-neutral-60 lg:flex-none">
            <Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search candidates" className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-60" />
          </label>
          <button className="flex h-10 items-center gap-2 bg-brand px-4 text-sm font-semibold text-white hover:bg-indigo-700"><Sparkles size={16} />AI Recruiter</button>
          <button onClick={() => setToast("Matching scores recalculated")} className="flex h-10 items-center gap-2 border border-brand px-4 text-sm font-semibold text-brand hover:bg-accent-light-brand"><Sparkles size={16} />Calculate</button>
        </div>
      </div>

      {tab === "applications" && (
        <div className="p-4 lg:p-6">
          {selected.length > 0 && <div className="mb-4 flex flex-wrap items-center justify-between gap-3 bg-accent-light-brand px-4 py-3 text-sm"><span className="font-semibold text-neutral-100">{selected.length} candidate{selected.length > 1 ? "s" : ""} selected</span><div className="relative flex gap-2"><button onClick={() => reject(selected)} className="flex h-9 items-center gap-2 border border-accent-red px-3 font-semibold text-accent-red"><CircleSlash2 size={15}/>Reject</button><button onClick={() => setMoveOpen(v => !v)} className="flex h-9 items-center gap-2 bg-brand px-4 font-semibold text-white"><MoveRight size={15}/>Move<ChevronDown size={14}/></button>{moveOpen && <StageMenu onSelect={move} />}</div></div>}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="border-y border-brand-light-neutral text-xs font-semibold uppercase tracking-wide text-neutral-60"><tr><th className="w-12 px-3 py-4"><input type="checkbox" checked={visible.length > 0 && selected.length === visible.length} onChange={() => setSelected(selected.length === visible.length ? [] : visible.map(c => c.id))} /></th><th>Candidate</th><th>Applied</th><th>Location</th><th>Matching</th><th className="text-right">Actions</th></tr></thead>
              <tbody>{visible.map(c => <tr key={c.id} className="border-b border-[#edf0f6] hover:bg-[#fafaff]"><td className="px-3 py-3"><input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggle(c.id)} /></td><td className="py-3"><div className="flex items-center gap-3"><Image src={c.avatar} alt="" width={38} height={38} className="size-9 rounded-full object-cover"/><div><p className="font-semibold text-neutral-100">{c.name}</p><p className="mt-0.5 text-xs text-neutral-60">{c.role}</p></div></div></td><td className="text-neutral-60">{c.appliedDate}</td><td className="text-neutral-60">Kinshasa</td><td><Score value={c.score}/></td><td><div className="flex justify-end gap-1"><button onClick={() => setDetails(c)} title="View details" className="grid size-9 place-items-center text-neutral-60 hover:bg-accent-light-brand hover:text-brand"><Info size={16}/></button><button onClick={() => reject([c.id])} title="Reject" className="grid size-9 place-items-center text-neutral-60 hover:bg-accent-light-red hover:text-accent-red"><CircleSlash2 size={17}/></button><button onClick={() => move("Interview", [c.id])} title="Move to interview" className="grid size-9 place-items-center text-brand hover:bg-accent-light-brand"><MoveRight size={17}/></button></div></td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-6 flex items-center justify-center gap-1 text-sm"><button className="grid size-9 place-items-center border border-brand-light-neutral"><ChevronLeft size={16}/></button><button className="size-9 bg-brand text-white">1</button><button className="size-9 text-neutral-60">2</button><button className="size-9 text-neutral-60">3</button><button className="grid size-9 place-items-center border border-brand-light-neutral"><ChevronRight size={16}/></button></div>
        </div>
      )}

      {tab === "pipeline" && <Pipeline candidates={visible} activeMenu={activeMenu} setActiveMenu={setActiveMenu} onDetails={setDetails} onSchedule={setSchedule} onMove={move} />}
      {tab === "rejected" && (rejected.length ? <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">{rejected.map(c => <article key={c.id} className="flex items-center gap-3 border border-brand-light-neutral p-4"><Image src={c.avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-neutral-100">{c.name}</p><p className="truncate text-xs text-neutral-60">{c.role}</p></div><button onClick={() => { setCandidates(list => [{...c, stage: "Screening"}, ...list]); setRejected(list => list.filter(x => x.id !== c.id)); }} className="text-xs font-bold text-brand">Restore</button></article>)}</div> : <div className="grid min-h-[420px] place-items-center text-center"><div><CircleSlash2 className="mx-auto mb-3 text-neutral-60"/><h3 className="font-bold text-neutral-100">No rejected candidates</h3><p className="mt-1 text-sm text-neutral-60">Rejected applications will appear here.</p></div></div>)}
      {details && <DetailsModal candidate={details} onClose={() => setDetails(null)} />}
      {schedule && <ScheduleModal candidate={schedule} onClose={() => setSchedule(null)} onSave={() => { setSchedule(null); setToast("Interview scheduled successfully"); }} />}
      {toast && <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-100 px-4 py-3 text-sm font-semibold text-white shadow-xl"><Check size={17} className="text-accent-green"/>{toast}</div>}
    </section>
  );
}

function StageMenu({ onSelect }: { onSelect: (stage: Stage) => void }) {
  return <div className="absolute right-0 top-11 z-30 w-56 border border-brand-light-neutral bg-white p-3 shadow-xl"><p className="mb-2 px-2 text-xs font-bold uppercase text-neutral-60">Select next step</p>{stages.map(s => <button key={s} onClick={() => onSelect(s)} className="flex w-full items-center gap-2 px-2 py-2 text-left text-sm text-neutral-100 hover:bg-accent-light-brand"><span className="size-3 border border-brand-light-neutral"/>{s}</button>)}</div>;
}

function Pipeline({ candidates, activeMenu, setActiveMenu, onDetails, onSchedule, onMove }: { candidates: Candidate[]; activeMenu: number | null; setActiveMenu: (id: number | null) => void; onDetails: (c: Candidate) => void; onSchedule: (c: Candidate) => void; onMove: (s: Stage, ids: number[]) => void }) {
  const [dropTarget, setDropTarget] = useState<Stage | null>(null);
  return <div className="overflow-x-auto p-4 lg:p-6"><div className="grid min-w-[1080px] grid-cols-5 gap-3">{stages.map(stage => { const items = candidates.filter(c => c.stage === stage); return <section key={stage} onDragOver={event => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; setDropTarget(stage); }} onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDropTarget(null); }} onDrop={event => { event.preventDefault(); const id = Number(event.dataTransfer.getData("text/candidate-id")); if (id) onMove(stage, [id]); setDropTarget(null); }} className={`min-h-[460px] border-2 p-3 transition-colors ${dropTarget === stage ? "border-brand bg-accent-light-brand" : "border-transparent bg-[#f8f8fb]"}`}><h3 className="mb-4 text-center text-sm font-bold text-brand">{stage} <span className="text-neutral-60">({items.length})</span></h3><div className="space-y-3">{items.map(c => <article key={c.id} draggable onDragStart={event => { event.dataTransfer.setData("text/candidate-id", String(c.id)); event.dataTransfer.effectAllowed = "move"; setActiveMenu(null); }} onDragEnd={()=>setDropTarget(null)} className="relative cursor-grab border border-[#e8eaf2] bg-white p-3 shadow-sm transition hover:border-brand hover:shadow-md active:cursor-grabbing active:opacity-60"><div className="flex items-start gap-2"><Image src={c.avatar} alt="" width={34} height={34} className="size-8 rounded-full object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-neutral-100">{c.name}</p><p className="truncate text-[10px] text-neutral-60">{c.role}</p></div><button onPointerDown={event=>event.stopPropagation()} onClick={() => setActiveMenu(activeMenu === c.id ? null : c.id)}><MoreVertical size={15} className="text-neutral-60"/></button></div><div className={`mt-3 flex items-center gap-1.5 text-[10px] ${c.event.includes("Not") || c.event.includes("Awaiting") ? "text-accent-yellow" : "text-[#38a783]"}`}><CalendarDays size={12}/><span className="truncate">{c.event}</span></div>{activeMenu === c.id && <div className="absolute right-2 top-10 z-20 w-36 border border-brand-light-neutral bg-white py-1 shadow-xl"><button onClick={() => onDetails(c)} className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-accent-light-brand"><Eye size={13}/>Details</button><button className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-accent-light-brand"><History size={13}/>History</button><button className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-accent-light-brand"><Mail size={13}/>Message</button>{stage !== "Hired" && <button onClick={() => onSchedule(c)} className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-accent-light-brand"><CalendarDays size={13}/>Schedule</button>}{stage !== "Hired" && <button onClick={() => onMove(stages[Math.min(stages.indexOf(stage)+1, 4)], [c.id])} className="flex w-full items-center gap-2 px-3 py-2 text-xs text-brand hover:bg-accent-light-brand"><MoveRight size={13}/>Next step</button>}</div>}</article>)}</div></section>; })}</div></div>;
}

function ModalFrame({ children, onClose }: { children: React.ReactNode; onClose: () => void }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-neutral-100/50 p-4 backdrop-blur-[1px]" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl lg:p-8"><button onClick={onClose} className="absolute right-4 top-4 grid size-8 place-items-center text-neutral-60 hover:bg-[#f4f4fa]"><X size={18}/></button>{children}</div></div>; }

function DetailsModal({ candidate, onClose }: { candidate: Candidate; onClose: () => void }) { return <ModalFrame onClose={onClose}><h2 className="text-center text-lg font-bold text-neutral-100">Candidate details</h2><div className="mt-6 flex items-center gap-3 border-b border-brand-light-neutral pb-5"><Image src={candidate.avatar} alt="" width={48} height={48} className="size-12 rounded-full object-cover"/><div><p className="font-bold text-neutral-100">{candidate.name}</p><p className="text-xs text-neutral-60">{candidate.role}</p></div><div className="ml-auto"><Score value={candidate.score}/></div></div><div className="space-y-4 py-5 text-sm"><p className="flex gap-3"><UserRound size={17} className="text-brand"/><span><b>Location:</b> Kinshasa, DRC</span></p><p className="flex gap-3"><Mail size={17} className="text-brand"/><span>{candidate.name.toLowerCase().replace(" ", ".")}@email.com</span></p><p className="flex gap-3"><Clock3 size={17} className="text-brand"/><span><b>Current stage:</b> {candidate.stage}</span></p></div><div className="border-t border-brand-light-neutral pt-5"><h3 className="font-bold text-neutral-100">Recruiter notes</h3><ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-6 text-neutral-80"><li>Demonstrated strong problem-solving skills and communicates decisions clearly.</li><li>Solid experience working with cross-functional teams in fast-paced environments.</li><li>Strong cultural alignment and thoughtful questions about the role.</li></ul></div></ModalFrame>; }

function ScheduleModal({ candidate, onClose, onSave }: { candidate: Candidate; onClose: () => void; onSave: () => void }) { const days = Array.from({length: 35}, (_, i) => i < 5 ? 27 + i : i - 4); return <ModalFrame onClose={onClose}><h2 className="text-center text-lg font-bold text-neutral-100">Schedule interview</h2><div className="mx-auto mt-4 flex w-fit items-center gap-2"><Image src={candidate.avatar} alt="" width={34} height={34} className="size-8 rounded-full object-cover"/><div><p className="text-xs font-bold">{candidate.name}</p><p className="text-[10px] text-neutral-60">{candidate.role}</p></div></div><label className="mt-6 block text-xs font-bold text-neutral-80">Date</label><div className="mt-2 border border-brand-light-neutral p-4"><div className="mb-4 flex items-center justify-between"><ChevronLeft size={17}/><b className="text-sm">August 2026</b><ChevronRight size={17}/></div><div className="grid grid-cols-7 gap-1 text-center text-xs">{"Mon Tue Wed Thu Fri Sat Sun".split(" ").map(d => <b key={d} className="py-2 text-neutral-60">{d}</b>)}{days.map((d,i) => <button key={i} className={`aspect-square ${d === 14 ? "bg-brand text-white" : i < 5 ? "text-neutral-60" : "hover:bg-accent-light-brand"}`}>{d}</button>)}</div></div><div className="mt-4 grid grid-cols-2 gap-3"><label className="text-xs font-bold text-neutral-80">Hour<select className="mt-2 block h-11 w-full border border-brand-light-neutral bg-white px-3 font-normal"><option>10</option><option>11</option><option>14</option></select></label><label className="text-xs font-bold text-neutral-80">Minutes<select className="mt-2 block h-11 w-full border border-brand-light-neutral bg-white px-3 font-normal"><option>30</option><option>00</option><option>45</option></select></label></div><button onClick={onSave} className="mx-auto mt-6 flex h-11 items-center gap-2 bg-brand px-5 text-sm font-bold text-white"><CalendarDays size={16}/>Schedule</button></ModalFrame>; }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bars3BottomLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CalendarDays, Clock3, MapPin, Video, X } from "lucide-react";
import { MiniCalendar, toDateStr, today } from "@/components/dashboard/company/schedule/MiniCalendar";
import { WeekGrid } from "@/components/dashboard/company/schedule/WeekGrid";
import type { Interview } from "@/core/types/application";
import type { CalEvent } from "@/types/schedule";

const MONTHS = ["JANVIER", "FÉVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOÛT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DÉCEMBRE"];

function weekDays(anchor: Date) {
  const start = new Date(anchor);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date; });
}

function toCalendarEvent(interview: Interview): CalEvent {
  const start = new Date(interview.scheduledAt);
  const end = new Date(interview.endTime);
  return {
    id: interview.id,
    title: interview.application?.fullName ? `${interview.title} · ${interview.application.fullName}` : interview.title,
    date: toDateStr(start),
    startHour: start.getHours(),
    endHour: Math.max(start.getHours() + 1, Math.ceil(end.getHours() + end.getMinutes() / 60)),
    color: "bg-[#26a4ff]",
    category: "interview",
  };
}

export default function InterviewScheduleCalendar({ interviews, role }: { interviews: Interview[]; role: "candidate" | "company" }) {
  const [anchor, setAnchor] = useState(today());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const days = useMemo(() => weekDays(anchor), [anchor]);
  const events = useMemo(() => interviews.map(toCalendarEvent), [interviews]);
  const upcoming = useMemo(() => interviews.filter((item) => new Date(item.endTime).getTime() >= Date.now()).slice(0, 4), [interviews]);
  function moveWeek(amount: number) { setAnchor((current) => { const next = new Date(current); next.setDate(next.getDate() + amount * 7); return next; }); }

  return <main className="flex h-full min-h-[720px] flex-col overflow-hidden bg-white">
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-brand-light-neutral px-4 lg:px-6">
      <div className="flex items-center gap-3"><button onClick={() => setFiltersOpen(true)} className="grid size-9 place-items-center border border-brand-light-neutral text-brand sm:hidden"><Bars3BottomLeftIcon className="size-5"/></button><h1 className="text-xl font-bold">Mon calendrier</h1><button onClick={() => setAnchor(today())} className="border border-[#ccccf5] px-4 py-2 text-xs font-bold text-brand">Aujourd’hui</button></div>
      <div className="hidden items-center gap-4 sm:flex"><button onClick={() => moveWeek(-1)} aria-label="Semaine précédente"><ChevronLeftIcon className="size-4 text-brand"/></button><strong className="min-w-44 text-center text-xs">{MONTHS[anchor.getMonth()]} {anchor.getFullYear()}</strong><button onClick={() => moveWeek(1)} aria-label="Semaine suivante"><ChevronRightIcon className="size-4 text-brand"/></button></div>
      <span className="border-b-2 border-brand px-4 py-5 text-xs font-bold">Semaine</span>
    </header>
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      {filtersOpen && <button aria-label="Fermer" onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-30 bg-black/35 sm:hidden"/>}
      <aside className={`absolute inset-y-0 left-0 z-40 w-72 shrink-0 overflow-y-auto border-r border-brand-light-neutral bg-white transition-transform sm:relative sm:z-auto sm:translate-x-0 ${filtersOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-end p-3 sm:hidden"><button onClick={() => setFiltersOpen(false)}><X size={20}/></button></div>
        {role === "company" && <div className="border-b border-brand-light-neutral p-4"><Link href="/company/applicants" className="flex h-11 items-center justify-center bg-brand text-sm font-bold text-white">+ Planifier un entretien</Link></div>}
        <MiniCalendar selected={anchor} onSelect={(date) => { setAnchor(date); setFiltersOpen(false); }}/>
        <div className="border-t border-brand-light-neutral p-4"><h2 className="text-xs font-bold uppercase">Catégories</h2><label className="mt-4 flex items-center gap-3 text-sm"><span className="grid size-4 place-items-center bg-brand text-xs text-white">✓</span>Entretiens</label></div>
        <div className="border-t border-brand-light-neutral p-4"><h2 className="text-xs font-bold uppercase">À venir</h2><div className="mt-3 space-y-3">{upcoming.map((item) => <InterviewSummary key={item.id} interview={item}/>) }{upcoming.length === 0 && <p className="text-xs text-neutral-60">Aucun entretien à venir.</p>}</div></div>
      </aside>
      <WeekGrid weekDays={days} events={events} onAddEvent={() => {}}/>
    </div>
  </main>;
}

function InterviewSummary({ interview }: { interview: Interview }) {
  const date = new Date(interview.scheduledAt);
  return <article className="border-l-2 border-[#26a4ff] pl-3"><p className="line-clamp-2 text-xs font-bold">{interview.title}</p><p className="mt-1 flex items-center gap-1 text-[11px] text-neutral-60"><CalendarDays size={12}/>{date.toLocaleDateString()} · <Clock3 size={12}/>{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p><p className="mt-1 flex items-center gap-1 text-[11px] text-neutral-60"><MapPin size={12}/>{interview.location || "En ligne"} <Video size={12}/>{interview.status}</p></article>;
}

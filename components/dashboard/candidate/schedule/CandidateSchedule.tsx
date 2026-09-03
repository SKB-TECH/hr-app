"use client";

import InterviewScheduleCalendar from "@/components/dashboard/schedule/InterviewScheduleCalendar";
import { useMyInterviews } from "@/core/hooks/interviews/use-my-interviews";

export default function CandidateSchedule() {
  const interviews = useMyInterviews();
  if (interviews.isError) return <div className="py-20 text-center"><p className="font-bold">Impossible de charger votre calendrier.</p><button onClick={() => void interviews.refetch()} className="mt-4 bg-brand px-5 py-2 text-white">Réessayer</button></div>;
  if (interviews.isPending) return <p className="py-20 text-center text-neutral-60">Chargement du calendrier…</p>;
  return <InterviewScheduleCalendar interviews={interviews.data ?? []} role="candidate"/>;
}

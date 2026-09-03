"use client";

import InterviewScheduleCalendar from "@/components/dashboard/schedule/InterviewScheduleCalendar";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useCompanyInterviews } from "@/core/hooks/interviews/use-company-interviews";

export default function CompanySchedule() {
  const company = useMyCompany();
  const interviews = useCompanyInterviews(company.data?.id || "");
  if (company.isError || interviews.isError) return <ScheduleError retry={() => { void company.refetch(); void interviews.refetch(); }}/>;
  if (company.isPending || interviews.isPending) return <p className="py-20 text-center text-neutral-60">Chargement du calendrier…</p>;
  return <InterviewScheduleCalendar interviews={interviews.data ?? []} role="company"/>;
}

function ScheduleError({ retry }: { retry: () => void }) { return <div className="py-20 text-center"><p className="font-bold">Impossible de charger le calendrier.</p><button onClick={retry} className="mt-4 bg-brand px-5 py-2 text-white">Réessayer</button></div>; }

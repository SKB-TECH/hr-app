"use client";

import { MessageSquareText } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useApplication } from '@/core/hooks/applications/use-application';

export default function ProposeJobMessageButton({ applicationId }: { applicationId: string }) {
  const application = useApplication(applicationId);
  if (!application.data) return null;
  return <Link href={`/company/messages?candidateId=${application.data.candidateId}&jobId=${application.data.jobId}`} className="fixed bottom-6 right-6 z-30 inline-flex h-12 items-center gap-2 bg-brand px-5 text-sm font-bold text-white shadow-xl hover:bg-[#3730c4]"><MessageSquareText size={18}/>Proposer cette offre par message</Link>;
}

"use client";

import { Download } from "lucide-react";
import { useApplication } from "@/core/hooks/applications/use-application";

export default function ApplicationResumeButton({ applicationId }: { applicationId: string }) {
  const application = useApplication(applicationId);
  if (!application.data?.resume) return null;

  return (
    <a
      href={`/api/proxy/applications/${applicationId}/resume`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-brand shadow-lg ring-1 ring-brand/20 hover:bg-accent-light-brand"
    >
      <Download size={17} />
      Télécharger le CV
    </a>
  );
}

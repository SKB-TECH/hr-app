"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  Eye,
  MapPin,
  Search,
  Send,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCompanyJobs } from "@/core/hooks/jobs/use-company-jobs";
import {
  createConversation,
  getConversations,
} from "@/core/services/messages/messages.service";
import { mediaUrl } from "@/core/lib/media-url";
import type { CompanyApplication } from "@/core/types/application";
import type { ChatMessage } from "@/core/types/message";
import type { CompanyJob } from "@/core/types/job";

type Tab = "Jobs" | "Proposed" | "History";

export default function ProposeJobModal({
  application,
  companyId,
  onClose,
}: {
  application: CompanyApplication;
  companyId: string;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("Jobs");
  const [query, setQuery] = useState("");
  const [proposals, setProposals] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState<string | null>(null);
  const jobs = useCompanyJobs(companyId, { limit: 100 });
  useEffect(() => {
    getConversations()
      .then((items) => {
        const conversation = items.find(
          (item) => item.candidateId === application.candidateId,
        );
        setProposals(
          conversation?.messages.filter(
            (message) => message.type === "JOB_PROPOSAL",
          ) ?? [],
        );
      })
      .catch(() => setProposals([]));
  }, [application.candidateId]);
  const rows = useMemo(
    () =>
      (jobs.data?.data ?? []).filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [jobs.data, query],
  );
  const proposedIds = new Set(proposals.map((message) => message.jobId));
  async function propose(job: CompanyJob) {
    setSending(job.id);
    try {
      const conversation = await createConversation(
        application.candidateId,
        job.id,
        `Bonjour ${application.fullName}, nous pensons que votre profil correspond à cette opportunité.`,
      );
      setProposals(
        conversation.messages.filter(
          (message) => message.type === "JOB_PROPOSAL",
        ),
      );
      toast.success("Proposition envoyée dans la messagerie.");
    } catch {
      toast.error("Impossible d’envoyer cette proposition.");
    } finally {
      setSending(null);
    }
  }
  const visibleJobs =
    tab === "Jobs"
      ? rows
      : proposals
          .map((message) => message.job)
          .filter((job): job is CompanyJob => Boolean(job))
          .filter((job) =>
            job.title.toLowerCase().includes(query.toLowerCase()),
          );
  const avatar = application.candidate?.avatar
    ? mediaUrl(application.candidate.avatar)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-neutral-100/55 p-4 backdrop-blur-[1px]"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl lg:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center text-neutral-60 hover:bg-[#f4f4fa]"
        >
          <X size={18} />
        </button>
        <h2 className="text-center text-lg font-bold text-neutral-100">
          Propose job
        </h2>
        <div className="mt-5 flex items-center gap-3">
          {avatar ? (
            <Image
              src={avatar}
              alt=""
              width={52}
              height={52}
              className="size-12 rounded-full border-2 border-brand object-cover"
            />
          ) : (
            <span className="grid size-12 place-items-center rounded-full border-2 border-brand bg-accent-light-brand font-bold text-brand">
              {application.fullName.slice(0, 1)}
            </span>
          )}
          <div>
            <p className="text-sm font-bold text-brand">
              {application.fullName}
            </p>
            <p className="mt-0.5 text-xs text-neutral-60">
              {application.currentJobTitle || "Candidat"}
            </p>
          </div>
        </div>
        <div className="mt-5 flex border-b border-brand-light-neutral">
          {(["Jobs", "Proposed", "History"] as const).map((name) => (
            <button
              key={name}
              onClick={() => setTab(name)}
              className={`relative px-4 py-3 text-sm font-bold ${tab === name ? "text-brand" : "text-neutral-60"}`}
            >
              {name}
              {tab === name && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 bg-brand" />
              )}
            </button>
          ))}
        </div>
        <label className="mt-4 flex h-10 items-center gap-2 bg-[#f5f5f7] px-3 text-neutral-60">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for job"
            className="w-full bg-transparent text-xs outline-none"
          />
        </label>
        <div className="mt-3 divide-y divide-[#edf0f6]">
          {jobs.isPending ? (
            <p className="py-8 text-center text-sm text-neutral-60">
              Chargement des offres…
            </p>
          ) : (
            visibleJobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                proposed={proposedIds.has(job.id)}
                history={tab === "History"}
                sending={sending === job.id}
                onPropose={() => void propose(job)}
              />
            ))
          )}
          {!jobs.isPending && visibleJobs.length === 0 && (
            <p className="py-8 text-center text-sm text-neutral-60">
              Aucune offre dans cette section.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function JobRow({
  job,
  proposed,
  history,
  sending,
  onPropose,
}: {
  job: CompanyJob;
  proposed: boolean;
  history: boolean;
  sending: boolean;
  onPropose: () => void;
}) {
  return (
    <article className="flex items-center gap-3 py-4">
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-brand">{job.title}</h3>
        <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-neutral-60">
          <span className="flex items-center gap-1">
            <BriefcaseBusiness size={11} />
            {job.companyName || "Votre entreprise"}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {job.location || "Remote"}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-neutral-60">
          {job.employmentTypes.join(", ")}
          {job.minSalary != null
            ? ` · ${job.minSalary}–${job.maxSalary ?? job.minSalary} USD`
            : ""}
        </p>
      </div>
      <div className="text-right">
        {proposed ? (
          <>
            <span className="inline-flex items-center gap-1 border border-brand px-3 py-1.5 text-[10px] font-bold text-brand">
              <Check size={11} />
              Proposed
            </span>
            <Link
              href={`/company/job-listing/${job.id}`}
              className="mt-2 flex items-center justify-end gap-1 text-[9px] font-semibold text-brand underline"
            >
              <Eye size={10} />
              {history ? "View on ATS" : "Open job"}
            </Link>
          </>
        ) : (
          <button
            onClick={onPropose}
            disabled={sending}
            className="flex h-9 items-center gap-1.5 bg-brand px-3 text-xs font-bold text-white disabled:opacity-50"
          >
            <Send size={13} />
            {sending ? "Sending…" : "Send proposal"}
          </button>
        )}
      </div>
    </article>
  );
}

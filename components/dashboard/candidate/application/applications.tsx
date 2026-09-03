"use client";

import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import Pager from "./pager";
import TopHeader from "./TopHeader";
import Banner from "./Banner";
import ApplicationsTable from "./applicationTable";
import Controls from "./controls";
import ApplicationsTabs from "./applicationTabs";
import { useMyApplications } from "@/core/hooks/applications/use-my-applications";
import { useDebouncedValue } from "@/core/hooks/shared/use-debounced-value";
import { SectionSkeleton } from "../applicant/profile/shared/Skeleton";

const PAGE_SIZE = 5;
const FETCH_LIMIT = 100;

function stageTabKey(stageName: string) {
  const label = stageName.toLowerCase();
  if (label.includes("interview")) return "interviewing";
  if (label.includes("assess")) return "assessment";
  if (label.includes("offer")) return "offered";
  if (label.includes("hire")) return "hired";
  return "in_review";
}

export default function Applications() {
  const [tab, setTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search, 300);

  const { data: applicationsPage, isLoading, isError } = useMyApplications({
    search: debouncedSearch,
    limit: FETCH_LIMIT,
  });
  const applications = applicationsPage?.data ?? [];

  const items = useMemo(
    () =>
      applications.map((application) => {
        const statusLabel = application.stage?.name || "In Review";
        return {
          id: application.id,
          companyName: application.job.companyName || "—",
          role: application.job.title,
          dateApplied: format(parseISO(application.appliedAt), "d MMMM yyyy"),
          status: statusLabel,
          logo: application.job.companyLogoUrl || "/logo/lgo.png",
          location: application.job.location || undefined,
          tabKey: stageTabKey(statusLabel),
        };
      }),
    [applications],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: items.length };
    for (const item of items) map[item.tabKey] = (map[item.tabKey] || 0) + 1;
    return map;
  }, [items]);

  const filtered = tab === "all" ? items : items.filter((item) => item.tabKey === tab);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="px-5 md:px-5 py-6 md:py-8">
      <TopHeader />
      <Banner />

      <ApplicationsTabs
        value={tab}
        onChange={(v) => {
          setTab(v);
          setPage(1);
        }}
        counts={counts}
      />

      <Controls
        search={search}
        setSearch={(s) => {
          setSearch(s);
          setPage(1);
        }}
      />

      {isLoading && (
        <div className="mt-6 bg-white p-5">
          <SectionSkeleton rows={4} />
        </div>
      )}

      {!isLoading && isError && (
        <div className="p-6 bg-white mt-4 text-center text-gray-500">
          We couldn&apos;t load your applications right now. Please refresh the page to try again.
        </div>
      )}

      {!isLoading && !isError && <ApplicationsTable items={pageItems} />}

      {!isLoading && !isError && filtered.length > 0 && (
        <Pager currentPage={page} totalPages={totalPages} onChange={(p) => setPage(p)} />
      )}
    </div>
  );
}

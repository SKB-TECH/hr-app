"use client";

import React, { useMemo, useState } from "react";
import Pager from "./pager";
import TopHeader from "./TopHeader";
import Banner from "./Banner";
import ApplicationsTable from "./applicationTable";
import Controls from "./controls";
import ApplicationsTabs from "./applicationTabs";
import { application } from "./data";




export default function Applications() {
  const [tab, setTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: application.length } as Record<
      string,
      number
    >;
    for (const a of application) {
      const key = a.status.toLowerCase().replace(/\s+/g, "_");
      map[key] = (map[key] || 0) + 1;
    }
    return map;
  }, []);

const filtered = useMemo(() => {
  const q = search.trim().toLowerCase();

  let items = application.slice();

  // Tab filter
  if (tab !== "all") {
    const statusLabel = {
      in_review: "In Review",
      interviewing: "Interviewing",
      assessment: "Assessment",
      offered: "Offered",
      hired: "Hired",
    }[tab];

    if (statusLabel) {
      items = items.filter((item) => item.status === statusLabel);
    }
  }

  // Search filter
  if (q) {
    items = items.filter(
      (item) =>
        item.companyName.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        (item.location ?? "").toLowerCase().includes(q),
    );
  }

  return items;
}, [tab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

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
        <ApplicationsTable items={pageItems} />

      {/* <ApplicationsTable items={pageItems} /> */}
      <Pager
        currentPage={page}
        totalPages={totalPages}
        onChange={(p) => setPage(p)}
      />
    </div>
  );
}

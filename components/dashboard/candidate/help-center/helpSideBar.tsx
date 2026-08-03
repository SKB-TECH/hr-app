"use client"
import {
  Search,
} from "lucide-react";
import { ContactCard } from "./contactCard";
import { HelpNavBar } from "./helpNavBar";
import { useState } from "react";
import NewPage from "./newPage";
import HelpContent from "./helpContent";

export default function HelpSideBar() {
    const [tab, setTab] = useState("Getting Started");
  return (
    <div className="bg-white">
      <div className="mx-auto flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <aside className="w-full border-r border-neutral-30 p-5 md:w-[384px] space-y-5">
          {/* search */}
          <h1 className="text-neutral-80 font-epilogue text-sm">
            Type your question or search keyword
          </h1>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-80"
            />

            <input
              type="text"
              placeholder="Search"
              className="w-full  border border-neutral-30 text-neutral-40 font-epilogue py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
            />
          </div>
          {/* nav */}
          <div className="-mb-5">
            <HelpNavBar value={tab} onChange={setTab} />
          </div>

          {/* contact us card */}
          <div className="hidden md:block">
            <ContactCard />
          </div>
        </aside>
        <main className="flex-1 p-5 ">
          {tab === "Getting Started" && <HelpContent />}
          {tab === "My Profile" && <NewPage />}
          {tab === "Applying for a job" && <NewPage />}
          {tab === "Job Search Tips" && <NewPage />}
          {tab === "Job Alerts" && <NewPage />}
        </main>
      </div>
    </div>
  );
}

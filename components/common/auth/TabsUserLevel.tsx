"use client";

import { useState } from "react";

type UserLevel = "job-seeker" | "company";

export default function TabsUserLevel() {
    const [activeTab, setActiveTab] = useState<UserLevel>("job-seeker");

    return (
        <div className="flex w-full flex-row items-center justify-center">
            <button
                type="button"
                onClick={() => setActiveTab("job-seeker")}
                className={`px-4 py-2 font-epilogue font-normal transition-colors ${
                    activeTab === "job-seeker"
                        ? "bg-purple-100 text-indigo-600"
                        : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
            >
                Job Seeker
            </button>

            <button
                type="button"
                onClick={() => setActiveTab("company")}
                className={`px-4 py-2 font-epilogue font-normal transition-colors ${
                    activeTab === "company"
                        ? "bg-purple-100 text-indigo-600"
                        : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
            >
                Company
            </button>
        </div>
    );
}
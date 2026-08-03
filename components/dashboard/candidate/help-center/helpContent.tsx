"use client"
import {
 ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import { Sort } from "./sort";
import { sortOptions } from "@/data/companyPageData";
import { ContactCard } from "./contactCard";
import { useState } from "react";


const articles = [
  {
    title: "What is My Applications?",
    description:
      "My Applications is a way for you to track jobs as you move through the application process. Depending on the job you applied to, you may also receive notifications indicating that an application has been actioned by an employer.",
  },
  {
    title: "How to access my applications history",
    description:
      "To access applications history, go to your My Applications page on your dashboard profile. You must be signed in to your JobHuntly account to view this page.",
  },
  {
    title: "Not seeing jobs you applied in your application list?",
    description:
      "Please note that we are unable to track materials submitted for jobs you apply to via an employer's site. As a result, these applications are not recorded in the My Applications section of your JobHuntly account. We suggest keeping a personal record of all positions you have applied to externally.",
  },
];

export default function HelpContent() {
  const [feedback, setFeedback] = useState<Record<string, "yes" | "no" | null>>(
    {},
  );
    return (
      <main className="flex-1 p-4 md:p-6">
        <Sort sortOptions={sortOptions} />

        <div className="space-y-5">
          {articles.map((article) => (
            <div
              key={article.title}
              className=" border border-neutral-30 bg-white p-5"
            >
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-xl font-semibold text-neutral-100">
                  {article.title}
                </h2>

                <button className="text-neutral-100 hover:text-neutral-600 cursor-pointer">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <p className="mb-6 text-sm leading-6 text-neutral-80">
                {article.description}
              </p>

              <div className="border-t border-neutral-30 pt-4">
                <div className="flex flex-col md:flex-row md:items-center items-start gap-3">
                  <div>
                    <span className="text-sm text-neutral-80">
                      Was this article helpful?
                    </span>
                  </div>

                  {/* like & dislike buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        setFeedback((prev) => ({
                          ...prev,
                          [article.title]: "yes",
                        }))
                      }
                      className={`flex items-center gap-2 border font-medium px-3 py-2 text-sm cursor-pointer transition-all
      ${
        feedback[article.title] === "yes"
          ? "bg-blue-100 border-blue-500 text-blue-600"
          : "border-neutral-30 text-brand hover:bg-gray-50"
      }`}
                    >
                      <ThumbsUp size={16} />
                      Yes
                    </button>
                    <button
                      onClick={() =>
                        setFeedback((prev) => ({
                          ...prev,
                          [article.title]: "no",
                        }))
                      }
                      className={`flex items-center gap-2 border font-medium px-3 py-2 text-sm cursor-pointer transition-all
      ${
        feedback[article.title] === "no"
          ? "bg-red-100 border-red-500 text-red-600"
          : "border-neutral-30 text-brand hover:bg-gray-50"
      }`}
                    >
                      <ThumbsDown size={16} />
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="block md:hidden">
            <ContactCard />
          </div>
        </div>
      </main>
    );
}
import type { Metadata } from "next";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Usage",
  description:
    "How Fast2Hire uses cookies and local storage to deliver a secure, personalized recruitment experience.",
};

export default function CookiesPage() {
  return (
    <main className="w-full bg-[#F8F8FD] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF2FF] text-[#4640DE] text-xs font-bold uppercase tracking-wider mb-4">
            <Cookie size={14} aria-hidden="true" />
            <span>Cookie Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#132745] tracking-tight">
            Cookie Usage Policy
          </h1>
          <p className="mt-2 text-sm text-[#7C8493]">
            Last updated: January 2026 &bull; Fast2Hire Inc.
          </p>

          <div className="mt-8 space-y-6 text-sm sm:text-base text-[#25324B] leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                1. Essential Cookies
              </h2>
              <p className="text-[#515B6F]">
                Essential cookies are required for secure authentication,
                session management, CSRF protection, and language preferences
                across Fast2Hire.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                2. Preference &amp; Saved Jobs Storage
              </h2>
              <p className="text-[#515B6F]">
                We use browser storage to remember your active job filters and
                bookmarked opportunities so you can seamlessly resume your
                search.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                3. Managing Cookies
              </h2>
              <p className="text-[#515B6F]">
                You can control or clear cookies at any time through your
                browser settings without affecting public job browsing.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}


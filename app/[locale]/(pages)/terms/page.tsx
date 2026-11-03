import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of Service and platform usage guidelines for Fast2Hire candidates and employers.",
};

export default function TermsPage() {
  return (
    <main className="w-full bg-[#F8F8FD] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF2FF] text-[#4640DE] text-xs font-bold uppercase tracking-wider mb-4">
            <FileText size={14} aria-hidden="true" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#132745] tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-[#7C8493]">
            Last updated: January 2026 &bull; Fast2Hire Inc.
          </p>

          <div className="mt-8 space-y-6 text-sm sm:text-base text-[#25324B] leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-[#515B6F]">
                By accessing or using Fast2Hire, you agree to comply with and be
                bound by these Terms &amp; Conditions governing our executive
                recruitment and talent matching services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                2. Employer &amp; Candidate Responsibilities
              </h2>
              <p className="text-[#515B6F]">
                Employers must post accurate, authentic job descriptions and
                role classifications. Candidates must provide truthful
                qualifications, work history, and professional credentials.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                3. Intellectual Property
              </h2>
              <p className="text-[#515B6F]">
                All platform content, branding, trademarks, and proprietary
                matching algorithms are the exclusive property of Fast2Hire Inc.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}


import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Fast2Hire collects, safeguards, and processes candidate and employer data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-[#F8F8FD] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF2FF] text-[#4640DE] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>Data Protection &amp; Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#132745] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-[#7C8493]">
            Last updated: January 2026 &bull; Fast2Hire Inc.
          </p>

          <div className="mt-8 space-y-6 text-sm sm:text-base text-[#25324B] leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                1. Information We Collect
              </h2>
              <p className="text-[#515B6F]">
                Fast2Hire collects professional profile information, resumes,
                employment history, and contact details voluntarily submitted by
                candidates and verified corporate employers to facilitate
                executive recruitment and talent matching.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                2. How We Use Your Data
              </h2>
              <p className="text-[#515B6F]">
                Your personal data is used strictly to match candidates with
                relevant job opportunities, process job applications, enable
                secure communication between candidates and hiring teams, and
                improve platform performance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                3. Confidentiality &amp; Security
              </h2>
              <p className="text-[#515B6F]">
                We implement enterprise-grade encryption, strict access
                controls, and confidential search protocols so your career data
                is only shared with employers you explicitly apply to or
                authorize.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                4. Contact Our Privacy Team
              </h2>
              <p className="text-[#515B6F]">
                For privacy inquiries or data access requests, contact us at{" "}
                <a
                  href="mailto:contact@fast2hire.com"
                  className="text-[#4640DE] font-semibold hover:underline"
                >
                  contact@fast2hire.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}


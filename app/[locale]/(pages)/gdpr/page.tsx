import type { Metadata } from "next";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Compliance",
  description:
    "Fast2Hire General Data Protection Regulation (GDPR) compliance and data subject rights.",
};

export default function GdprPage() {
  return (
    <main className="w-full bg-[#F8F8FD] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF2FF] text-[#4640DE] text-xs font-bold uppercase tracking-wider mb-4">
            <Lock size={14} aria-hidden="true" />
            <span>Regulatory Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#132745] tracking-tight">
            GDPR Compliance
          </h1>
          <p className="mt-2 text-sm text-[#7C8493]">
            Last updated: January 2026 &bull; Fast2Hire Inc.
          </p>

          <div className="mt-8 space-y-6 text-sm sm:text-base text-[#25324B] leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                1. Your Data Rights Under GDPR
              </h2>
              <p className="text-[#515B6F]">
                Fast2Hire upholds full transparency and respects the rights of
                all users under the General Data Protection Regulation (GDPR),
                including the right to access, rectify, port, restrict, and
                erase personal data (&ldquo;Right to be Forgotten&rdquo;).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                2. Lawful Basis for Processing
              </h2>
              <p className="text-[#515B6F]">
                We process candidate and recruiter data based on explicit user
                consent, contractual necessity to deliver recruitment services,
                and legitimate business interests in maintaining platform
                security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#132745] mb-2">
                3. Data Protection Officer (DPO)
              </h2>
              <p className="text-[#515B6F]">
                To exercise any of your GDPR rights, please contact our Data
                Protection team at{" "}
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


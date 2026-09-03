import { useTranslations } from "next-intl";

const TABS = [
  { key: "all", labelKey: "all" },
  { key: "in_review", labelKey: "inReview" },
  { key: "interviewing", labelKey: "interviewing" },
  { key: "assessment", labelKey: "assessment" },
  { key: "offered", labelKey: "offered" },
  { key: "hired", labelKey: "hired" },
] as const;
export default function ApplicationsTabs({
  value,
  onChange,
  counts,
}: {
  value: string;
  onChange: (v: string) => void;
  counts: Record<string, number>;
}) {
  const t = useTranslations("candidateApplications.tabs");

  return (
    <div className="pt-3 md:pt-6 bg-white">
      <div className="overflow-x-auto no-scrollbar">
        <nav className="flex  w-20 gap-8  md:gap-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`shrink-0   tracking-wide font-medium whitespace-nowrap py-2 text-[14px] font-epilogue  ${value === tab.key ? "border-b-2 border-brand text-black " : "text-neutral-80 "}`}
            >
              {t(tab.labelKey)}{" "}
              <span
                className={` ${value === tab.key && "text-brand font-bold"} `}
              >
                ({tab.key === "all" ? counts.all : (counts[tab.key] ?? 0)})
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

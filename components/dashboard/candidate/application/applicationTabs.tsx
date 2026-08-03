const TABS = [
  { key: "all", label: "All" },
  { key: "in_review", label: "In Review" },
  { key: "interviewing", label: "Interviewing" },
  { key: "assessment", label: "Assessment" },
  { key: "offered", label: "Offered" },
  { key: "hired", label: "Hired" },
];
export default function ApplicationsTabs({
  value,
  onChange,
  counts,
}: {
  value: string;
  onChange: (v: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="pt-3 md:pt-6 bg-white">
      <div className="overflow-x-auto no-scrollbar">
        <nav className="flex  w-20 gap-8  md:gap-10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`shrink-0   tracking-wide font-medium whitespace-nowrap py-2 text-[14px] font-epilogue  ${value === t.key ? "border-b-2 border-brand text-black " : "text-neutral-80 "}`}
            >
              {t.label}{" "}
              <span
                className={` ${value === t.key && "text-brand font-bold"} `}
              >
                ({t.key === "all" ? counts.all : (counts[t.key] ?? 0)})
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

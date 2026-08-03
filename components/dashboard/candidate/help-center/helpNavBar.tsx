



const categories = [
  "My Profile",
  "Applying for a job",
  "Job Search Tips",
  "Job Alerts",
];

const TABS = [
  { key: "Getting Started", label: "Getting Started" },
  { key: "My Profile", label: "My Profile" },
  { key: "Applying for a job", label: "Applying for a job" },
  { key: "Job Search Tips", label: "Job Search Tips" },
  { key: "Job Alerts", label: "Job Alerts" },
];

export const HelpNavBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div>
      {/* nav for md screen and above */}
      <div className="hidden md:block">
        <nav className="space-y-1 flex flex-col items-start">
          <button
            onClick={() => onChange("Getting Started")}
            className="font-medium text-[#4640DE] cursor-pointer mb-3"
          >
            Getting Started
          </button>
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => onChange(item)}
              className="shrink-0 w-full border-t border-neutral-30 py-3 text-left text-sm transition-colors text-neutral-80 hover:text-[#4640DE] font-epilogue"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* nav for small screen */}
      <div className="block md:hidden">
        <div className="overflow-x-auto no-scrollbar">
          <nav className="flex  w-20 gap-8">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                className={`shrink-0  tracking-wide font-medium whitespace-nowrap py-2 text-lg font-epilogue  ${value === t.key ? "border-b-2 border-brand text-black " : "text-neutral-80 "}`}
              >
                {t.label}{" "}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-b border-neutral-30 -mx-4" />
      </div>
    </div>
  );
};

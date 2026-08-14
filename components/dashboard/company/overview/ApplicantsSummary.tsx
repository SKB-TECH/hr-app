interface ApplicantSegment {
  label: string;
  value: number;
  color: string;
}

interface ApplicantsSummaryProps {
  total?: number;
  segments?: ApplicantSegment[];
}

const defaultSegments: ApplicantSegment[] = [
  { label: "Full Time", value: 45, color: "#7B61FF" },
  { label: "Part-Time", value: 24, color: "#56CDAD" },
  { label: "Remote", value: 22, color: "#26A4FF" },
  { label: "Internship", value: 32, color: "#F4A33C" },
  { label: "Contract", value: 30, color: "#F65160" },
];

export default function ApplicantsSummary({
  total = 67,
  segments = defaultSegments,
}: ApplicantsSummaryProps) {
  const grandTotal = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="bg-white border border-gray-200 p-6">
      <p className="text-[20px] font-bold text-[#25324B] mb-3">Applicants Summary</p>
      <p className="text-[72px] font-bold text-[#25324B]">
        {total}
        <span className="text-[16px] font-medium text-gray-400 ml-2">Applicants</span>
      </p>

      {/* Stacked bar */}
      <div className="flex w-full h-2.5  mt-5 ">
        {segments.map((seg) => (
          <div
            key={seg.label}
            style={{
              width: `${(seg.value / grandTotal) * 100}%`,
              backgroundColor: seg.color,
            }}
          />
        ))}
      </div>

      {/* Legend grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-[13px]">
            <span
              className="w-2.5 h-2.5 rounded flex-shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-gray-500">{seg.label} :</span>
            <span className="font-bold text-[#25324B]">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
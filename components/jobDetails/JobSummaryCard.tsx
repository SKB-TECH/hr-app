import { ProgressWithLabel } from "@/components/ui/ProgressWithLabel";

type Props = {
  applyBefore: string;
  postedOn: string;
  jobType: string;
  salary: string;
  className?: string;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between font-epilogue">
      <p className="text-neutral-80">{label}</p>
      <span className="font-semibold text-neutral-100 text-[16px]">
        {value}
      </span>
    </div>
  );
}

export default function JobSummaryCard({
  applyBefore,
  postedOn,
  jobType,
  salary,
  className = "",
}: Props) {
  return (
    <div className={`py-8 ${className}`}>
      <h1 className=" text-[24px] md:text-[32px] text-neutral-100 font-bold font-clash">
        About this role
      </h1>
      <div className="max-sm:w-full max-md:max-w-sm w-full mt-6 h-18.5 px-4 bg-[#F8F8FD] flex items-center justify-center">
        <ProgressWithLabel />
      </div>
      <div className="w-full mt-4 space-y-4 p-2">
        <InfoRow label="Apply Before" value={applyBefore} />
        <InfoRow label="Job Posted On" value={postedOn} />
        <InfoRow label="Job Type" value={jobType} />
        <InfoRow label="Salary" value={salary} />
      </div>
    </div>
  );
}

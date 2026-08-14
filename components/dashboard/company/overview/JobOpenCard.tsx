interface JobOpenCardProps {
  count?: number;
}

export default function JobOpenCard({ count = 12 }: JobOpenCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <p className="text-[20px] font-bold text-[#25324B] mb-3">Job Open</p>
      <p className="text-[72px] font-bold text-[#25324B]">
        {count}
        <span className="text-[16px] font-medium text-gray-400 ml-2">Jobs Opened</span>
      </p>
    </div>
  );
}
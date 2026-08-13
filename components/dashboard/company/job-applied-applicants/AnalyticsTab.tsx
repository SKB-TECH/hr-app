import { Briefcase, ChevronDown, ChevronUp, Eye } from "lucide-react";
import JobListinghChart from "./JobListingChart";
import TrafficChannelChart from "./TrafficChannelChart";
import VisitorsByCountryStats from "./VisitorsByCountryStats";
import StatCard from "./StatCard";

interface AnalyticsTabProps {
  jobId: number;
}

function AnalyticsTab({ jobId: _jobId }: AnalyticsTabProps) {
  return (
    <div className="my-10 flex items-stretch max-md:flex-col font-epilogue w-full gap-4">
      {/* left */}
      <div className="w-2/3 flex max-md:w-full flex-col gap-4">
        <div className="flex max-md:flex-col gap-4">
          <StatCard
            title="Total Views"
            value="23,564"
            percentage="6.4%"
            trend="up"
            icon={<Eye size={18} />}
            iconBgColor="bg-[#26A4FF]"
            trendColorClass="text-accent-green"
            trendIcon={<ChevronUp />}
          />
          <StatCard
            title="Total Applied"
            value="132"
            percentage="0.4%"
            trend="down"
            icon={<Briefcase size={18} />}
            iconBgColor="bg-brand"
            trendColorClass="text-accent-red"
            trendIcon={<ChevronDown />}
          />
        </div>
        <div className="flex-1 flex flex-col min-h-[400px] md:min-h-0">
          <JobListinghChart />
        </div>
      </div>

      {/* right */}
      <div className="w-1/3 flex flex-col gap-4 max-md:w-full">
        <TrafficChannelChart />
        <VisitorsByCountryStats />
      </div>
    </div>
  );
}

export default AnalyticsTab;

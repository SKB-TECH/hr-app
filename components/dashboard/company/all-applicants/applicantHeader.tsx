import { TbFilter2 } from "react-icons/tb";
import FilterButton from "./filterButton";
import SearchInput from "./searchInput";
import ViewSwitcher, { ViewMode } from "./viewSwitcher";
import { Search } from "lucide-react";

interface Props {
  totalApplicants: number;
  view?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
}

export default function ApplicantHeader({ totalApplicants, view = "table", onViewChange = () => {} }: Props) {
  return (
    <div>
      {/* on md and above screen */}
      <div className="hidden md:block 0">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between pb-5">
          {/* Left */}
          <h1 className="text-[24px] font-bold text-[#25324B]">
            Total Applicants:
            <span className="text-[#25324B] ml-2">{totalApplicants}</span>
          </h1>

          {/* Right */}

          <div className="flex flex-wrap gap-1 justify-center items-center">
            <div className="flex flex-col md:flex-row gap-1">
              <SearchInput />

              <FilterButton />
            </div>
            <hr className="h-8 w-px border-0 bg-neutral-300 mx-2" />

            <ViewSwitcher view={view} onViewChange={onViewChange} />
          </div>
        </div>
      </div>

      {/* on small screen */}
      <div className="block md:hidden">
        <div className="flex justify-between items-center gap-2 py-4">
          <h1 className="text-2xl font-bold text-[#25324B]">
            Applicants:
            <span className="text-[#25324B] ml-2">{totalApplicants}</span>
          </h1>
          <div className="gap-5 flex items-center">
            <button>
              <TbFilter2 className="h-7 w-7" />
            </button>
            <button>
              <Search className="h-7 w-7" />
            </button>
          </div>
        </div>
        <hr className="bg-neutral-20 -mx-4" />
        <div className="py-4">
          <ViewSwitcher view={view} onViewChange={onViewChange} />
        </div>
      </div>
    </div>
  );
}

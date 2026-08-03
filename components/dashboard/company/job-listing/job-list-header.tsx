import DateRangePicker from "./date-picker";

function JobListHeader() {
  return (
    <div className=" flex items-center justify-between md:my-6 max-md:my-3 md:mb-8">
      <div className="max-sm:p-2 ">
        <div>
          <h1 className="text-[24px] font-bold text-[#25324B] tracking-tight">
            Job Listing
          </h1>
          <p className="text-[15px] md:text-[16px] text-[#7C8493] mt-1">
            Here is your jobs listing status from July 19 - July 25
          </p>
        </div>
      </div>
      {/* Date picker button */}
      <div className="hidden md:block">
        <DateRangePicker />
      </div>
    </div>
  );
}

export default JobListHeader;

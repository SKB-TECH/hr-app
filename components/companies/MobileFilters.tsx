import { Button } from "../ui/button";

function MobileFilters() {
  const title = "Type of Employment";
  const options = [
    { name: "Remote", count: 24 },
    { name: "Onsite", count: 10 },
    { name: "Hybrid", count: 7 },
  ];

  return (
    <div className="max-md:flex fixed hidden inset-0 bg-neutral-100/30 z-50  items-center justify-center">
      <div className="flex flex-col mb-8 bg-white h-[80%] w-[90%]  p-6">
        <h1 className="font-semibold text-neutral-100 font-clash text-[18px] mb-4">
          More Filters
        </h1>
        <h3 className="font-semibold text-neutral-100 font-clash text-[14px] mb-4">
          {title}
        </h3>
        <div className="space-y-4">
          {options.map((option) => (
            <div
              key={option.name}
              className="flex items-center text-[16px] justify-start gap-3"
            >
              <div className="w-4 h-4 rounded-sm border bg-white/5" />
              <div className="flex items-center gap-1">
                <span className="text-slate-600">{option.name}</span>
                <span className="text-slate-400">({option.count})</span>
              </div>
            </div>
          ))}
        </div>
        <Button className="rounded-none bg-brand w-full  mt-auto">Apply</Button>
      </div>
    </div>
  );
}

export default MobileFilters;

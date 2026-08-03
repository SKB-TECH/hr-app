import { ListFilter, Search } from "lucide-react";

export default function Controls({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (s: string) => void;
}) {
  return (
    <div className="  md:gap-3">
      <div className="border-t-2 border-neutral-30  -mx-5 " />
      <div className="gap-2 mt-5 md:mt-10 flex flex-col md:flex-row justify-between">
        <h3 className="text-lg text-neutral-100 font-clash font-bold md:font-semibold ">
          Applications History
        </h3>
        <div className="flex items-center gap-1 md:gap-2 bg-white">
          <div className="relative border border-[#D6DDEB]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-auto md:w-30 border md:py-2 md:pl-10 md:pr-3 py-2 pl-12 pr-8 outline-none"
            />
          </div>
          <button className="border border-[#D6DDEB] px-4 py-2  flex gap-2 cursor-pointer">
            <ListFilter />
            <span className="hidden md:block"> Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
}

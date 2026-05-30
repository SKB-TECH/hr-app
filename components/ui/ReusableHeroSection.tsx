import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
// import HeroBg from "./HeroBg";

interface HeroSectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  searchEnabled?: boolean;
  popularTags?: string[];
}

export default function HeroSection({
  title,
  highlight,
  subtitle,
  searchEnabled,
  popularTags = [],
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-white to-indigo-50 py-16 px-6 overflow-hidden">
      {/*<HeroBg />*/}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-100">
          {title}{" "}
          <span className="text-accent-light-blue underline decoration-4 decoration-blue-400">
            {highlight}
          </span>
        </h1>
        <p className="mt-4 text-neutral-80">{subtitle}</p>

        {searchEnabled && (
          <>
            {/* Search bar */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 bg-white shadow-md rounded-lg p-4">
              {/* Job title input with search icon */}
              <div className="relative w-full md:w-1/2">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location input with map pin icon */}
              <div className="relative w-full md:w-1/3">
                <MapPinIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                Search
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Popular: {popularTags.join(", ")}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

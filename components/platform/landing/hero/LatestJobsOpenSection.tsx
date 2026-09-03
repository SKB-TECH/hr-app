import { SectionTitle } from "@/components/ui/Title";
import { latestJobs } from "@/data/latestJobs";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const tagStyles: Record<string, string> = {
  "Full-Time": "text-accent-green bg-accent-light-green  ",
  Marketing: "text-yellow-500 border border-yellow-400 bg-transparent",
  Design: "text-indigo-600 border border-indigo-500 bg-transparent font-bold",
};

export default async function LatestJobsOpenSection() {
  const t = await getTranslations("landing");

  return (
    <section className="relative mt-16 min-h-[500px] w-full overflow-hidden py-10">
      <Image
        src="/background.png"
        alt="Background"
        fill
        quality={100}
        priority
        className="pointer-events-none absolute inset-0 hidden object-fill bg-no-repeat md:block"
      />
      <div
        style={{
          clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 5%)",
        }}
        className="pointer-events-none absolute inset-0 bg-[#F8F8FD] md:hidden"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-12">
        <SectionTitle
          title={t("latestJobs.titlePrefix")}
          highlight={t("latestJobs.titleHighlight")}
          showAllText={t("shared.showAllJobs")}
          showAllLink="/jobs"
          isExpanded
        />
        <div className=" grid grid-cols-1 md:grid-cols-2  gap-6  overflow-hidden ">
          {latestJobs.map((job, i) => (
            <div
              key={job.id + "-" + i}
              className={`
              flex items-center gap-5 px-8 py-6 bg-white
              hover:shadow-sm transition-all cursor-pointer
              border-[#D6DDEB] border
          
            `}
            >
              {/* Logo */}
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <Image
                  src={job.companyLogo}
                  alt={job.companyName}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <Link
                  href={`/jobs/${job.id}`}
                  className="font-bold text-[16px] text-neutral-100 hover:text-brand/80"
                >
                  {job.title}
                </Link>
                <p className="text-sm text-gray-400 flex items-center gap-1.5">
                  <Link href={`/companies/${job.id}`} className="truncate">
                    {job.companyName}
                  </Link>
                  <span className="text-gray-300">•</span>
                  {job.location}
                </p>

                {/* Tags row */}
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  {/* Category tags */}
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        (tag && tagStyles[tag]) ??
                        "text-gray-500 border border-gray-300 bg-transparent"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

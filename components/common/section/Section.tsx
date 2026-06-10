import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoriesData } from "@/data/category";
import { CategoryProp } from "@/data/category";
import { SectionTitle } from "@/components/ui/Title";
import Image from "next/image";

export default function SectionComponent() {
  return (
    <div className="bg-white sm:px-18 px-8">
      <section className="py-8 md:px-0">
        <SectionTitle
          title="Explore by"
          highlight="category"
          showAllText="Show all jobs"
          showAllLink="/jobs"
          isExpanded
        />

        <div className="py-5 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-5">
          {categoriesData.map((category: CategoryProp) => (
            <div
              key={category.id}
              className="border cursor-pointer group hover:bg-brand
                         flex flex-row md:flex-col
                         items-center md:items-start
                         gap-4 md:gap-3
                         p-4 md:p-6
                         justify-between"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <Image
                  src={category.logo}
                  alt={category.name}
                  width={28}
                  height={28}
                  className={`
                    transition-all duration-200
                    group-hover:brightness-0 group-hover:invert
                    ${category.blackIcon
                      ? "brightness-0"
                      : "brightness-0 saturate-100 [filter:invert(27%)_sepia(98%)_saturate(1234%)_hue-rotate(222deg)_brightness(89%)_contrast(97%)]"
                    }
                  `}
                />
              </div>


              <div className="flex-1 flex flex-col gap-0.5 md:gap-3">
                <h2 className="font-bold text-black group-hover:text-white text-base md:text-2xl">
                  {category.name}
                </h2>
                <span className="text-sm text-gray-400 group-hover:text-white">
                  {category.availableJobs} jobs available
                </span>
              </div>

              <Link
                href="#"
                className="flex-shrink-0 text-foreground group-hover:text-white"
              >
                <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>

        <div className="md:hidden mt-4">
          <Link
            href="/jobs"
            className="flex flex-row text-brand text-sm font-semibold items-center gap-1"
          >
            <span>Show all jobs</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </section>
    </div>
  );
}
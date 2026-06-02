import Link from "next/link";
import { ArrowRight, FolderArchive } from "lucide-react";
import { SectionComponentProps } from "@/utilities/SectionComponentProps";
import { categoriesData } from "@/data/category";
import {CategoryProp} from "@/data/category"
import Image from "next/image"         

export default function SectionComponent({
  title = "",
  highlight = "",
  showAllLink = "",
  showAllText,
  isExpanded = false,
}: SectionComponentProps) {
  return (
    <div className="bg-white sm:px-18 px-8">
      <section className=" py-8  md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-end">
          <h1 className="font-bold text-3xl flex flex-row gap-2">
            <span className="text-black dark:text-white">{title}</span>
            <span className="text-primary">{highlight}</span>
          </h1>
          {isExpanded && (
            <Link
              href={showAllLink}
              className="flex flex-row text-brand text-xs font-bold items-center gap-1"
            >
              <span>{showAllText}</span>
              <ArrowRight size={12} />
            </Link>
          )}
        </div>

        {/* Elements */}
        <div className="py-5 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-5">
          {categoriesData.map((category: CategoryProp) => (             
            <div
              key={category.id}
              className="border cursor-pointer group hover:bg-brand p-5 md:p-6 flex flex-col gap-3 justify-between"
            >
               <Image src={category.logo} alt={category.logo} width={28} height={28} className=" text-indigo-600 hover:text-white"/>
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-black group-hover:text-white text-2xl">
                  {category.name}
                </h2>
                <Link
                  href="#"
                  className="flex flex-row justify-between text-foreground group-hover:text-white items-center gap-2"
                >
                  <span className="text-sm text-gray-400">{category.availableJobs} jobs available</span>
                  <ArrowRight size={15} className="font-normal" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import Link from "next/link";
import { ArrowRight, FolderArchive } from "lucide-react";
import { SectionComponentProps } from "@/utilities/SectionComponentProps";
import { categoryData } from "@/data/category";          
import type { Category } from "@/data/category";         

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
          {categoryData.map((item: Category) => (             
            <div
              key={item.id}
              className="border cursor-pointer group hover:bg-brand p-5 md:p-6 flex flex-col gap-3 justify-between"
            >
              <FolderArchive size={32} className="mb-3 text-brand group-hover:text-white" />
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-black group-hover:text-white text-2xl">
                  {item.name}
                </h2>
                <Link
                  href="#"
                  className="flex flex-row justify-between text-foreground group-hover:text-white items-center gap-2"
                >
                  <span className="text-sm text-gray-400">{item.availableJobs} jobs available</span>
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
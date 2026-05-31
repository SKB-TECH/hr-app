import Link from "next/link";
import {ArrowRight, FolderArchive} from "lucide-react";
import {SectionComponentProps} from "@/utilities/SectionComponentProps";

export default function SectionComponent({title = "", highlight = "", showAllLink = "", showAllText, isExpanded = false }: SectionComponentProps){
    return (
        <div className="bg-white px-8">
            <section className="max-w-6xl mx-auto py-8 px-4 md:px-0">
                <div className="flex flex-col md:flex-row justify-between items-end">
                    <h1 className="font-bold text-3xl flex flex-row gap-2">
                        <span className="text-black dark:text-white">{title}</span>
                        <span className="text-brand">{highlight}</span>
                    </h1>
                    {isExpanded && (
                        <Link href={showAllLink} className="flex flex-row text-brand text-xs font-bold items-center gap-1">
                            <span className="">{showAllText}</span>
                            <ArrowRight size={12}/>
                        </Link>
                    )}
                </div>

                {/*    Elements   */}
                <div className="py-5 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-5">
                    {[1,2,3,4,5, 6, 7, 8].map((item, i) => (
                        <div key={i} className="border cursor-pointer group hover:bg-brand p-5 md:p-6 flex flex-col gap-3 justify-between">
                            <FolderArchive size={32} className="mb-3 text-brand group-hover:text-white"/>
                            <div className="flex flex-col gap-3">
                                <h2 className="font-bold text-black group-hover:text-white text-2xl">Design</h2>
                                <Link href="#" className="flex flex-row justify-between text-foreground group-hover:text-white items-center gap-2">
                                    <span className=" text-sm">235 jobs available</span>
                                    <ArrowRight size={15} className="font-normal"/>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
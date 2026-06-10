import Image from "next/image";
import { ChevronDown, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSectionComponent() {
    return (
        <section className="relative overflow-hidden bg-[#F8F8FD]">
            <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[62%] md:block">
                <Image
                    src="/img_design/Pattern.png"
                    alt=""
                    fill
                    priority
                    className="object-cover object-left-top opacity-80"
                />
            </div>

            <div className="pointer-events-none absolute inset-0 z-0 block md:hidden">
                <Image
                    src="/img_design/Pattern.png"
                    alt=""
                    fill
                    priority
                    className="translate-x-[80px] object-cover object-right-top opacity-40"
                />
            </div>

            <div className="relative z-10 mx-auto grid min-h-[560px] max-w-6xl grid-cols-1 px-4  md:min-h-[760px] md:grid-cols-[620px_1fr] ">
                <div className="z-20 flex flex-col justify-center pb-10 md:pb-16">
                    <h1 className="text-[42px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#25324B] sm:text-[52px] md:text-[68px] md:leading-[1.15]">
                        Discover <br />
                        more than <br />
                        <span className="relative inline-block text-[#26A4FF]">
              5000+ Jobs
              <Image src="/underline.png" alt="Underline" width={310} height={16} className="absolute w-full" style={{ bottom: "-10px", top:"90px" ,left: 0, height: "16px" }} />
              
            </span>
                    </h1>

                    <p className="mt-6 max-w-[540px] text-sm leading-6 text-[#8A93A6] md:mt-10 md:text-[21px] md:leading-8">
                        Great platform for the job seeker that searching for new career
                        heights and passionate about startups.
                    </p>

                    <div className="mt-6 flex w-full  flex-col bg-white p-4 shadow-[0_16px_40px_rgba(37,50,75,0.08)] md:mt-9 md:w-[850px] md:flex-row">
                        <div className="flex w-full items-center gap-3   md:w-[310px]  md:px-4 md:py-0">
                            <Search size={20} className="shrink-0 text-[#25324B] md:size-[25px]" />
                            <Input
                                placeholder="Job title or keyword"
                                className="h-10 border-b border-b-[#D6DDEB] px-0 text-sm shadow-none placeholder:text-[#B8C0CC] focus-visible:ring-0 md:h-12 md:text-base"
                            />
                        </div>

                        <div className="flex w-full items-center gap-3   md:w-[270px]  md:px-4 md:py-0">
                            <MapPin size={20} className="shrink-0 text-[#25324B] md:size-[25px]" />
                            <Input
                                placeholder="Florence, Italy"
                                className="h-10 border-b border-b-[#D6DDEB] px-0 text-sm shadow-none placeholder:text-[#25324B] focus-visible:ring-0 md:h-12 md:text-base"
                            />
                            <ChevronDown size={14} className="shrink-0 text-[#7C8493] md:size-4" />
                        </div>

                        <Button className=" h-12  bg-[#4640DE] text-sm font-bold hover:bg-[#3730c9]  md:h-[72px] md:flex-1 md:text-lg">
                            Search my job
                        </Button>
                    </div>

                    <p className="mt-4 text-xs leading-5 text-[#515B6F] md:mt-5 md:text-base">
                        Popular : <span className="font-semibold">UI Designer</span>,{" "}
                        <span className="font-semibold">UX Researcher</span>,{" "}
                        <span className="font-semibold">Android</span>,{" "}
                        <span className="font-semibold">Admin</span>
                    </p>
                </div>

                <div className="relative hidden md:block">
                    <Image
                        src="/img_design/home.png"
                        alt="Job seeker"
                        width={500}
                        height={700}
                        priority
                        className="absolute bottom-0 right-[-5px] z-10 object-contain"
                    />
                </div>
            </div>

            <div className="absolute bottom-0 right-0 z-20 hidden h-[135px] w-[50%] bg-white [clip-path:polygon(100%_0,100%_100%,0_100%)] md:block" />
        </section>
    );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const latestJobs = [
    {
        title: "Social Media Assistant",
        company: "Nomad",
        location: "Paris, France",
        logo: "/Property 1=Nomad.png",
    },
    {
        title: "Social Media Assistant",
        company: "Netlify",
        location: "Paris, France",
        logo: "/Property 1=Netlify.png",
    },
    {
        title: "Brand Designer",
        company: "Dropbox",
        location: "San Fransisco, USA",
        logo: "/Property 1=Dropbox.png",
    },
    {
        title: "Brand Designer",
        company: "Maze",
        location: "San Fransisco, USA",
        logo: "/Property 1=Maze.png",
    },
    {
        title: "Interactive Developer",
        company: "Terraform",
        location: "Hamburg, Germany",
        logo: "/Property 1=Terraform.png",
    },
    {
        title: "Interactive Developer",
        company: "Udacity",
        location: "Hamburg, Germany",
        logo: "/Property 1=Udacity.png",
    },
    {
        title: "HR Manager",
        company: "Packer",
        location: "Lucern, Switzerland",
        logo: "/Property 1=Packer.png",
    },
    {
        title: "HR Manager",
        company: "Webflow",
        location: "Lucern, Switzerland",
        logo: "/Property 1=Webflow.png",
    },
];

export default function LatestJobsOpenSection() {
    return (
        <section className="relative overflow-hidden bg-[#F8F8FD] px-4 py-16 md:py-24">
            <Image
                src="/Pattern.png"
                alt=""
                fill
                className="object-cover object-right opacity-70"
            />

            <div className="relative z-10 mx-auto max-w-[1200px]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[34px] font-extrabold tracking-[-0.04em] text-[#25324B] md:text-[48px]">
                        Latest <span className="text-[#26A4FF]">jobs open</span>
                    </h2>

                    <Link
                        href="/jobs"
                        className="hidden items-center gap-3 text-base font-bold text-[#4640DE] md:flex"
                    >
                        Show all jobs <ArrowRight size={22} />
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {latestJobs.map((job) => (
                        <Card
                            key={`${job.title}-${job.company}`}
                            className="rounded-none border-none bg-white shadow-none"
                        >
                            <CardContent className="flex gap-8 p-7">
                                <div className="relative h-16 w-16 shrink-0">
                                    <Image
                                        src={job.logo}
                                        alt={job.company}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#25324B]">
                                        {job.title}
                                    </h3>

                                    <p className="mt-2 text-base text-[#515B6F]">
                                        {job.company}
                                        <span className="mx-2 text-[#A8ADB7]">•</span>
                                        {job.location}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Badge className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm text-emerald-500 hover:bg-emerald-50">
                                            Full-Time
                                        </Badge>

                                        <Badge
                                            variant="outline"
                                            className="rounded-full border-orange-400 px-4 py-1.5 text-sm text-orange-500"
                                        >
                                            Marketing
                                        </Badge>

                                        <Badge
                                            variant="outline"
                                            className="rounded-full border-[#4640DE] px-4 py-1.5 text-sm text-[#4640DE]"
                                        >
                                            Design
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

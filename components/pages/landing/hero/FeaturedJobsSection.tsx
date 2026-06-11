import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const jobs = [
    {
        title: "Email Marketing",
        company: "Revolut",
        location: "Madrid, Spain",
        logo: "/revolut.png",
        tags: ["Marketing", "Design"],
    },
    {
        title: "Brand Designer",
        company: "Dropbox",
        location: "San Fransisco, US",
        logo: "/Property 1=Dropbox.png",
        tags: ["Design", "Business"],
    },
    {
        title: "Email Marketing",
        company: "Pitch",
        location: "Berlin, Germany",
        logo: "/Property 1=Pitch.png",
        tags: ["Marketing"],
    },
    {
        title: "Visual Designer",
        company: "Blinkist",
        location: "Granada, Spain",
        logo: "/Property 1=Blinkist.png",
        tags: ["Design"],
    },
    {
        title: "Product Designer",
        company: "ClassPass",
        location: "Manchester, UK",
        logo: "/Property 1=ClassPass.png",
        tags: ["Marketing", "Design"],
    },
    {
        title: "Lead Designer",
        company: "Canva",
        location: "Ontario, Canada",
        logo: "/Property 1=Canva.png",
        tags: ["Design", "Business"],
    },
    {
        title: "Brand Strategist",
        company: "GoDaddy",
        location: "Marseille, France",
        logo: "/Property 1=GoDaddy.png",
        tags: ["Marketing"],
    },
    {
        title: "Data Analyst",
        company: "Twitter",
        location: "San Diego, US",
        logo: "/Property 1=Twitter.png",
        tags: ["Technology"],
    },
];

export default function FeaturedJobsSection() {
    return (
        <section className="bg-white px-4 py-16 md:py-24">
            <div className="mx-auto max-w-[1200px]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[34px] font-extrabold tracking-[-0.04em] text-[#25324B] md:text-[48px]">
                        Featured <span className="text-[#26A4FF]">jobs</span>
                    </h2>

                    <Link
                        href="/jobs"
                        className="hidden items-center gap-3 text-base font-bold text-[#4640DE] md:flex"
                    >
                        Show all jobs <ArrowRight size={22} />
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {jobs.map((job) => (
                        <Card
                            key={`${job.title}-${job.company}`}
                            className="rounded-none border-[#D6DDEB] shadow-none"
                        >
                            <CardContent className="p-6">
                                <div className="mb-8 flex items-start justify-between">
                                    <div className="relative h-12 w-12">
                                        <Image
                                            src={job.logo}
                                            alt={job.company}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    <Badge
                                        variant="outline"
                                        className="rounded-none border-[#4640DE] px-4 py-2 text-sm font-medium text-[#4640DE]"
                                    >
                                        Full Time
                                    </Badge>
                                </div>

                                <h3 className="text-xl font-bold text-[#25324B]">
                                    {job.title}
                                </h3>

                                <p className="mt-2 text-base text-[#515B6F]">
                                    {job.company}
                                    <span className="mx-2 text-[#A8ADB7]">•</span>
                                    {job.location}
                                </p>

                                <p className="mt-6 line-clamp-2 text-base leading-7 text-[#7C8493]">
                                    {job.company} is looking for {job.title} to help team make
                                    great products and grow faster ...
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {job.tags.map((tag) => (
                                        <JobTag key={tag} tag={tag} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function JobTag({ tag }: { tag: string }) {
    const className =
        tag === "Marketing"
            ? "bg-orange-50 text-orange-500 hover:bg-orange-50"
            : tag === "Technology"
                ? "bg-red-50 text-red-500 hover:bg-red-50"
                : tag === "Business"
                    ? "bg-violet-50 text-[#4640DE] hover:bg-violet-50"
                    : "bg-emerald-50 text-emerald-500 hover:bg-emerald-50";

    return (
        <Badge className={`rounded-full px-4 py-1.5 text-sm ${className}`}>
            {tag}
        </Badge>
    );
}

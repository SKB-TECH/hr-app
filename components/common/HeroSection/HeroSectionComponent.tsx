"use client";

import Image from "next/image";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const locations = [
  "select location",
  "Florence, Italy",
  "Cairo, Egypt",
  "London, UK",
  "Berlin, Germany",
  "Remote",
];

export default function HeroSectionComponent() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const router = useRouter();

  const navigateTosearchResults = () => router.push("/companies/search");

  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      {/* Desktop Pattern */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[62%] lg:block">
        <Image
          src="/img_design/Pattern.png"
          alt=""
          fill
          priority
          className="object-cover object-left-top opacity-80"
        />
      </div>

      {/* Mobile Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 block lg:hidden">
        <Image
          src="/img_design/Pattern.png"
          alt=""
          fill
          priority
          className="translate-x-[80px] object-cover object-right-top opacity-40"
        />
      </div>

      <div className="relative  z-10 mx-auto grid min-h-[560px] grid-cols-1 px-4 py-10 sm:px-6 md:min-h-[620px] md:px-10 md:py-14 lg:min-h-[760px] lg:px-[128px] lg:py-0 lg:pt-[90px]  2xl:min-h-[800px]">
        {/* Hero content */}
        <div className="relative  z-20 mx-auto w-full max-w-7xl px-0 md:px-6 lg:absolute lg:inset-x-0 lg:top-16 lg:px-12">
          <div className="flex flex-col justify-center pb-6 md:pb-10 lg:pb-16">
            <h1 className="text-[42px] font-clash font-bold leading-[1.05] tracking-[-0.04em] text-neutral-100 sm:text-[56px] lg:text-[72px] lg:leading-[1.1]">
              Discover <br />
              more than <br />
              <div className="relative w-fit">
                <span className="relative inline-block text-[#26A4FF]">
                  5000+ Jobs
                </span>
                <Image
                  src="/Vector.png"
                  alt="Vector patterns"
                  width={100}
                  height={20}
                  className="object-cover  w-full"
                />
              </div>
            </h1>

            <p className="relative z-20 mt-6 max-w-[540px] text-[18px] font-epilogue leading-6 text-neutral-80 md:mt-10 md:text-[21px] md:leading-8">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Form */}
            <div className="relative z-30 mt-6 flex w-full flex-col bg-white p-4 shadow-[0_16px_40px_rgba(37,50,75,0.08)] max-md:self-center md:mt-9 lg:h-[72px] md:max-w-[850px] lg:flex-row lg:items-center lg:gap-0 lg:px-2 lg:py-2">
              {/* Keyword Search */}
              <div className="flex w-full items-center gap-3 px-2 py-2 lg:w-[310px] lg:px-4 lg:py-0">
                <Search
                  size={20}
                  className="shrink-0 text-[#25324B] md:size-[25px]"
                />
                <Input
                  placeholder="Job title or keyword"
                  className="h-10 border-b placeholder:text-[18px] border-[#D6DDEB] px-0 text-sm shadow-none placeholder:text-[#B8C0CC] focus-visible:ring-0 lg:h-full lg:text-base"
                />
              </div>

              {/* Location */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-2 py-2 text-left outline-none lg:w-[270px] lg:px-4 lg:py-0"
                  >
                    <MapPin
                      size={20}
                      className="shrink-0 text-[#25324B] md:size-[25px]"
                    />
                    <div className="flex-1 truncate border-b border-[#D6DDEB] py-2 text-[18px] text-[#25324B] lg:py-0 lg:text-base">
                      <p className="mb-3">{selectedLocation}</p>
                    </div>
                    <ChevronDown
                      size={14}
                      className="shrink-0 text-[#7C8493] md:size-4"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-none bg-white p-1 shadow-[0_16px_40px_rgba(37,50,75,0.08)]">
                  {locations.map((location) => (
                    <DropdownMenuItem
                      key={location}
                      className="cursor-pointer rounded-none px-3 py-2 text-sm text-[#25324B] focus:bg-[#F8F8FD] focus:text-[#25324B]"
                      onSelect={() => setSelectedLocation(location)}
                    >
                      {location}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CTA */}
              <Button
                onClick={navigateTosearchResults}
                className="mt-4 h-12 cursor-pointer rounded-none bg-[#4640DE] text-sm font-medium  hover:bg-[#3730c9] lg:ml-auto lg:mt-0 lg:h-full lg:flex-1 lg:text-lg"
              >
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
        </div>

        {/* Hero image of person smilling */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-full w-[52%] lg:block">
          <Image
            src="/img_design/home.png"
            alt="Job seeker"
            width={500}
            height={700}
            priority
            className="absolute bottom-0 right-8 h-auto max-h-[calc(100%-120px)] w-[min(34vw,500px)] object-contain object-bottom xl:right-20 2xl:right-[calc((100vw-1280px)/2+48px)]"
          />
        </div>
      </div>

      {/* Bottom White Shape */}
      <div className="absolute bottom-0 right-0 z-20 hidden h-[135px] w-[50%] bg-white [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:block" />
    </section>
  );
}

"use client";

import Image from "next/image";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const locations = [
  "Florence, Italy",
  "Cairo, Egypt",
  "London, UK",
  "Berlin, Germany",
  "Remote",
];

export default function HeroSectionComponent() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      {/* Desktop Pattern */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[62%] md:block">
        <Image
          src="/img_design/Pattern.png"
          alt=""
          fill
          priority
          className="object-cover object-left-top opacity-80"
        />
      </div>

      {/* Mobile Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 block md:hidden">
        <Image
          src="/img_design/Pattern.png"
          alt=""
          fill
          priority
          className="translate-x-[80px] object-cover object-right-top opacity-40"
        />
      </div>

      <div className="relative z-10 mx-auto  grid min-h-[560px] grid-cols-1 px-4 pt-10 sm:px-6 md:min-h-[760px] md:px-[128px] md:pt-[90px]">
        <div className="absolute  inset-x-0 top-24 z-20 mx-auto w-full max-w-7xl px-4  md:top-32">
          <div className="flex  flex-col justify-center pb-10 md:pb-16 ">
            <h1 className="text-[42px] font-clash font-bold leading-[1.05] tracking-[-0.04em] text-[#25324B] sm:text-[56px] lg:text-[72px] lg:leading-[1.1]">
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
                  className="object-cover w-full"
                />
              </div>
            </h1>

            <p className="mt-6 max-w-[540px] text-sm leading-6 text-neutral-80 md:mt-10 md:text-[21px] md:leading-8">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Form */}
            <div className="relative z-30 mt-6 flex w-full flex-col border border-[#D6DDEB] bg-white p-4 shadow-[0_16px_40px_rgba(37,50,75,0.08)] md:mt-9 md:h-[72px] md:max-w-[850px] md:flex-row md:py-0 md:px-4">
              {/* Keyword Search */}
              <div className="flex w-full items-center gap-3 border-b border-[#D6DDEB] px-2 py-2 md:w-[310px] md:border-b-0 md:border-r md:px-4 md:py-0">
                <Search
                  size={20}
                  className="shrink-0 text-[#25324B] md:size-[25px]"
                />
                <Input
                  placeholder="Job title or keyword"
                  className="h-10 border-0 px-0 text-sm shadow-none placeholder:text-[#B8C0CC] focus-visible:ring-0 md:h-full md:text-base"
                />
              </div>

              {/* Location */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 border-b border-[#D6DDEB] px-2 py-2 text-left outline-none md:w-[270px] md:border-b-0 md:border-r md:px-4 md:py-0"
                  >
                    <MapPin
                      size={20}
                      className="shrink-0 text-[#25324B] md:size-[25px]"
                    />
                    <span className="h-10 flex-1 truncate px-0 py-2 text-sm text-[#25324B] md:h-full md:py-[24px] md:text-base">
                      {selectedLocation}
                    </span>
                    <ChevronDown
                      size={14}
                      className="shrink-0 text-[#7C8493] md:size-4"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-none border-[#D6DDEB] bg-white p-1 shadow-[0_16px_40px_rgba(37,50,75,0.08)]">
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
              <Button className="cursor-pointer h-12 rounded-none bg-[#4640DE] text-sm font-bold hover:bg-[#3730c9] m-2  my-auto   md:flex-1 md:text-lg">
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

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <Image
              src="/img_design/home.png"
              alt="Job seeker"
              width={500}
              height={700}
              priority
              className="pointer-events-none absolute bottom-0 right-[-5px] z-10 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom White Shape */}
      <div className="absolute bottom-0 right-0 z-20 hidden h-[135px] w-[50%] bg-white [clip-path:polygon(100%_0,100%_100%,0_100%)] md:block" />
    </section>
  );
}

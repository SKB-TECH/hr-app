import React from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import {HeroSectionProps} from "@/types/HeroSectionProps";

const ReusableHeroSection = ({
  title,
  highlight,
  subtitle,
  searchEnabled,
  popularTags,
}: HeroSectionProps) => {
  return (
    <section className='relative h-96 w-full overflow-hidden'>
      {/* Background Image */}
      <Image
        fill
        src='/BG.png'
        alt='Hero background'
        className='absolute inset-0 h-full w-full object-cover'
      />

      <div className='relative z-10 max-w-5xl mx-auto'>
        <div className='text-center mt-15'>
          <h1 className='text-4xl md:text-5xl font-clash text-neutral-100'>
            {title}{" "}
            <span className='relative inline-block text-accent-light-blue'>
              {highlight}
              <svg
                className='absolute left-0 bottom-0 w-full h-3'
                viewBox='0 0 241 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M5.13897 5.83831C7.02586 5.83831...' fill='#26A4FF' />
              </svg>
            </span>
          </h1>
          <p className='mt-4 text-neutral-80 font-epilogue'>{subtitle}</p>
        </div>

        {searchEnabled && (
          <>
            {/* Search bar */}
            <div className='mt-10 flex flex-col md:flex-row items-center justify-center gap-4 bg-white shadow-md p-4'>
              {/* Job title input */}
              <div className='relative w-full md:w-1/2'>
                <MagnifyingGlassIcon className='absolute left-3 top-2.5 h-5 w-5 text-neutral-80' />
                <input
                  type='text'
                  placeholder='Job title or keyword'
                  className='w-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Location input */}
              <div className='relative w-full md:w-1/3'>
                <MapPinIcon className='absolute left-3 top-2.5 h-5 w-5 text-neutral-80' />
                <input
                  type='text'
                  placeholder='Location'
                  className='w-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <button className='bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition'>
                Search
              </button>
            </div>

            {popularTags && popularTags.length > 0 && (
              <p className='mt-4 text-[16px] text-neutral-80 font-epilogue'>
                Popular:{" "}
                {popularTags.map((tag, index) => (
                  <span key={index} className='inline-block mr-2'>
                    {tag}
                  </span>
                ))}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReusableHeroSection;

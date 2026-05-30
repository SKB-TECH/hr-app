// import JobCard from "@/components/JobCard";
// import { JobCard } from "@/components/JobCard";
import { Search } from "lucide-react";

import {Search} from "lucide-react";

const cardcontent = {
  id: "FDMAN2038-234",
  ref: "#FDMAN2038-234",
  title: "Frontend Developer",
  location: "Manchester, UK",
  salary: "£40,000 - £55,000 per annum",
  jobType: "Hybrid, Permanent",
  description:
    "We're looking for an experienced Frontend Developer to join our dynamic team. You'll work with modern technologies like React, TypeScript, and Tailwind CSS to build responsive, user-friendly web applications. This is an excellent opportunity to grow your skills in a collaborative environment with a focus on code quality and innovation.",
};

export default function JobsPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Search Bar */}
      <div className='flex mb-12 border border-gray-200'>
        <input
          type='text'
          placeholder='Search for job titles...'
          className='flex-1 px-5 py-4 text-gray-500 placeholder-gray-400 outline-none text-sm'
        />
        <button
          className='flex items-center justify-center px-5 py-4 text-white'
          style={{ backgroundColor: "#00c896" }}
          aria-label='Search'
        >
          <Search size={20} />
        </button>
      </div>

      <div className='space-y-6'>
        {/* Example job cards */}
        {/*<JobCard job={cardcontent} />*/}
        {/*<JobCard job={cardcontent} />*/}
        {/*<JobCard job={cardcontent} />*/}
        {/*<JobCard job={cardcontent} />*/}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between pt-8 border-t border-none mt-8'>
        <p className='text-sm text-gray-500'>Show 1 - 4 of 20 entries</p>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <button className='font-medium text-gray-900'>1</button>
          <span className='text-gray-300'>|</span>
          <button className='font-medium text-gray-400 hover:text-gray-700'>
            2
          </button>
          <span className='text-gray-300'>|</span>
          <button className='font-medium text-gray-400 hover:text-gray-700'>
            3
          </button>
          <span className='text-gray-300'>|</span>
          <button className='font-medium text-gray-400 hover:text-gray-700'>
            4
          </button>
        </div>
      </div>
    </div>
  );
}

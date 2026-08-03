"use client";

import Image from "next/image";
import { application } from "./data";

type Application = {
  id: string;
  companyName: string;
  role: string;
  dateApplied: string; // ISO or human
  status:
    | "In Review"
    | "Interviewing"
    | "Assessment"
    | "Offered"
    | "Hired"
    | "Unsuitable"
    | string;
  logo: string;
  location?: string;
};

const statusStyles: Record<string, string> = {
  "In Review": "border border-[#FFB836] text-[#FFB836]",
  Shortlisted: "border border-[#56CDAD] text-[#56CDAD]",
  Assessment: "border border-[#4640DE] text-[#4640DE]",
  Offered: "border border-[#4640DE] text-[#4640DE]",
  Interviewing: "border border-[#FFB836] text-[#FFB836]",
  Unsuitable: "border border-[#FF6550] text-[#FF6550]",
};

export default function ApplicationsTable({ items }: { items: Application[] }) {
  if (!application.length)
    return (
      <div className="p-6 bg-white mt-4 text-center">
        No applications found.
      </div>
    );

  return (
    <div className="">
      {/* desktop table */}
      <div className="hidden md:block mt-3 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-sm text-neutral-60  tracking-wide ">
            <tr className="border-b border-[#D6DDEB] font-medium">
              <th className="p-4 w-12">#</th>
              <th className="p-4">Company Name</th>
              <th className="p-4">Roles</th>
              <th className="p-4">Date Applied</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="border-b-2 border-neutral-30">
            {items.map((it, index) => (
              <tr key={it.id} className={index % 2 ? "bg-[#F6F6FD]" : ""}>
                <td className="p-4 text-neutral-100">{index + 1}</td>
                <td className="p-4 ">
                  <div className="flex items-center gap-3 ">
                    <Image
                      width={40}
                      height={40}
                      src={it.logo}
                      className=""
                      alt="logo"
                    />
                    <span className="font-inter text-neutral-100">
                      {" "}
                      {it.companyName}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-neutral-100 font-inter">{it.role}</td>
                <td className="p-4 text-neutral-100 font-inter">
                  {it.dateApplied}
                </td>
                <td className="p-4 text-neutral-100 font-inter">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusStyles[it.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {it.status}
                  </span>
                </td>
                <td className="m-auto ">
                  <button className="text-3xl text-neutral-100 cursor-pointer">
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <div className="md:hidden space-y-4 mt-3 border-t-2 border-neutral-30">
        {items.map((it, index) => (
          <div
            key={it.id}
            className={`rounded-xl p-5 ${
              index % 2 ? "bg-[#F6F6FD]" : "bg-white"
            }`}
          >
            <div className="relative">
              <Image width={50} height={50} src={it.logo} alt="logo" />

              <button className="absolute -top-5 right-0 text-3xl leading-none text-neutral-100">
                ...
              </button>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold font-epilogue text-neutral-100">
                {it.companyName}
              </h3>

              <p className="text-neutral-100 font-epilogue">{it.role}</p>
            </div>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-lg text-neutral-80">Date Applied</p>

                <p className="text-neutral-100 font-epilogue">
                  {it.dateApplied}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  statusStyles[it.status] ||
                  "border border-gray-300 text-gray-700"
                }`}
              >
                {it.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

interface TeamSectionProps {
  teamMembers: {
    image: string;
    name: string;
    role: string;
  }[];
}

export default function CompanyProfileTeam ({ teamMembers }: TeamSectionProps) {
  return (
    <div className="w-full mx-auto py-6 md:py-5">
      <hr className="bg-[#D6DDEB] mb-3" />
      <div className="flex py-5 justify-between">
        <h1 className="text-neutral-100 text-3xl font-clash font-bold ">
          Team
        </h1>

        <div className="flex items-center gap-2">
          <button className="border border-gray-200 p-1.5  ">
            <PlusIcon className="w-4 h-4 text-brand" />
          </button>
          <button className="border border-gray-200 p-1.5   ">
            <PencilSquareIcon className="w-4 h-4 text-brand" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar md:grid md:grid-cols-3">
        {teamMembers.slice(0, 3).map((member) => (
          <div
            key={member.name}
            className="md:w-full shrink-0 border border-[#D6DDEB] py-4 px-4 flex flex-col items-center text-center"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={50}
              height={50}
              className="w-20 h-20 md:w-15 md:h-15 rounded-full object-cover"
            />

            <h3 className="mt-4 text-sm font-semibold text-neutral-100">
              {member.name}
            </h3>

            <p className="text-neutral-60 mt-1 text-sm">{member.role}</p>

            <div className="flex items-center gap-4 mt-3 text-neutral-60">
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>
        ))}
      </div>
      <Link
        href="#"
        className="text-base md:text-[16px] text-brand font-epilogue font-semibold break-all mt-5 inline-flex items-center"
      >
        View all core teams
        <ArrowRightIcon className="inline-block h-5 w-5 ml-5" />
      </Link>
    </div>
  );
};



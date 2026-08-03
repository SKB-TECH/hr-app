import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

interface TeamSectionProps {
  teamMembers: {
    image: string;
    name: string;
    role: string;
  }[];
}

const TeamSection = ({ teamMembers }: TeamSectionProps) => {
  return (
    <div className="px-4 md:px-12   w-full max-w-7xl mx-auto py-6 md:py-10">
      <hr className="bg-[#D6DDEB]" />
      <div className="flex mb-5 mt-15 justify-between">
        <h1 className="text-neutral-100 text-3xl font-clash font-bold ">
          Team
        </h1>
        <h1 className="text-brand text-lg font-epilogue font-semibold">
          See all (47)
        </h1>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-5">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="w-60 md:w-full shrink-0 border border-[#D6DDEB] bg-white p-3 flex flex-col items-center text-center"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
            />

            <h3 className="mt-4 text-xl font-semibold text-neutral-100">
              {member.name}
            </h3>

            <p className="text-neutral-60 mt-1">{member.role}</p>

            <div className="flex items-center gap-4 mt-5 text-neutral-60">
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

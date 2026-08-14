"use client";

import Image from "next/image";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { TeamMember } from "../Teams";

interface TeamMemberCardProps {
  member: TeamMember;
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="border border-gray-200 rounded-sm p-6 flex flex-col items-center text-center hover:border-brand/30 transition-colors">
      <Image
        src={member.avatar}
        alt={member.name}
        width={80}
        height={80}
        className="rounded-full object-cover w-20 h-20 mb-4"
      />
      <h4 className="text-sm font-semibold text-neutral-100 mb-1">
        {member.name}
      </h4>
      <p className="text-sm text-gray-500 mb-4">{member.role}</p>
      <div className="flex items-center gap-3">
        {member.instagram && (
          <a
            href={member.instagram}
            className="text-gray-400 hover:text-neutral-100 transition-colors"
            aria-label={`${member.name} Instagram`}
          >
            <FiInstagram size={16} />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            className="text-gray-400 hover:text-neutral-100 transition-colors"
            aria-label={`${member.name} LinkedIn`}
          >
            <FiLinkedin size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

export default TeamMemberCard;

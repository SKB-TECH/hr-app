"use client";

import Image from "next/image";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { TeamMember } from "../Teams";

interface TeamMemberListItemProps {
  member: TeamMember;
}

function TeamMemberListItem({ member }: TeamMemberListItemProps) {
  return (
    <div className="border border-gray-200  px-6 py-4 flex items-center gap-4 hover:border-brand/30 transition-colors">
      <Image
        src={member.avatar}
        alt={member.name}
        width={48}
        height={48}
        className="rounded-full object-cover w-12 h-12 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-neutral-100">
          {member.name}
        </h4>
        <p className="text-sm text-gray-500">{member.role}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
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

export default TeamMemberListItem;

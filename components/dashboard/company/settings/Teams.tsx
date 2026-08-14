"use client";

import { useState } from "react";
import ProfileHeader from "../../candidate/settings/profile/ProfileHeader";
import SaveProfileButton from "../../candidate/settings/profile/SaveProfileButton";
import TeamHeader from "./team/TeamHeader";
import TeamMemberCard from "./team/TeamMemberCard";
import TeamMemberListItem from "./team/TeamMemberListItem";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  instagram?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Célestin Gardinier",
    role: "CEO & Co-Founder",
    avatar: "/profile1.jpg",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Reynaud Colbert",
    role: "Co-Founder",
    avatar: "/profile2.jpg",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Arienne Lyon",
    role: "Managing Director",
    avatar: "/profile3.jpg",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Bernard Alexander",
    role: "Managing Director",
    avatar: "/profile4.jpg",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Christine Jhonson",
    role: "Managing Director",
    avatar: "/profileImage.jpg",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Aaron Morgan",
    role: "Managing Director",
    avatar: "/zack.jpg",
    instagram: "#",
    linkedin: "#",
  },
];

function Teams() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex max-md:flex-col gap-4 md:gap-8 mt-6">
      <ProfileHeader
        header="Basic Information"
        paragraph="Add team members of your company"
        className="mb-0! "
      />
      <hr className="md:hidden bg-brand-light-neutral " />
      <form
        className="flex-1 "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex  max-md:flex-col gap-6 md:gap-16 mb-8">
          <div className="flex-1">
            <TeamHeader
              memberCount={teamMembers.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            <div className="hidden md:block">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <TeamMemberListItem key={member.id} member={member} />
                  ))}
                </div>
              )}
            </div>
            <div className="md:hidden space-y-3">
              {teamMembers.map((member) => (
                <TeamMemberListItem key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>

        <SaveProfileButton isSubmitting={false} />
      </form>
    </div>
  );
}

export default Teams;

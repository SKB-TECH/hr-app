
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

const teamMembers: TeamMember[] = [
  { name: "Emil Yancy", role: "Team Leader", photo: "/team/emil-yancy.png" },
  { name: "Coty Robin", role: "Senior Recruiter", photo: "/team/coty-robin.png" },
  { name: "Missie Moira", role: "Senior Recruiter", photo: "/team/missie-moira.png" },
  { name: "Presley Kiera", role: "Senior Recruiter", photo: "/team/presley-kiera.png" },
  { name: "Dave Jools", role: "Junior Recruiter", photo: "/team/dave-jools.png" },
  { name: "Ilene Leone", role: "Junior Recruiter", photo: "/team/ilene-leone.png" },
];

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white  overflow-hidden border border-gray-100 shadow-md transition-shadow duration-300">
  
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className=""
        />
      </div>
      {/* Info */}
      <div className="px-4 py-3">
        <p className="text-[#132745] text-md font-bold text-base">{member.name}</p>
        <p className="text-[#000000] text-sm mt-0.5">{member.role}</p>
      </div>
    </div>
  );
}

export default function OurTeam() {
  const topRow = teamMembers.slice(0, 4);
  const bottomRow = teamMembers.slice(4);

  return (
    <section className="w-full bg-[#F9F9F9] py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

    
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand mb-2">
            Our Team
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d2b4e]">
            We Are Career Specialists
          </h2>
        </div>

        {/* Top row — 4 cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-5">
          {topRow.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>

        <div className="flex justify-center gap-5">
          {bottomRow.map((member) => (
            <div key={member.name} className="w-1/2 md:w-1/4">
              <MemberCard member={member} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
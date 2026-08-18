"use client";

import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { Building2, CalendarDays, Globe2, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/core/lib/media-url";

export default function CompanyProfile() {
  const company = useMyCompany();
  if (company.isPending) return <State text="Loading company profile…" />;
  if (company.isError) return <div className="grid min-h-[50vh] place-items-center p-8 text-center"><div><p className="font-bold text-neutral-100">Unable to load company profile.</p><button onClick={() => void company.refetch()} className="mt-4 bg-brand px-5 py-3 text-sm font-bold text-white">Try again</button></div></div>;
  if (!company.data) return <State text="No company profile found. Complete it from Company Settings." />;
  const item = company.data;
  return <main className="pb-12">
    <div className="relative h-44 bg-gradient-to-r from-slate-900 to-cyan-800">{item.coverImage && <Image src={mediaUrl(item.coverImage)} alt="" fill className="object-cover" />}</div>
    <section className="px-5 md:px-8">
      <div className="relative -mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex min-w-0 items-end gap-4"><div className="grid size-28 shrink-0 place-items-center border-4 border-white bg-white shadow-sm">{item.logo ? <Image src={mediaUrl(item.logo)} alt={item.name} width={104} height={104} className="size-24 object-contain" /> : <Building2 size={42} className="text-brand" />}</div><div className="min-w-0 pb-2"><h1 className="truncate text-2xl font-bold text-neutral-100 sm:text-3xl">{item.name}</h1>{item.website && <a href={item.website} target="_blank" rel="noreferrer" className="block truncate text-sm text-brand">{item.website}</a>}</div></div>
        <Link href="/company/settings" className="mb-2 bg-brand px-5 py-3 text-sm font-bold text-white">Edit company profile</Link>
      </div>
      <div className="mt-7 grid gap-4 border-y border-brand-light-neutral py-5 sm:grid-cols-2 lg:grid-cols-4">
        <Fact icon={<CalendarDays />} label="Founded" value={item.foundationDate ? new Date(item.foundationDate).getFullYear().toString() : "Not specified"} />
        <Fact icon={<Users />} label="Employees" value={item.companySize || "Not specified"} />
        <Fact icon={<MapPin />} label="Location" value={item.location || item.locations[0] || "Remote"} />
        <Fact icon={<Globe2 />} label="Industry" value={item.industry || "Not specified"} />
      </div>
      <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div><h2 className="text-2xl font-bold">About</h2><p className="mt-4 whitespace-pre-line leading-7 text-neutral-80">{item.description || "Add a company description from settings."}</p>
          {item.gallery.length > 0 && <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">{item.gallery.map((image) => <div key={image} className="relative aspect-video"><Image src={image} alt="Company gallery" fill className="object-cover" /></div>)}</div>}
          <h2 className="mt-10 text-2xl font-bold">Core team</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{item.teamMembers?.length ? item.teamMembers.map((member) => <article key={member.id} className="border border-brand-light-neutral p-4 text-center">{member.avatar ? <Image src={member.avatar} alt={member.name} width={64} height={64} className="mx-auto size-16 rounded-full object-cover" /> : <div className="mx-auto grid size-16 place-items-center rounded-full bg-accent-light-brand font-bold text-brand">{member.name.slice(0, 2).toUpperCase()}</div>}<h3 className="mt-3 font-bold">{member.name}</h3><p className="text-xs text-neutral-60">{member.role}</p></article>) : <p className="text-sm text-neutral-60">No public team member yet.</p>}</div>
          <h2 className="mt-10 text-2xl font-bold">Benefits</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{item.perks.length ? item.perks.map((perk) => <article key={perk.title} className="border border-brand-light-neutral p-4"><h3 className="font-bold text-brand">{perk.title}</h3><p className="mt-2 text-sm text-neutral-60">{perk.description}</p></article>) : <p className="text-sm text-neutral-60">No benefits added.</p>}</div>
        </div>
        <aside><h2 className="text-2xl font-bold">Tech stack</h2><div className="mt-4 flex flex-wrap gap-2">{item.techStack.length ? item.techStack.map((tech) => <span key={tech} className="bg-accent-light-brand px-3 py-2 text-sm font-semibold text-brand">{tech}</span>) : <span className="text-sm text-neutral-60">No technologies added.</span>}</div><h2 className="mt-8 text-xl font-bold">Offices</h2><div className="mt-3 space-y-2">{item.locations.map((location) => <p key={location} className="flex items-center gap-2 text-sm"><MapPin size={15} className="text-brand" />{location}</p>)}</div></aside>
      </div>
    </section>
  </main>;
}

function State({ text }: { text: string }) { return <div className="grid min-h-[50vh] place-items-center p-8 text-center text-neutral-60">{text}</div>; }
function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3 text-brand">{icon}<div><p className="text-xs text-neutral-60">{label}</p><p className="text-sm font-bold text-neutral-100">{value}</p></div></div>; }

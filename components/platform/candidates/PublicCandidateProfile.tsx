"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, ExternalLink, MapPin } from "lucide-react";
import { getPublicCandidateProfile } from "@/core/services/candidate/get-public-candidate-profile.service";
import { mediaUrl } from "@/core/lib/media-url";
import type { PublicCandidateProfile as Profile } from "@/core/types/public-candidate-profile";

const Linkedin = ExternalLink;
const Github = ExternalLink;

export default function PublicCandidateProfile({ profileId }: { profileId: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { getPublicCandidateProfile(profileId).then(setProfile).catch(() => setFailed(true)); }, [profileId]);
  if (failed) return <main className="mx-auto grid min-h-[55vh] max-w-5xl place-items-center px-5 text-center"><div><h1 className="text-2xl font-bold">Profil indisponible</h1><p className="mt-2 text-neutral-60">Ce profil n’existe pas ou le candidat l’a rendu privé.</p></div></main>;
  if (!profile) return <main className="mx-auto grid min-h-[55vh] max-w-5xl place-items-center px-5 text-neutral-60">Chargement du profil…</main>;
  const avatar = profile.avatar ? mediaUrl(profile.avatar) : null;
  const location = [profile.cityName, profile.countryName].filter(Boolean).join(", ");
  return <main className="mx-auto max-w-5xl space-y-5 px-5 py-10">
    <section className="border border-brand-light-neutral bg-white p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center">{avatar && <Image src={avatar} alt={profile.fullName} width={112} height={112} className="size-28 rounded-full object-cover"/>}<div><div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-bold">{profile.fullName}</h1>{profile.openToWork && <span className="bg-accent-light-brand px-3 py-1 text-xs font-bold text-brand">Disponible</span>}</div><p className="mt-2 text-lg text-neutral-60">{profile.headline || "Candidat"}</p><div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-60">{location && <span className="flex items-center gap-1"><MapPin size={16}/>{location}</span>}{profile.yearsExperience != null && <span className="flex items-center gap-1"><BriefcaseBusiness size={16}/>{profile.yearsExperience} an(s) d’expérience</span>}</div><div className="mt-4 flex gap-3">{profile.linkedinUrl && <Social href={profile.linkedinUrl} label="LinkedIn"><Linkedin size={17}/></Social>}{profile.githubUrl && <Social href={profile.githubUrl} label="GitHub"><Github size={17}/></Social>}{profile.portfolioUrl && <Social href={profile.portfolioUrl} label="Portfolio"><ExternalLink size={17}/></Social>}</div></div></div></section>
    {profile.bio && <Section title="À propos"><p className="whitespace-pre-wrap leading-7 text-neutral-60">{profile.bio}</p></Section>}
    {profile.skills.length > 0 && <Section title="Compétences"><div className="flex flex-wrap gap-2">{profile.skills.map((skill) => <span key={skill.id} className="bg-accent-light-brand px-3 py-2 text-sm font-semibold text-brand">{skill.name}</span>)}</div></Section>}
    {profile.experiences.length > 0 && <Section title="Expériences">{profile.experiences.map((item) => <article key={item.id} className="border-b border-brand-light-neutral py-4 last:border-0"><h3 className="font-bold">{item.jobTitle || "Expérience professionnelle"}</h3><p className="text-sm text-brand">{item.companyName}</p>{item.description && <p className="mt-2 text-sm leading-6 text-neutral-60">{item.description}</p>}</article>)}</Section>}
    {profile.portfolios.length > 0 && <Section title="Portfolio"><div className="grid gap-4 sm:grid-cols-2">{profile.portfolios.map((item) => <article key={item.id} className="border border-brand-light-neutral p-4"><h3 className="font-bold">{item.title || "Projet"}</h3>{item.description && <p className="mt-2 text-sm text-neutral-60">{item.description}</p>}{item.projectUrl && <a href={item.projectUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">Voir le projet <ExternalLink size={14}/></a>}</article>)}</div></Section>}
  </main>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="border border-brand-light-neutral bg-white p-6"><h2 className="mb-4 text-xl font-bold">{title}</h2>{children}</section>; }
function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) { return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-10 place-items-center border border-brand-light-neutral text-brand hover:bg-accent-light-brand">{children}</a>; }

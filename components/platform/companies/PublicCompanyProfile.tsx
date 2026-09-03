"use client";

import {
  Building2,
  ExternalLink,
  MapPin,
  Users,
  ArrowLeft,
  ImageOff,
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useCompany } from "@/core/hooks/company/use-company";
import { Skeleton } from "@/components/dashboard/candidate/applicant/profile/shared/Skeleton";

function ProfileSkeleton() {
  return (
    <main className='pb-16 animate-pulse'>
      <Skeleton className='h-56 w-full rounded-none' />
      <div className='mx-auto max-w-7xl px-4 md:px-12'>
        <div className='-mt-12 flex items-end gap-4'>
          <Skeleton className='z-10 size-28 shrink-0 rounded-2xl border-4 border-white' />
          <div className='space-y-2 pb-2'>
            <Skeleton className='h-7 w-48' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>
        <div className='mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]'>
          <div className='space-y-3'>
            <Skeleton className='h-6 w-24' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
          <div className='space-y-3'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
          </div>
        </div>
      </div>
    </main>
  );
}

export function PublicCompanyProfile({ id }: { id: string }) {
  const company = useCompany(id);

  if (company.isPending) return <ProfileSkeleton />;

  if (company.isError || !company.data) {
    return (
      <div className='grid min-h-[60vh] place-items-center px-4 text-center'>
        <div className='flex flex-col items-center gap-3'>
          <span className='grid size-14 place-items-center rounded-full bg-accent-light-brand text-brand'>
            <Building2 size={28} />
          </span>
          <p className='text-lg font-bold text-neutral-100'>
            Company not found
          </p>
          <p className='max-w-sm text-sm text-neutral-60'>
            This company may have been removed or the link is incorrect.
          </p>
          <Link
            href='/companies'
            className='mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline'
          >
            <ArrowLeft size={15} />
            Back to companies
          </Link>
        </div>
      </div>
    );
  }

  const item = company.data;

  return (
    <main className='pb-16'>
      {/* Cover */}
      <div className='relative h-48 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-800 md:h-64'>
        {item.coverImage && (
          <Image
            src={item.coverImage}
            alt=''
            fill
            priority
            className='object-cover'
          />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/10' />
        <div className='absolute left-4 top-4 md:left-12 md:top-6'>
          <Link
            href='/companies'
            className='inline-flex items-center gap-1.5 rounded-none bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-100 backdrop-blur transition hover:bg-white'
          >
            <ArrowLeft size={13} />
            All companies
          </Link>
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-4 md:px-12'>
        {/* Identity */}
        <div className='-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end md:-mt-14'>
          {item.logo ? (
            <Image
              src={item.logo}
              alt={item.name}
              width={112}
              height={112}
              className='z-10 size-24 shrink-0 rounded-2xl border-4 border-white bg-white object-contain shadow-md md:size-28'
            />
          ) : (
            <span className='z-10 grid size-24 shrink-0 place-items-center rounded-none border-4 border-white bg-white shadow-md md:size-28'>
              <Building2 size={40} className='text-neutral-60' />
            </span>
          )}

          <div className='pb-1 bg-red-50/0 sm:flex-1 sm:pb-0'>
            <h1 className='mt-20 text-2xl font-bold text-neutral-100 md:text-3xl'>
              {item.name}
            </h1>
            <div className='mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-60'>
              <span className='flex items-center gap-1'>
                <MapPin size={14} />
                {item.location || "Remote"}
              </span>
              {item.industry && (
                <span className='flex items-center gap-1'>
                  <Building2 size={14} />
                  {item.industry}
                </span>
              )}
              {item.companySize && (
                <span className='flex items-center gap-1'>
                  <Users size={14} />
                  {item.companySize} employees
                </span>
              )}
            </div>
          </div>
          {item.website && (
            <a
              href={item.website}
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center justify-center gap-2 rounded-none bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-800 sm:ml-auto sm:mb-1'
            >
              Visit website
              <ExternalLink size={15} />
            </a>
          )}
        </div>

        {/* Content */}
        <div className='mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]'>
          <article className='min-w-0'>
            <h2 className='text-xl font-bold text-neutral-100 md:text-2xl'>
              About
            </h2>
            <p className='mt-3 whitespace-pre-line leading-7 text-neutral-80'>
              {item.description || "No description available."}
            </p>

            {item.gallery.length > 0 && (
              <div className='mt-8 grid grid-cols-2 gap-3'>
                {item.gallery.map((src) => (
                  <div
                    key={src}
                    className='relative aspect-video overflow-hidden rounded-lg bg-neutral-10'
                  >
                    <Image
                      src={src}
                      alt='Company'
                      fill
                      className='object-cover transition hover:scale-105'
                    />
                  </div>
                ))}
              </div>
            )}

            {item.perks.length > 0 && (
              <div className='mt-10'>
                <h2 className='text-xl font-bold text-neutral-100 md:text-2xl'>
                  Benefits
                </h2>
                <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                  {item.perks.map((perk) => (
                    <div
                      key={perk.title}
                      className='rounded-lg border border-brand-light-neutral p-4'
                    >
                      <b className='text-brand'>{perk.title}</b>
                      <p className='mt-2 text-sm leading-6 text-neutral-60'>
                        {perk.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.gallery.length === 0 && item.perks.length === 0 && (
              <div className='mt-10 flex flex-col items-center gap-2 rounded-none border border-dashed border-brand-light-neutral py-10 text-center text-neutral-60'>
                <ImageOff size={22} />
                <p className='text-sm'>
                  This company hasn&apos;t added photos or benefits yet.
                </p>
              </div>
            )}
          </article>

          <aside className='lg:sticky lg:top-6 lg:self-start'>
            <div className='rounded-none border border-brand-light-neutral p-5'>
              <h2 className='text-lg font-bold text-neutral-100'>
                Company details
              </h2>
              <dl className='mt-4 space-y-4 text-sm'>
                <div>
                  <dt className='text-neutral-60'>Industry</dt>
                  <dd className='font-bold text-neutral-100'>
                    {item.industry || "—"}
                  </dd>
                </div>
                <div>
                  <dt className='text-neutral-60'>Company size</dt>
                  <dd className='font-bold text-neutral-100'>
                    {item.companySize || "—"}
                  </dd>
                </div>
                <div>
                  <dt className='text-neutral-60'>Locations</dt>
                  <dd className='font-bold text-neutral-100'>
                    {item.locations.length > 0
                      ? item.locations.join(", ")
                      : item.location || "—"}
                  </dd>
                </div>
              </dl>

              {item.techStack.length > 0 && (
                <>
                  <h3 className='mt-6 text-sm font-bold text-neutral-100'>
                    Tech stack
                  </h3>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className='rounded-full bg-accent-light-brand px-3 py-1.5 text-xs font-bold text-brand'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useCompanies } from "@/core/hooks/company/use-companies";
import { Building2, MapPin } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function CompaniesDirectory() {
  const t = useTranslations("companiesBrowse");
  const [search, setSearch] = useState("");
  const companies = useCompanies({ search, limit: 24 });
  return <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-12">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-3xl font-bold text-neutral-100">{t("directory.heading")}</h2><p className="text-neutral-60">{t("directory.subtitle")}</p></div><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("directory.searchPlaceholder")} className="h-12 border border-brand-light-neutral px-4 sm:w-80"/></div>
    {companies.isPending && <p className="py-16 text-center text-neutral-60">{t("directory.loading")}</p>}
    {companies.isError && <p className="py-16 text-center text-accent-red">{t("directory.error")}</p>}
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{companies.data?.data.map((company) => <Link key={company.id} href={`/companies/${company.id}`} className="border border-brand-light-neutral p-5 transition hover:border-brand"><div className="flex items-start gap-4">{company.logo ? <Image src={company.logo} alt={company.name} width={56} height={56} className="size-14 object-contain"/> : <span className="grid size-14 place-items-center bg-accent-light-brand"><Building2 className="text-brand"/></span>}<div><h3 className="font-bold text-neutral-100">{company.name}</h3><p className="mt-1 flex items-center gap-1 text-xs text-neutral-60"><MapPin size={12}/>{company.location || t("shared.remoteFallback")}</p><span className="mt-2 inline-block bg-accent-light-brand px-2 py-1 text-[10px] font-bold text-brand">{company.industry || t("directory.industryFallback")}</span></div></div><p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-60">{company.description || t("directory.descriptionFallback")}</p></Link>)}</div>
  </section>;
}

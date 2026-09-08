"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import SubmitButton from "../shared/SubmitButton";
import { WORK_TYPE_OPTIONS, AVAILABILITY_OPTIONS } from "./candidate-profile-options";
import { useUpdateCandidateProfile } from "@/core/hooks/candidate/use-update-candidate-profile";
import { toCandidateProfileInput } from "@/core/services/candidate/to-candidate-profile-input";
import type { CandidateProfile } from "@/core/types/candidate-profile";
import { ApiError } from "@/core/types/api";
import LanguageSelect from "@/components/ui/LanguageSelect";
import CountrySelect from "@/components/ui/CountrySelect";
import ProfessionSelect from "@/components/ui/ProfessionSelect";
import { X } from "lucide-react";
import { usePlatformReferences } from "@/core/hooks/references/use-platform-references";
import { useProfessions } from "@/core/hooks/references/use-professions";

type WorkPreferencesFormValues = {
  yearsExperience: string;
  workType: string;
  availability: string;
  expectedSalaryMin: string;
  expectedSalaryMax: string;
  salaryCurrency: string;
};

const LEVELS = ["beginner", "intermediate", "advanced", "fluent", "native"] as const;
const EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];

// Maps the snake_case values in candidate-profile-options.ts to the camelCase
// translation keys under candidateProfileCore.workTypeOptions / availabilityOptions.
function toOptionKey(value: string): string {
  return value.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());
}

interface EditWorkPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CandidateProfile;
}

export default function EditWorkPreferencesModal({ open, onOpenChange, profile }: EditWorkPreferencesModalProps) {
  const t = useTranslations("candidateProfileCore.editWorkPreferencesModal");
  const tWorkType = useTranslations("candidateProfileCore.workTypeOptions");
  const tAvailability = useTranslations("candidateProfileCore.availabilityOptions");
  const updateProfile = useUpdateCandidateProfile();
  const isPending = updateProfile.isPending;
  const submittingRef = useRef(false);
  const [languages, setLanguages] = useState<Array<{code:string;level:typeof LEVELS[number]}>>([]);
  const [languageCode, setLanguageCode] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [professionIds, setProfessionIds] = useState<string[]>([]);
  const [professionId, setProfessionId] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [acceptsRemote, setAcceptsRemote] = useState(false);
  const languageCatalog = usePlatformReferences("language");
  const professionCatalog = useProfessions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkPreferencesFormValues>({
    defaultValues: { yearsExperience: "", workType: "", availability: "", expectedSalaryMin: "", expectedSalaryMax: "", salaryCurrency: "USD" },
  });

  useEffect(() => {
    if (!open) return;
    const details = profile.candidateProfile;
    reset({
      yearsExperience: details?.yearsExperience != null ? String(details.yearsExperience) : "",
      workType: details?.workType || "",
      availability: details?.availability || "",
      expectedSalaryMin: details?.expectedSalaryMin || "",
      expectedSalaryMax: details?.expectedSalaryMax || "",
      salaryCurrency: details?.salaryCurrency || "USD",
    });
    setLanguages(details?.languageProficiencies || (details?.languageCodes || []).map(code=>({code,level:"intermediate" as const})));
    setCountries(details?.preferredCountries || []);
    setProfessionIds(details?.preferredProfessionIds || []);
    setEmploymentTypes(details?.preferredEmploymentTypes || []);
    setAcceptsRemote(details?.acceptsRemote ?? details?.workType === "remote");
  }, [open, profile, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: WorkPreferencesFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      await updateProfile.mutateAsync(
        toCandidateProfileInput(profile, {
          yearsExperience: values.yearsExperience.trim() ? Number(values.yearsExperience) : null,
          workType: values.workType || null,
          availability: values.availability || null,
          expectedSalaryMin: values.expectedSalaryMin ? values.expectedSalaryMin : null,
          expectedSalaryMax: values.expectedSalaryMax ? values.expectedSalaryMax : null,
          salaryCurrency: values.salaryCurrency || "USD",
          languageProficiencies: languages,
          languageCodes: languages.map(item=>item.code),
          preferredCountries: countries,
          preferredProfessionIds: professionIds,
          preferredEmploymentTypes: employmentTypes,
          acceptsRemote,
        }),
      );
      toast.success(t("successToast"));
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("Work preferences update rejected by backend:", error.status, error.details);
      }
      toast.error(error instanceof ApiError ? error.message : t("errorToast"));
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <ProfileEntryModal
      open={open}
      onOpenChange={onOpenChange}
      isPending={isPending}
      icon={<BriefcaseIcon className="h-5 w-5" />}
      title={t("title")}
      description={t("description")}
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit)(event);
        }}
        className="mt-5 space-y-5"
      >
        <div>
          <label htmlFor="profile-years-experience" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("yearsLabel")}
          </label>
          <input
            id="profile-years-experience"
            type="number"
            min={0}
            max={60}
            step={1}
            placeholder={t("yearsPlaceholder")}
            aria-invalid={Boolean(errors.yearsExperience)}
            aria-describedby={errors.yearsExperience ? "profile-years-experience-error" : undefined}
            className="w-full rounded-none border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("yearsExperience", {
              validate: (value) => {
                if (!value.trim()) return true;
                const parsed = Number(value);
                return (Number.isInteger(parsed) && parsed >= 0 && parsed <= 60) || t("yearsError");
              },
            })}
          />
          {errors.yearsExperience && (
            <p id="profile-years-experience-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.yearsExperience.message}
            </p>
          )}
        </div>

        <PreferenceBlock title="Langues maîtrisées et niveau">
          <div className="grid gap-2 sm:grid-cols-[1fr_150px_auto]"><LanguageSelect value={languageCode} onChange={setLanguageCode}/><select id="language-level" className="border border-gray-300 bg-white px-3" defaultValue="intermediate">{LEVELS.map(level=><option key={level} value={level}>{levelLabel(level)}</option>)}</select><button type="button" disabled={!languageCode||languages.some(item=>item.code===languageCode)} onClick={()=>{const select=document.getElementById("language-level") as HTMLSelectElement;setLanguages([...languages,{code:languageCode,level:select.value as typeof LEVELS[number]}]);setLanguageCode("")}} className="bg-brand px-4 py-2 font-bold text-white disabled:opacity-40">Ajouter</button></div>
          <Chips items={languages.map(item=>({key:item.code,label:`${languageCatalog.data?.find(language=>language.code.toLowerCase()===item.code.toLowerCase())?.name||item.code.toUpperCase()} · ${levelLabel(item.level)}`}))} remove={code=>setLanguages(languages.filter(item=>item.code!==code))}/>
        </PreferenceBlock>

        <PreferenceBlock title="Métiers recherchés">
          <div className="flex gap-2"><div className="flex-1"><ProfessionSelect value={professionId} onChange={setProfessionId}/></div><button type="button" disabled={!professionId||professionIds.includes(professionId)} onClick={()=>{setProfessionIds([...professionIds,professionId]);setProfessionId("")}} className="bg-brand px-4 font-bold text-white disabled:opacity-40">Ajouter</button></div>
          <Chips items={professionIds.map(id=>({key:id,label:professionCatalog.data?.find(item=>item.id===id)?.name||id}))} remove={id=>setProfessionIds(professionIds.filter(item=>item!==id))}/>
        </PreferenceBlock>

        <PreferenceBlock title="Pays souhaités">
          <div className="flex gap-2"><div className="flex-1"><CountrySelect value={country} onChange={setCountry}/></div><button type="button" disabled={!country||countries.includes(country)} onClick={()=>{setCountries([...countries,country]);setCountry("")}} className="bg-brand px-4 font-bold text-white disabled:opacity-40">Ajouter</button></div>
          <Chips items={countries.map(value=>({key:value,label:value}))} remove={value=>setCountries(countries.filter(item=>item!==value))}/>
          <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={acceptsRemote} onChange={event=>setAcceptsRemote(event.target.checked)}/>J’accepte les offres en télétravail</label>
        </PreferenceBlock>

        <PreferenceBlock title="Types de contrat recherchés"><div className="grid grid-cols-2 gap-2">{EMPLOYMENT_TYPES.map(type=><label key={type} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={employmentTypes.includes(type)} onChange={()=>setEmploymentTypes(employmentTypes.includes(type)?employmentTypes.filter(item=>item!==type):[...employmentTypes,type])}/>{type.replaceAll("_"," ")}</label>)}</div></PreferenceBlock>

        <PreferenceBlock title="Prétention salariale"><div className="grid grid-cols-3 gap-2"><input type="number" min="0" placeholder="Minimum" className="border px-3 py-3" {...register("expectedSalaryMin")}/><input type="number" min="0" placeholder="Maximum" className="border px-3 py-3" {...register("expectedSalaryMax")}/><select className="border bg-white px-3" {...register("salaryCurrency")}><option>USD</option><option>EUR</option><option>CDF</option><option>RWF</option></select></div></PreferenceBlock>

        <div>
          <label htmlFor="profile-work-type" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("workTypeLabel")}
          </label>
          <select
            id="profile-work-type"
            className="w-full cursor-pointer rounded-none border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-brand"
            {...register("workType")}
          >
            <option value="">{t("selectOption")}</option>
            {WORK_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {tWorkType(toOptionKey(option.value))}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="profile-availability" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("availabilityLabel")}
          </label>
          <select
            id="profile-availability"
            className="w-full cursor-pointer rounded-none border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-brand"
            {...register("availability")}
          >
            <option value="">{t("selectOption")}</option>
            {AVAILABILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {tAvailability(toOptionKey(option.value))}
              </option>
            ))}
          </select>
        </div>

        <DialogFooter className="-mx-6 -mb-6 mt-2 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
            {t("cancel")}
          </Button>
          <SubmitButton isPending={isPending} label={t("save")} />
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}

function PreferenceBlock({title,children}:{title:string;children:React.ReactNode}){return <div className="border-t pt-5"><h3 className="mb-3 font-bold text-[#25324B]">{title}</h3>{children}</div>}
function Chips({items,remove}:{items:Array<{key:string;label:string}>;remove:(key:string)=>void}){return <div className="mt-3 flex flex-wrap gap-2">{items.map(item=><span key={item.key} className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-2 text-sm text-brand">{item.label}<button type="button" onClick={()=>remove(item.key)}><X size={14}/></button></span>)}</div>}
function levelLabel(level:string){return ({beginner:"Débutant",intermediate:"Intermédiaire",advanced:"Avancé",fluent:"Courant",native:"Langue maternelle"} as Record<string,string>)[level]||level}

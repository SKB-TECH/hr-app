"use client";

import { useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import ProfileHeader from "../../candidate/settings/profile/ProfileHeader";
import ProfilePhoto from "../../candidate/settings/profile/ProfilePhoto";
import SaveProfileButton from "../../candidate/settings/profile/SaveProfileButton";
import CompanyDetails from "./overview/CompanyDetails";
import AboutCompany from "./overview/AboutCompany";

export interface ProfileFormValues {
  companyName: string;
  website: string;
  location: string[];
  employee: string;
  industry: string;
  date: number;
  month: string;
  year: number;
  tech_stack: string[];
  description: string;
  profileImage: File | null;
}

export interface PersonalFormProps {
  handleSubmit: UseFormHandleSubmit<ProfileFormValues>;
  onSubmit: SubmitHandler<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  isSubmitting?: boolean;
  register: UseFormRegister<ProfileFormValues>;
  setValue?: UseFormSetValue<ProfileFormValues>;
  initialLocations?: string[];
  initialTechStack?: string[];
  initialDescription?: string;
}

function Overview({
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  register,
  setValue,
  initialLocations = [],
  initialTechStack = [],
  initialDescription = "",
}: PersonalFormProps) {
  const [locationTags, setLocationTags] = useState<string[]>(initialLocations);
  const [techStackTags, setTechStackTags] = useState<string[]>(initialTechStack);
  const [description, setDescription] = useState(initialDescription);

  const submit: SubmitHandler<ProfileFormValues> = (values, event) =>
    onSubmit(
      { ...values, location: locationTags, tech_stack: techStackTags, description },
      event,
    );

  return (
    <div className="mt-6 pb-10">
      <ProfileHeader
        header="Basic Information"
        paragraph="This is company information that you can update anytime."
      />
      <hr className="mb-8" />

      <form onSubmit={handleSubmit(submit)}>
        <ProfilePhoto
          heading="Company Logo"
          paragraph="This image will be shown publicly as company logo."
          imagePlaceholder="/Nomad.png"
          imageClassName="h-28 w-28 rounded-none object-contain"
          dropzoneClassName="max-w-[384px] rounded-none"
          setValue={setValue}
        />
        <hr className="mb-8" />

        <CompanyDetails
          register={register}
          errors={errors}
          setValue={setValue}
          locationTags={locationTags}
          setLocationTags={setLocationTags}
          techStackTags={techStackTags}
          setTechStackTags={setTechStackTags}
        />
        <hr className="mb-8" />

        <AboutCompany
          description={description}
          onDescriptionChange={setDescription}
        />
        <hr className="mb-8" />

        {isSubmitting !== undefined && (
          <SaveProfileButton isSubmitting={isSubmitting} />
        )}
      </form>
    </div>
  );
}
export default Overview;

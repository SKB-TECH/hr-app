"use client";

import { useForm } from "react-hook-form";
import ProfileHeader from "../../candidate/settings/profile/ProfileHeader";
import InputField from "../../candidate/settings/profile/InputField";
import SaveProfileButton from "../../candidate/settings/profile/SaveProfileButton";

interface SocialLinksFormValues {
  instagram: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
}

function SocialLinks() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SocialLinksFormValues>({
    defaultValues: {
      instagram: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
    },
  });

  const onSubmit = async (data: SocialLinksFormValues) => {
  };

  return (
    <div className="flex max-md:flex-col gap-4 md:gap-8 mt-6">
      <div className="w-2/6 max-md:w-full ">
        <ProfileHeader
          header="Basic Information"
          paragraph="Add elsewhere links to your company profile. You can add only username without full https links."
        />
      </div>

      <form className="flex-1  " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex  max-md:flex-col justify-start gap-6 md:gap-16 mb-8">
          <div className="flex-1 space-y-5">
            <InputField
              {...register("instagram")}
              label="Instagram"
              placeholder="https://www.instagram.com/nomad/"
            />
            <InputField
              {...register("twitter")}
              label="Twitter"
              placeholder="https://twitter.com/nomad/"
            />
            <InputField
              {...register("facebook")}
              label="Facebook"
              placeholder="https://web.facebook.com/nomad/"
            />
            <InputField
              {...register("linkedin")}
              label="LinkedIn"
              placeholder="Enter your LinkedIn address"
            />
            <InputField
              {...register("youtube")}
              label="Youtube"
              placeholder="Enter your youtube address"
            />
          </div>
        </div>

        <SaveProfileButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}

export default SocialLinks;

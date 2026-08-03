import AccountType from "./AccountType";
import PersonalDetails from "./PersonalDetails";
import ProfileHeader from "./ProfileHeader";
import ProfilePhoto from "./ProfilePhoto";
import SaveProfileButton from "./SaveProfileButton";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface ProfileFormValues {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  accountType: "jobSeeker" | "employer";
  profileImage: File | null;
}

export interface PersonalFormProps {
  handleSubmit: UseFormHandleSubmit<ProfileFormValues>;
  onSubmit: SubmitHandler<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  isSubmitting?: boolean;
  register: UseFormRegister<ProfileFormValues>;
  setValue?: UseFormSetValue<ProfileFormValues>;
}

function SettingsProfile({
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  register,
  setValue,
}: PersonalFormProps) {
  return (
    <div>
      <ProfileHeader
        header="Basic information"
        paragraph="This is your personal information that you can update anytime. "
      />
      <hr className="mb-8" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfilePhoto
          heading="Profile Photo"
          paragraph="This image will be shown publicly as your profile picture. it will help recruiters recognize you!"
          imagePlaceholder="/profileImage.jpg"
          setValue={setValue}
        />
        <hr className="mb-8" />

        <PersonalDetails
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          register={register}
          setValue={setValue}
        />
        <hr className="mb-8" />

        <AccountType register={register} />
        <hr className="mb-6" />

        {isSubmitting !== undefined && (
          <SaveProfileButton isSubmitting={isSubmitting} />
        )}
      </form>
    </div>
  );
}
export default SettingsProfile;

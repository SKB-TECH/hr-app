import SettingsProfile from "./SettingsProfile";
import useSettingsForm from "@/hooks/useSettingsForm";
import { ProfileFormValues } from "./SettingsProfile";

function ProfileWrapper() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, setValue } =
    useSettingsForm<ProfileFormValues>({
      defaults: {
        accountType: "jobSeeker",
        profileImage: null,
      },
    });

  return (
    <div>
      {" "}
      <SettingsProfile
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        setValue={setValue}
      />
    </div>
  );
}

export default ProfileWrapper;

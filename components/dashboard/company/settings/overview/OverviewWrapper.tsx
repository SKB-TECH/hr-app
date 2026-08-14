import useSettingsForm from "@/hooks/useSettingsForm";
import Overview, { ProfileFormValues } from "../Overview";

function OverviewWrapper() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, setValue } =
    useSettingsForm<ProfileFormValues>({
      defaults: {
        companyName: "Nomad",
        website: "Https://www.nomad.com",
        location: ["England", "Japan", "Australia"],
        employee: "1 - 50",
        industry: "Technology",
        date: 31,
        month: "July",
        year: 2021,
        tech_stack: ["HTML 5", "CSS 3", "Javascript"],
        description:
          "Nomad is part of the Information Technology Industry. We believe travellers want to experience all life and need their local people. Nomad has 30 total employees across all of its locations and generates $1.50 million in sales.",
        profileImage: null,
      },
    });

  return (
    <div>
      <Overview
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
export default OverviewWrapper;

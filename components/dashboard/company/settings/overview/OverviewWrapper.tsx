import useSettingsForm from "@/hooks/useSettingsForm";
import Overview, { ProfileFormValues } from "../Overview";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useUpdateCompany } from "@/core/hooks/company/use-update-company";
import toast from "react-hot-toast";

function OverviewWrapper() {
  const company = useMyCompany();

  if (company.isPending) return <p className="py-20 text-center text-neutral-60">Loading company profile…</p>;
  if (company.isError || !company.data) return <p className="py-20 text-center text-accent-red">Unable to load company profile.</p>;

  return <OverviewForm company={company.data} />;
}

function OverviewForm({ company }: { company: NonNullable<ReturnType<typeof useMyCompany>["data"]> }) {
  const update = useUpdateCompany(company.id);
  const { register, handleSubmit, onSubmit, errors, isSubmitting, setValue } =
    useSettingsForm<ProfileFormValues>({
      defaults: {
        companyName: company.name,
        website: company.website || "",
        location: company.locations || [],
        employee: company.companySize || "1 - 50",
        industry: company.industry || "Technology",
        tech_stack: company.techStack || [],
        description: company.description || "",
        profileImage: null,
      },
      submitAction: async (values) => {
        const month = values.month ? new Date(`${values.month} 1, 2000`).getMonth() : 0;
        await update.mutateAsync({
          name: values.companyName,
          website: values.website,
          locations: values.location,
          location: values.location[0],
          companySize: values.employee,
          industry: values.industry,
          techStack: values.tech_stack,
          description: values.description,
          ...(values.year && values.date ? { foundationDate: new Date(values.year, month, values.date).toISOString() } : {}),
        });
        toast.success("Company profile updated");
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
        initialLocations={company.locations || []}
        initialTechStack={company.techStack || []}
        initialDescription={company.description || ""}
      />
    </div>
  );
}
export default OverviewWrapper;

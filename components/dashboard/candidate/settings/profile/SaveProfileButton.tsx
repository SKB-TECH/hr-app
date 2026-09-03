import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

function SaveProfileButton({ isSubmitting }: { isSubmitting: boolean }) {
  const t = useTranslations("candidateSettings.profile.saveButton");

  return (
    <div className="flex max-md:w-full md:justify-end">
      <Button
        variant="custom-secondary"
        className="max-md:w-full py-6 px-4 font-medium "
        disabled={isSubmitting}
      >
        {isSubmitting ? t("saving") : t("save")}
      </Button>
    </div>
  );
}
export default SaveProfileButton;

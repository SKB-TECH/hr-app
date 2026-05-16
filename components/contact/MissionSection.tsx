import { useTranslations } from "next-intl";
import { ReusableTittle } from "../ui/ReusableTittle";

function MissionSection() {
  const t = useTranslations("mission");
  return (
    <div className="px-6 py-20 md:px-12 max-w-7xl mx-auto ">
      <ReusableTittle firstTittle={t("title")} secondTittle={t("heading")} />
      <p className="text-gray-600 leading-8 text-lg">{t("description")}</p>
    </div>
  );
}

export default MissionSection;

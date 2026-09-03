import { getTranslations } from "next-intl/server";

const AboutUsPage = async () => {
  const t = await getTranslations("landing");

  return (
    <div className="min-h-screen mx-auto">
      <h2 className="text-4xl font-black text-center">{t("about.heading")}</h2>
    </div>
  );
};

export default AboutUsPage;

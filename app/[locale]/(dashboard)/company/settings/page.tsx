import SettingsWrapper from "@/components/dashboard/company/settings/SettingsWrapper";

function page() {
  return (
    <div className="flex h-full min-h-0 flex-col px-4 pb-10 lg:px-6">
      <h1 className="mt-4 shrink-0 text-2xl font-bold text-neutral-100 md:mt-6">
        Settings
      </h1>
      <SettingsWrapper />
    </div>
  );
}

export default page;

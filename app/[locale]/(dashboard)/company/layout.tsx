import CompanyDashboardHeaderWrapper from "@/components/dashboard/layout/company/CompanyDashboardHeaderWrapper";

export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 overflow-hidden">
      <CompanyDashboardHeaderWrapper />
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

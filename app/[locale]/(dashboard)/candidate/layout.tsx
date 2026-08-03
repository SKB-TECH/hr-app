import DashBoardHeaderWrapper from "@/components/dashboard/layout/candidate/DashBoardHeaderWrapper";

export default function CandidateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 overflow-hidden">
      <DashBoardHeaderWrapper />
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

import DashboardHeader from "@/components/dashboard/candidate/overview/GreetingSection";
import StatsContent from "@/components/dashboard/candidate/overview/StatsContentSection";
import RecentApplicationsHistory from "@/components/dashboard/candidate/overview/RecentApplicationHistory";

export default function DashboardPage() {
  return (
    <div className="min-h-screen  py-6 px-4 lg:px-6">
      <DashboardHeader />
      <div>
        <StatsContent />
      </div>
      <div className="mt-6">
        <RecentApplicationsHistory />
      </div>
    </div>
  );
}

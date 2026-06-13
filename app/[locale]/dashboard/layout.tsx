import Sidebar from "../../../components/dashboard/layout/Sidebar";
import DashBoardHeaderWrapper from "../../../components/dashboard/layout/DashBoardHeaderWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:block w-[240px] h-full overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <DashBoardHeaderWrapper />
        <div className="flex-1 overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
}

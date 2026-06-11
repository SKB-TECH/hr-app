import Sidebar from "../../../components/dashboard/layout/Sidebar";
import DashBoardHeaderWrapper from "../../../components/dashboard/layout/DashBoardHeaderWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex ">
      <div className="hidden lg:block w-[240px] ">
        <Sidebar />
      </div>
      <div className="w-5/6 max-lg:w-full   ">
        <DashBoardHeaderWrapper />
        <div className="p-4 px-6">{children}</div>
      </div>
    </div>
  );
}

import Sidebar from "./_components/Sidebar";
import DashBoardHeaderWrapper from "./_components/DashBoardHeaderWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex ">
      <div className="hidden lg:block w-1/6 ">
        <Sidebar />
      </div>
      <div className="w-5/6 max-lg:w-full  ">
        <DashBoardHeaderWrapper />
        {children}
      </div>
    </div>
  );
}

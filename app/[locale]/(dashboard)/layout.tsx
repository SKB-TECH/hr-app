import Sidebar from "../../../components/dashboard/layout/Sidebar";
import { SessionGuard } from "@/components/auth/SessionGuard";
import MessageNotifications from "@/components/dashboard/messages/MessageNotifications";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionGuard>
    <MessageNotifications />
    <div className="fixed inset-0 flex min-h-0 min-w-0 overflow-hidden">
      <div className="hidden h-full w-[240px] flex-shrink-0 overflow-hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  </SessionGuard>;
}

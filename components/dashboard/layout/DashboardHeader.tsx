import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPageName } from "@/lib/utils";
import { NotificationBell } from "./NotificationBell";

const hasNotifications = true;
const notificationCount = 4;

function DashboardHeader({ pathname }: { pathname: string }) {
  const pageName = getPageName(pathname);

  return (
    <div className="w-full p-4 px-6 flex justify-between items-center border-b-2 border-brand-light-neutral/30">
      <h1 className="text-2xl font-bold text-neutral-100">{pageName}</h1>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button
            variant="custom-primary"
            className="py-2.5 px-4 hover:bg-brand/5 border border-brand-light-neutral cursor-pointer transition-colors duration-200"
          >
            Back to Homepage
          </Button>
        </Link>

        {/* Notification Bell Component */}
        <NotificationBell
          hasNotifications={hasNotifications}
          notificationCount={notificationCount}
        />
      </div>
    </div>
  );
}

export default DashboardHeader;

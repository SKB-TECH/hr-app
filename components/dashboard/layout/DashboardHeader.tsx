import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { getPageName } from "@/lib/utils";

import { NotificationBell } from "./NotificationBell";

interface DashboardHeaderProps {
  pathname: string;
}

const HAS_NOTIFICATIONS = true;
const NOTIFICATION_COUNT = 4;

export default function DashboardHeader({ pathname }: DashboardHeaderProps) {
  const pageName = getPageName(pathname);

  return (
    <header className="flex w-full items-center justify-between border-b border-brand-light-neutral/30 px-2 sm:px-4 lg:px-6 py-4">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="rounded-md p-1 transition-colors hover:bg-brand-light-neutral/20 lg:hidden"
        >
          <HiOutlineMenuAlt2 size={22} className="text-brand-dark-neutral" />
        </button>

        <h1 className="text-2xl font-bold text-neutral-100 ">{pageName}</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Desktop button */}
        <Button
          asChild
          variant="custom-primary"
          className="hidden border border-brand-light-neutral px-4 py-2.5 transition-colors duration-200 hover:bg-brand/5 md:inline-flex"
        >
          <Link href="/">Back to Homepage</Link>
        </Button>

        {/* Icons group */}
        <div className="flex items-center gap-3">
          {/* Mobile homepage shortcut */}
          <Link
            href="/"
            aria-label="Go to homepage"
            className="rounded-full p-2 transition-colors duration-200 hover:bg-brand-light-neutral/20 md:hidden group"
          >
            <Image
              src="/hurtHouseIcon.png"
              alt="Homepage"
              width={22}
              height={22}
              priority
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </Link>

          <NotificationBell
            hasNotifications={HAS_NOTIFICATIONS}
            notificationCount={NOTIFICATION_COUNT}
          />
        </div>
      </div>
    </header>
  );
}

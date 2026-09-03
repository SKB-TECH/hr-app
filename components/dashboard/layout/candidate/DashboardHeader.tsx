import Image from "next/image";
import { Link } from "@/i18n/routing";
import MenuBar from "../MenuBar";
import { Button } from "@/components/ui/button";
import { getPageName, getParentPath, shouldShowBackButton } from "@/lib/utils";
import { NotificationBell } from "./NotificationBell";
import { CandidateMobileSidebarProps } from "./DashBoardHeaderWrapper";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

interface DashboardHeaderProps {
  pathname: string;
}

export default function DashboardHeader({
  pathname,
  toggleMobileMenu,
}: DashboardHeaderProps & CandidateMobileSidebarProps) {
  const pageName = getPageName(pathname);
  const showBackButton = shouldShowBackButton(pathname);
  const parentPath = getParentPath(pathname);

  return (
    <header className="flex w-full items-center justify-between border-b border-brand-light-neutral px-2 sm:px-4 lg:px-6 py-4 lg:py-5">
      {/* Left section */}
      <MenuBar
        toggleMobileMenu={toggleMobileMenu}
        showBackButton={showBackButton}
        parentPath={parentPath}
        pageName={pageName}
      />

      {/* Right section */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        {/* Desktop button */}
        <Button
          asChild
          variant="custom-primary"
          className="hidden border border-brand-light-neutral p-5 text-sm transition-colors duration-200 hover:bg-brand/5 md:inline-flex"
        >
          <Link href="/">Back to homepage</Link>
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

          <NotificationBell role="candidate" />
        </div>
      </div>
    </header>
  );
}

// components/dashboard/sidebar/DashboardHeader.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPageName } from "@/lib/utils";

function DashboardHeader({ pathname }: { pathname: string }) {
  const pageName = getPageName(pathname);

  return (
    <div className="w-full p-4 px-6 flex justify-between items-center border border-brand-light-neutral">
      <h1 className="text-2xl font-bold text-neutral-100">{pageName}</h1>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="custom-primary" className="py-2.5 px-4">
            Back to Homepage
          </Button>
        </Link>
        <Link href="/dashboard/profile">
          <Button variant="link">View Profile</Button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;

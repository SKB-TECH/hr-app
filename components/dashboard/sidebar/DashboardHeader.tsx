import { Button } from "@/components/ui/button";
import Link from "next/link";

function DashboardHeader({ path }: { path: string }) {
  return (
    <div className="w-full  p-4 px-6 flex justify-between items-center border-b border-brand-light-neutral ">
      <h1 className="text-[32px] font-bold mb-4 text-neutral-100">{path}</h1>
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="custom-primary" className="py-2.5 px-4 hover:bg-">
            Back to Homepage
          </Button>
        </Link>
        <Button variant="link" className="">
          View Profile
        </Button>
      </div>
    </div>
  );
}

export default DashboardHeader;

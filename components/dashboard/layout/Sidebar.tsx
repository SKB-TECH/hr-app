import Image from "next/image";
import Link from "next/link";

import { SidebarProfile } from "./SidebarProfile";
import SidebarNavigation from "./SidebarNavigation";

export default function Sidebar() {
  return (
    <aside className="font-epilogue relative bg-[#f9f8fd] h-full flex flex-col justify-between overflow-hidden">
      <div className="z-2 flex-1 overflow-y-auto mt-2">
        <Link href="/" className="flex items-center gap-2  p-4">
          <Image
            src="/logoIcon.png"
            alt="JobHuntly Logo"
            width={32}
            height={32}
            className="object-cover"
          />
          <span className="block font-medium text-[24px] font-red-hat">
            JobHuntly
          </span>
        </Link>

        <SidebarNavigation />
      </div>

      <SidebarProfile />

      <Image
        width={400}
        height={100}
        src="/sidebarPattern.png"
        alt=""
        quality={100}
        className="w-full bottom-0 absolute translate-y-12 inset-x-0 pointer-events-none"
        aria-hidden="true"
      />
    </aside>
  );
}

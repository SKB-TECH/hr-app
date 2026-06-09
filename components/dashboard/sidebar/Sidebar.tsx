import Image from "next/image";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { navItems } from "@/data/SidebarNavigations";
import { settingsItems } from "@/data/SidebarNavigations";
import { SidebarProfile } from "./SidebarProfile";

export default function Sidebar() {
  return (
    <aside className="font-epilogue relative bg-[#f9f8fd] overflow-y-hidden h-screen flex flex-col justify-between ">
      <div className="z-2">
        <Link href="/" className="flex items-center gap-2  p-4">
          <Image
            src="/logoIcon.png"
            alt="JobHuntly Logo"
            width={32}
            height={32}
            className="object-cover"
          />
          <span className="block font-bold text-[24px]">JobHuntly</span>
        </Link>

        <div className="space-y-4 ">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <NavItem key={item.id} {...item} />
            ))}
          </nav>

          <hr className="h-[1px]  w-full" />

          <div className="p-4">
            <h6 className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-3 ">
              Settings
            </h6>
            <div className="flex flex-col gap-1  ">
              {settingsItems.map((item) => (
                <NavItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <SidebarProfile />

      <Image
        width={400}
        height={400}
        src="/sidebarPattern.png"
        alt=""
        quality={100}
        className="w-full bottom-0 absolute translate-y-10 inset-x-0 pointer-events-none"
        aria-hidden="true"
      />
    </aside>
  );
}

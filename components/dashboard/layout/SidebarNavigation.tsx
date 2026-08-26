"use client";

import { UserRoles } from "@/data/SidebarNavigations";
import { NavItem } from "./candidate/NavItem";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useSession } from "@/core/hooks/auth/use-session";
import {
  getActivePathname,
  getNavItems,
  getRolePath,
  isNavItemActive,
} from "@/lib/utils";

function SidebarNavigation() {
  const fullPathname = usePathname();
  const { data: user } = useSession();
  const role: UserRoles = user?.activeProfile === "COMPANY" ? "company" : "candidate";
  const pathname = getActivePathname(fullPathname);
  const [navItems, settingItems] = useMemo(() => getNavItems(role), [role]);

  return (
    <div className="space-y-4 ">
      <nav className="flex flex-col gap-1 p-4">
        {/* main nav items */}
        {navItems.map((item) => {
          return (
            <NavItem
              isActive={isNavItemActive(pathname, item.path)}
              key={item.id}
              path={getRolePath(role, item.path)}
              name={item.name}
              icon={item.icon}
              badge={item.badge}
            />
          );
        })}
      </nav>

      <hr className="h-[1px]  w-full bg-[#CCCCF5]" />

      <div className="p-4">
        {/* settings nav items */}
        <h6 className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-3 ">
          Settings
        </h6>
        <div className="flex flex-col gap-1  ">
          {settingItems.map((item) => (
            <NavItem
              isActive={isNavItemActive(pathname, item.path)}
              key={item.id}
              path={getRolePath(role, item.path)}
              name={item.name}
              icon={item.icon}
              badge={item.badge}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SidebarNavigation;

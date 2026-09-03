"use client";

import { UserRoles } from "@/data/SidebarNavigations";
import { NavItem } from "./candidate/NavItem";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
  const [unreadMessages, setUnreadMessages] = useState(0);
  useEffect(() => {
    const update = (event?: Event) => setUnreadMessages(event instanceof CustomEvent ? Number(event.detail) || 0 : Number(localStorage.getItem("messages:unread")) || 0);
    update(); window.addEventListener("messages:unread", update); return () => window.removeEventListener("messages:unread", update);
  }, []);
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
              badge={item.path === "/messages" && unreadMessages > 0 ? String(unreadMessages) : item.badge}
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

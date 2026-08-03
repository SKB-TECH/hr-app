import { NavItem as NavItemProps, UserRoles } from "@/data/SidebarNavigations";
import { NavItem } from "../NavItem";
import { getRolePath, isNavItemActive } from "@/lib/utils";

interface MainNavSidebarProps {
  navItems: NavItemProps[];
  pathname: string;
  role: UserRoles;
  toggleMobileMenu: () => void;
}

function MainMobileNav({
  navItems,
  pathname,
  role,
  toggleMobileMenu,
}: MainNavSidebarProps) {
  return (
    <nav className="px-2">
      {navItems.map((item: NavItemProps) => (
        <div
          onClick={() => toggleMobileMenu()}
          key={item.name}
          className="px-2 py-0.5"
        >
          <NavItem
            name={item.name}
            path={getRolePath(role, item.path)}
            icon={item.icon}
            badge={item.badge}
            isActive={isNavItemActive(pathname, item.path)}
            className="text-[16px]! font-normal!"
          />
        </div>
      ))}
    </nav>
  );
}

export default MainMobileNav;

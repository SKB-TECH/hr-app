// components/dashboard/nav-item.tsx
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string | null;
}

export function NavItem({ name, href, icon: Icon, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex text-[14px] items-center gap-3 p-2 rounded-lg text-neutral-60 hover:bg-[#E9EBFD] hover:text-[#4f46e5] transition-all duration-200 group"
    >
      <Icon className="w-5 h-5 transition-colors duration-200 text-neutral-60 group-hover:text-brand" />
      <span className="text-[13px] font-normal tracking-wide leading-6 ">
        {name}
      </span>
      {badge && (
        <span className="ml-auto bg-brand text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

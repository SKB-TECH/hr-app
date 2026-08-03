import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  name: string;
  path: string;
  icon: LucideIcon;
  badge?: string | null;
  isActive: boolean;
  className?: string;
}

export function NavItem({
  name,
  path,
  icon: Icon,
  badge,
  isActive,
  className,
}: NavItemProps) {
  return (
    <Link
      href={path}
      className={`relative flex text-[14px] items-center gap-3 p-1.5 pl-3 rounded-xs  hover:bg-[#E9EBFD] hover:text-brand transition-all duration-200 group ${isActive ? "bg-[#E9EBFD] text-[#4f46e5]" : "text-neutral-60"}`}
    >
      {/* Vertical line indicator */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px]  rounded-r-full transition-all duration-200 group-hover:bg-brand group-hover:h-7 ${isActive ? "bg-brand h-7" : "h-5 bg-transparent"}`}
      />

      <Icon
        className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-brand" : "text-[#7C8493]"} group-hover:text-brand`}
      />
      <span
        className={
          "text-[15px] font-medium  font-inter tracking-wide leading-6 " +
          className
        }
      >
        {name}
      </span>
      {badge && (
        <span className="ml-auto bg-brand text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

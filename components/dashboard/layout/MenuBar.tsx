import Image from "next/image";
import { Link } from "@/i18n/routing";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface MenuBarProps {
  toggleMobileMenu: () => void;
  showBackButton?: boolean;
  parentPath?: string;
  pageName?: string;
}

function MenuBar({
  toggleMobileMenu,
  showBackButton,
  parentPath,
  pageName,
}: MenuBarProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => toggleMobileMenu()}
        type="button"
        aria-label="Open navigation menu"
        className="rounded-md p-1 transition-colors hover:bg-brand-light-neutral/20 lg:hidden"
      >
        <HiOutlineMenuAlt2 size={22} className="text-brand-dark-neutral" />
      </button>

      {showBackButton && (
        <Link href={parentPath || ""}>
          <Image src="/BackArrow.png" alt="Back" width={30} height={30} />
        </Link>
      )}
      <h1 className="text-2xl text-nowrap max-md:truncate max-md:max-w-[180px] font-bold text-neutral-100 ">
        {pageName}
      </h1>
    </div>
  );
}

export default MenuBar;

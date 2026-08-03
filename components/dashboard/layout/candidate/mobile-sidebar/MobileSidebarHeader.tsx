import Image from "next/image";
import { X } from "lucide-react";
import { CandidateMobileSidebarProps } from "../DashBoardHeaderWrapper";

function MobileSidebarHeader({
  toggleMobileMenu,
}: CandidateMobileSidebarProps) {
  return (
    <header className="relative flex items-center justify-center px-4 py-6">
      <button
        onClick={() => toggleMobileMenu()}
        className="absolute left-4 rounded-md hover:bg-gray-100"
      >
        <X size={26} />
      </button>

      <div className="flex items-center gap-2">
        <Image src="/logoIcon.png" alt="logo" width={28} height={28} />
        <span className="font-bold text-xl">JobHuntly</span>
      </div>
    </header>
  );
}

export default MobileSidebarHeader;

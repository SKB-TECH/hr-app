"use client";
import Image from "next/image";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { useSession } from "@/core/hooks/auth/use-session";
import { mediaUrl } from "@/core/lib/media-url";

export function SidebarProfile() {
  const [showLogOut, setShowLogOut] = useState(false);
  const { data: user } = useSession();
  return (
    <div>
      {showLogOut && <LogoutButton setShowLogOut={setShowLogOut} />}
      <div
        onClick={() => setShowLogOut(!showLogOut)}
        className="relative z-2 flex  justify-center items-center gap-3 p-2 rounded-lg hover:bg-[#e6e5fa] transition-colors duration-200"
      >
        <Image
          src={mediaUrl(user?.avatar, "/team/person2.png")}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full shrink-0  w-[40px] h-[40px] bg-center object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[16px] font-medium text-[#202430]">{user?.fullName || "Utilisateur"}</p>
          <p className="truncate text-[12px] text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}

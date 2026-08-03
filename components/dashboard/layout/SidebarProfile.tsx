"use client";
import Image from "next/image";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

export function SidebarProfile() {
  const [showLogOut, setShowLogOut] = useState(false);
  return (
    <div>
      {showLogOut && <LogoutButton setShowLogOut={setShowLogOut} />}
      <div
        onClick={() => setShowLogOut(!showLogOut)}
        className="relative z-2 flex  justify-center items-center gap-3 p-2 rounded-lg hover:bg-[#e6e5fa] transition-colors duration-200"
      >
        <Image
          src="/team/person3.png"
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full shrink-0  w-[40px] h-[40px] bg-center object-cover"
        />
        <div>
          <p className="font-medium text-[18px] text-[#202430]">Maria Kelly</p>
          <p className="text-gray-400 text-[14px]">MariaKelly@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

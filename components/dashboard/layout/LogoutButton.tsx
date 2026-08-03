"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

function LogoutButton({
  setShowLogOut,
}: {
  setShowLogOut: (show: boolean) => void;
}) {
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setShowLogOut(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowLogOut]);

  return (
    <div
      ref={loginRef}
      className="duration-300 cursor-pointer relative mx-3 mb-2 z-20 flex items-center justify-start bg-white text-[##FF6550] font-medium  gap-2 p-5 rounded-lg hover:bg-[#e6e5fa] transition-colors duration-200"
    >
      <Image src="/LogoutIcon.png" alt="Logout" width={28} height={28} />
      <p className="text-[#FF6550] text-lg font-medium">Logout</p>
    </div>
  );
}

export default LogoutButton;

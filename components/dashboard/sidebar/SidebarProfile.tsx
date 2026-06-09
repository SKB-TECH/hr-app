import Image from "next/image";
import Link from "next/link";

export function SidebarProfile() {
  return (
    <Link
      href="#"
      className="relative z-2 flex  justify-center items-center gap-3 p-2 rounded-lg hover:bg-[#e6e5fa] transition-colors duration-200"
    >
      <Image
        src="/profileImage.jpg"
        alt="User Profile"
        width={40}
        height={40}
        className="rounded-full shrink-0  w-[40px] h-[40px] bg-center object-cover"
      />
      <div>
        <p className="font-medium text-[18px] text-[#202430]">Jake Gyll</p>
        <p className="text-gray-400 text-[14px]">jakegyll@email.com</p>
      </div>
    </Link>
  );
}

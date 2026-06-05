import Image from "next/image";

function Sidebar() {
  return (
    <div className="p-4  relative bg-brand-light-neutral min-h-full">
      <Image
        width={400}
        height={400}
        src="/sidebarPattern.png"
        alt="Logo"
        quality={100}
        className="w-full bottom-0 absolute inset-x-0   "
      />
    </div>
  );
}

export default Sidebar;

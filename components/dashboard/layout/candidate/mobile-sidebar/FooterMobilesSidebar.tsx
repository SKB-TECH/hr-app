import Image from "next/image";

function FooterMobilesSidebar() {
  return (
    <footer className="p-4 border-t flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Image
          src="/profileImage.jpg"
          alt="user"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="flex flex-col">
          <span className="text-sm font-medium">Maria Kelly</span>
          <span className="text-xs text-gray-500">MariaKelly@email.com</span>
        </div>
      </div>
    </footer>
  );
}

export default FooterMobilesSidebar;

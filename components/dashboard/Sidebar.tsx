import Image from "next/image";

function Sidebar() {
  return (
    <div className="p-4 relative bg-[#f9f8fd] min-h-screen flex flex-col justify-between">
      {/* Top section: Logo and Navigation */}
      <div>
        {/* Logo */}
        <div className=" flex items-center gap-2 mb-6">
          <Image
            src="/logoIcon.png" // placeholder logo
            alt="JobHuntly Logo"
            width={32}
            height={32}
            className=" object-cover "
          />
          <span className="block font-bold text-[24px]">JobHuntly</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-4">
          <a
            href="#dashboard"
            className="flex items-center gap-2 p-2 rounded-lg bg-[#e6e5fa] text-[#4f46e5]"
          >
            <Image
              src="/icons/home.svg"
              alt="Dashboard"
              width={20}
              height={20}
            />
            Dashboard
          </a>
          <a
            href="#messages"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-500"
          >
            <Image
              src="/icons/message.svg"
              alt="Messages"
              width={20}
              height={20}
            />
            Messages
            <span className="ml-auto bg-[#4f46e5] text-white text-xs px-2 rounded-full">
              1
            </span>
          </a>
          <a
            href="#applications"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-500"
          >
            <Image
              src="/icons/document.svg"
              alt="My Applications"
              width={20}
              height={20}
            />
            My Applications
          </a>
          <a
            href="#find-jobs"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-500"
          >
            <Image
              src="/icons/search.svg"
              alt="Find Jobs"
              width={20}
              height={20}
            />
            Find Jobs
          </a>
          <a
            href="#browse-companies"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-500"
          >
            <Image
              src="/icons/building.svg"
              alt="Browse Companies"
              width={20}
              height={20}
            />
            Browse Companies
          </a>
          <a
            href="#profile"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-500"
          >
            <Image
              src="/icons/user.svg"
              alt="My Public Profile"
              width={20}
              height={20}
            />
            My Public Profile
          </a>
        </nav>

        {/* Settings Section */}
        <div className="mt-8">
          <h6 className="text-gray-400 uppercase text-xs mb-2">Settings</h6>
          <a
            href="#settings"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-500"
          >
            <Image
              src="/icons/gear.svg"
              alt="Settings"
              width={20}
              height={20}
            />
            Settings
          </a>
          <a
            href="#help"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-500"
          >
            <Image
              src="/icons/help.svg"
              alt="Help Center"
              width={20}
              height={20}
            />
            Help Center
          </a>
        </div>
      </div>

      {/* Bottom section: User Profile */}
      <div className="flex items-center gap-3 mt-4">
        <Image
          src="/placeholder-profile.png" // placeholder profile image
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-medium">Jake Gyll</p>
          <p className="text-gray-400 text-sm">jakegyll@email.com</p>
        </div>
      </div>

      {/* Sidebar background pattern */}
      <Image
        width={400}
        height={400}
        src="/sidebarPattern.png"
        alt="Sidebar Pattern"
        quality={100}
        className="w-full bottom-0 absolute inset-x-0"
      />
    </div>
  );
}

export default Sidebar;

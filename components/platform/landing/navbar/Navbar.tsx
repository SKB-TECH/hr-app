import { LogoIcon } from "@/components/platform/landing/icons";

export default function Navbar() {
  return (
    <div className="bg-white sticky top-0 z-50">
      <nav className=" max-w-6xl mx-auto flex flex-wrap items-center justify-between  py-2 ">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <LogoIcon />
            <span className="text-xl font-extrabold text-indigo-600 tracking-tight">
              JobHuntly
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Find Jobs
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Browse Companies
            </a>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Login
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors px-6 py-2.5 "
          >
            Sign Up
          </a>
        </div>
      </nav>
    </div>
  );
}

"use client";

import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Remove locale prefix to get the path
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
  const currentPath = pathWithoutLocale || "/";

  const navLinks = [
    { href: "/", label: "Home", activeMatch: [""] },
    { href: "/about", label: "About", activeMatch: ["/about"] },
    { href: "/jobs", label: "Jobs", activeMatch: ["/jobs", "/jobs/"] },
  ];

  const isActive = (link: { activeMatch: string[] }) => {
    return link.activeMatch.some((match) => {
      if (match === "") return currentPath === "/" || currentPath === "";
      return currentPath.startsWith(match);
    });
  };

  return (
    <header className="sticky top-0 left-0 relative z-20 w-full bg-[#132745]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="text-xl text-white font-extrabold sm:text-2xl md:text-3xl"
        >
          Recruit.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link)
                  ? "text-brand border-b-2 border-brand pb-1"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="md:hidden relative h-8 w-10 text-white hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a1a2e] border-t border-gray-700 absolute top-full left-0 w-full">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActive(link)
                    ? "text-brand border-l-2 border-brand pl-3"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;

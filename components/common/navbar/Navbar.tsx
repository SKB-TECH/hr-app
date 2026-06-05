
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navigations } from "@/data/data";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react"

export default function NavbarComponentLandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-sm">

      <div className="px-6 sm:px-18 py-4 flex items-center justify-between">

        <div className="flex items-center gap-x-8">
          <Link href="/">
            <Image src="/LogoBlack.png" alt="logo-black" width={100} height={100} />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navigations.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-sm hover:border-brand font-medium hover:text-brand "
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-row items-center gap-2">
          <Link href="/sign-in" className="text-brand hover:text-indigo-600 pr-4 border-r">
            Login
          </Link>
          <Button
            variant="ghost"
            className="bg-indigo-500 hover:bg-brand hover:text-white px-4 py-5 rounded-none outline-none cursor-pointer text-white"
            asChild
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <div><Image src="/filter.png" alt="Filter" width={24} height={24}/></div>}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4">
          {navigations.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-3 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-4">
            <Link href="/sign-in" className="text-sm text-gray-600 hover:text-indigo-600">
              Login
            </Link>
            <Button
              variant="ghost"
              className="bg-indigo-500 hover:bg-indigo-900 hover:text-white px-4 py-4 rounded-none text-white text-sm"
              asChild
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
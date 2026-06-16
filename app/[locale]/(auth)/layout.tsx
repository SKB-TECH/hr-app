import { LogoIcon } from "@/components/pages/landing/icons";
import Link from "next/link";
import React from "react";

export default function LayoutAuth({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="AuthLogin hidden md:block md:w-2/5 bg-indigo-200 md:min-h-screen bg-cover bg-center">
        <div className="flex flex-col p-8 pl-12">
          <Link
            className="text-xl font-bold flex flex-row gap-3 items-center text-brand"
            href="/"
          >
            <span className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white">
              <LogoIcon />
            </span>
            JobHuntly
          </Link>
        </div>
      </div>
      <div className="bg-white md:w-3/5 p-5 flex flex-col justify-center md:min-h-screen px-10">
        {children}
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navigations } from "@/data/data";
import { Briefcase } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex flex-col md:flex-row gap-x-8 items-center">
          <Link
            className="text-xl font-bold flex flex-row gap-3 items-center"
            href="/"
          >
            <span className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
              <Briefcase />
            </span>
            JobHuntly
          </Link>

          <div className="flex flex-col md:flex-row gap-2">
            {navigations.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-sm font-normal"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-x-4">
          <div className="flex flex-row md:flex-row items-center gap-2 justify-between">
            <Link
              href="/sign-in"
              className="text-gray-600 hover:text-gray-900 pr-4 border-r"
            >
              Login
            </Link>

            <Button
              variant="ghost"
              className="bg-primary hover:bg-primary/50 px-4 py-5 rounded-none outline-none cursor-pointer text-white"
              asChild={true}
            >
              <Link href="/sign-up" className="">
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

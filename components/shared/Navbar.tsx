import { Menu } from "lucide-react";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <header className="relative z-20 w-full bg-[#132745]">
      <div className="mx-auto  flex h-20 max-w-7xl items-center justify-between px-6  md:px-12">
        <h1 className="text-xl text-white font-extrabold sm:text-2xl md:text-3xl">
          Recruit.
        </h1>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="relative h-8 w-10 text-white hover:bg-white/10"
        >
          <span className="absolute inset-0 flex items-center justify-center text-white">
            <Menu className="h-6 w-6" />
          </span>
        </Button>
      </div>
    </header>
  );
}

export default Navbar;

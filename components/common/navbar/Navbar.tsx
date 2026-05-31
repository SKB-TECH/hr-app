import Link from "next/link";
import {Button} from "@/components/ui/button";
import {navigations} from "@/data/data";
import {LogoIcon} from "@/components/landing/icons";

export default function NavbarComponentLandingPage() {
  return (
    <nav className='w-full sticky sticky-0 top-0 z-50 backdrop-blur-sm'>
      <div className='max-w-6xl mx-auto px-4 py-4 flex items-stretch justify-between bg-red'>

        <div className="flex flex-col md:flex-row gap-x-8 items-stretch">
          <Link className='text-xl font-bold flex flex-row gap-3 items-center text-brand' href='/'>
            <span className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white">
              <LogoIcon />
            </span>
            JobHuntly
          </Link>

          <div className="flex items-stretch">
            <div className="flex flex-col items-center md:flex-row gap-4">
              {navigations.map((item, index) => <Link
                  key={index}
                  href={item.path}
                  className="text-sm hover:border-indigo-600 font-medium hover:text-indigo-600 transition-colors duration-200">
                {item.name}
              </Link>)}
            </div>
          </div>
        </div>

        <div className='space-x-4'>
          <div className="flex flex-row md:flex-row items-center gap-2 justify-between">
            <Link href='/sign-in' className='text-gray-600  hover:text-indigo-600 pr-4 border-r'>
              Login
            </Link>

            <Button variant='ghost' className="bg-indigo-500 hover:bg-indigo-900 hover:text-white px-4 py-5 rounded-none outline-none cursor-pointer text-white" asChild={true}>
              <Link href='/sign-up' className=''>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

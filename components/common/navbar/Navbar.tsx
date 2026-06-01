import Link from "next/link";
import {Button} from "@/components/ui/button";
import {navigations} from "@/data/data";
import Image from "next/image";

export default function NavbarComponentLandingPage() {
  return (
    <nav className='w-full sticky sticky-0 top-0 z-50 backdrop-blur-sm'>
      <div className=' px-6 sm:px-18 py-4 flex items-stretch justify-between bg-red'>

        <div className="flex items-center flex-col md:flex-row gap-x-8 items-stretch">
        
        <div>

       <Link  href='/'><Image src="/LogoBlack.png" alt="logo-black" width={100} height={100}/> </Link>

        </div>
         
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

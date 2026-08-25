import Image from 'next/image';
import { Link } from "@/i18n/routing";
import { companyProfiles } from "@/data/companyDetails";
import { MdOutlineEmail } from 'react-icons/md';
import { PlusIcon } from 'lucide-react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { FaTwitter } from 'react-icons/fa';


export default function ProfileContent() {
    const companyDetails = companyProfiles[0]; 
  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between mb-5">
          <h1 className="text-neutral-100 text-3xl font-clash font-bold">
            {companyDetails.name}
          </h1>
          <div className="flex items-center gap-2">
            <button className="border border-gray-200 p-1.5   ">
              <PencilSquareIcon className="w-4 h-4 text-brand" />
            </button>
          </div>
        </div>
        <p className="text-neutral-80 font-epilogue leading-relaxed">
          {companyDetails.description}
        </p>

        <hr className="bg-neutral-20 mt-5" />

        {/* contact section */}
        <div className=" md:py-5">
          <div className="flex justify-between py-5">
            <h1 className="text-neutral-100 text-3xl font-clash font-bold">
              Contact
            </h1>
            <div className="flex items-center gap-2">
              <button className="border border-gray-200 p-1.5  ">
                <PlusIcon className="w-4 h-4 text-brand" />
              </button>
              <button className="border border-gray-200 p-1.5   ">
                <PencilSquareIcon className="w-4 h-4 text-brand" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-3 border border-brand/50 px-1 py-1">
              <FaTwitter className="text-brand mt-1" />
              <Link
                href="/twitter.com/stripe"
                className="text-base md:text-base text-brand font-epilogue break-all"
              >
                {companyDetails.socials.twitter}
              </Link>
            </div>
            <div className="flex gap-3 border border-brand/50 px-1 py-1">
              <Image
                src="/facebook.png"
                alt="icon"
                width={8}
                height={20}
                className="h-5 w-2 items-center mt-1"
              />
              <Link
                href="/facebook.com/StripeHQ"
                className="text-base md:text-base text-brand font-epilogue break-all"
              >
                {companyDetails.socials.facebook}
              </Link>
            </div>
            <div className="flex gap-3 border border-brand/50 px-1 py-1">
              <Image
                src="/icon7.png"
                alt="icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <Link
                href="/linkedin.com/company/stripe"
                className="text-base md:text-base text-brand font-epilogue break-all"
              >
                {companyDetails.socials.linkedin}
              </Link>
            </div>
            <div className="flex gap-3 border border-brand/50 px-1 py-1">
              <MdOutlineEmail className="text-brand w-5 h-5 " />
              <Link
                href="/linkedin.com/company/stripe"
                className="text-base md:text-base text-brand font-epilogue break-all"
              >
                nomad@gmail.com
              </Link>
            </div>
          </div>
          <hr className="bg-neutral-20 mt-8" />

          {/* profile image */}
          <div className="mt-5">
            <div className="flex justify-between py-5">
              <h1 className="text-neutral-100 text-2xl md:text-3xl font-clash font-bold">
                Working at Nomad
              </h1>

              <div className="flex items-center gap-2">
                <button className="border border-gray-200 p-1.5  ">
                  <PlusIcon className="w-4 h-4 text-brand" />
                </button>
                <button className="border border-gray-200 p-1.5   ">
                  <PencilSquareIcon className="w-4 h-4 text-brand" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
              <div className="md:col-span-2 w-full">
                <Image
                  src="/profile1.jpg"
                  alt="Office"
                  width={900}
                  height={650}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex md:flex-col gap-3">
                <Image
                  src="/profile2.jpg"
                  alt="Office"
                  width={300}
                  height={200}
                  className="w-27 h-27 md:w-full md:h-full object-cover "
                />

                <Image
                  src="/profile3.jpg"
                  alt="Office"
                  width={300}
                  height={200}
                  className="w-27 h-27 md:w-full md:h-full object-cover "
                />

                <Image
                  src="/profile4.jpg"
                  alt="Office"
                  width={300}
                  height={200}
                  className="w-27 h-27 md:w-full md:h-full object-cover "
                />
              </div>
            </div>
            <hr className='block md:hidden mt-5 bg-neutral-20'/>
          </div>
        </div>
      </div>
    </div>
  );
}

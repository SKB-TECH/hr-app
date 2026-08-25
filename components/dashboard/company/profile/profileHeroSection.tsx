import Image from "next/image";
import { Link } from "@/i18n/routing";
import { MdOutlineRemoveRedEye, MdOutlineSettings } from "react-icons/md";

const icons = [
  {
    name: "Founded",
    src: "/stripeIcon1.png",
    data: "July 31, 2011",
  },
  {
    name: "Employees",
    src: "/stripeIcon2.png",
    data: "4000+",
  },
  {
    name: "Location",
    src: "/stripeIcon3.png",
    data: "20 countries",
  },
  {
    name: "Industry",
    src: "/stripeIcon4.png",
    data: "Social & Non-Profit",
  },
];
export default function ProfileHeroSection () {
  return (
    <div className=" px-4 md:px-5 py-6 md:py-5">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="">
          {/* hero icon for small screen */}
          <div className="md:hidden block">
            <div className="flex justify-between">
              <Image
                src="/Nomad.png"
                alt="Nomad"
                width={1024}
                height={1024}
                className="w-15 h-15 object-contain"
                priority
              />
              <div className="flex gap-4 ">
                <div className="text-brand flex gap-2 text-center justify-center items-center text-sm font-epilogue font-semibold border border-[#CCCCF5] p-2 my-3">
                  <MdOutlineRemoveRedEye className="text-brand w-6 h-6 font-bold" />
                </div>
                <div className="text-brand flex gap-2 text-center justify-center items-center text-sm font-epilogue font-semibold border border-[#CCCCF5] p-2 my-3">
                  <MdOutlineSettings className="text-brand w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* svg icon for md screen and above */}
          <div className="hidden md:block w-30 h-30">
            <svg
              className="w-full h-full"
              viewBox="0 0 189 189"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_31177_13867)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.625 51.6611V135.662L95.7761 179.043L97.4507 176.346L95.7761 94.82L26.1058 51.711L23.625 51.6611Z"
                  fill="#449B82"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M167.148 51.2671V136.452L95.7769 179.044V94.8206L164.533 51.3312L167.148 51.2671Z"
                  fill="#9BDB9C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M95.3859 9.46191L167.147 51.2654L95.7761 96.2243L23.625 51.66L95.3859 9.46191Z"
                  fill="#56CDAD"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M131.43 42.9629L107.159 57.329V86.3253L82.8414 71.7234L59.458 85.5645V146.171L83.7289 131.12V98.4969L109.652 115.045L131.43 101.54V42.9629Z"
                  fill="white"
                />
              </g>
              <rect x="7.5" y="26.5" width="39" height="39" fill="white" />
              <rect x="7.5" y="26.5" width="39" height="39" stroke="#D6DDEB" />
              <g clipPath="url(#clip1_31177_13867)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.2322 41.7322C20.7011 41.2634 21.337 41 22 41H24.5C24.9602 41 25.3333 41.3731 25.3333 41.8333C25.3333 42.2936 24.9602 42.6667 24.5 42.6667H22C21.779 42.6667 21.567 42.7545 21.4107 42.9107C21.2545 43.067 21.1667 43.279 21.1667 43.5V51C21.1667 51.221 21.2545 51.433 21.4107 51.5893C21.567 51.7455 21.779 51.8333 22 51.8333H29.5C29.721 51.8333 29.933 51.7455 30.0893 51.5893C30.2455 51.433 30.3333 51.221 30.3333 51V48.5C30.3333 48.0398 30.7064 47.6667 31.1667 47.6667C31.6269 47.6667 32 48.0398 32 48.5V51C32 51.663 31.7366 52.2989 31.2678 52.7678C30.7989 53.2366 30.163 53.5 29.5 53.5H22C21.337 53.5 20.7011 53.2366 20.2322 52.7678C19.7634 52.2989 19.5 51.663 19.5 51V43.5C19.5 42.837 19.7634 42.2011 20.2322 41.7322Z"
                  fill="#4640DE"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30.9939 38.3273C31.4817 37.8395 32.1433 37.5654 32.8332 37.5654C33.523 37.5654 34.1846 37.8395 34.6724 38.3273C35.1602 38.8151 35.4343 39.4767 35.4343 40.1665C35.4343 40.8564 35.1602 41.518 34.6724 42.0058L27.5891 49.0891C27.4328 49.2454 27.2209 49.3332 26.9998 49.3332H24.4998C24.0396 49.3332 23.6665 48.9601 23.6665 48.4999V45.9999C23.6665 45.7789 23.7543 45.5669 23.9106 45.4106L30.9939 38.3273ZM32.8332 39.2321C32.5853 39.2321 32.3477 39.3305 32.1724 39.5058L25.3332 46.345V47.6665H26.6547L33.4939 40.8273C33.6692 40.652 33.7676 40.4144 33.7676 40.1665C33.7676 39.9187 33.6692 39.681 33.4939 39.5058C33.3187 39.3305 33.081 39.2321 32.8332 39.2321Z"
                  fill="#4640DE"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.7441 39.5776C30.0695 39.2521 30.5972 39.2521 30.9226 39.5776L33.4226 42.0776C33.748 42.403 33.748 42.9306 33.4226 43.2561C33.0972 43.5815 32.5695 43.5815 32.2441 43.2561L29.7441 40.7561C29.4186 40.4306 29.4186 39.903 29.7441 39.5776Z"
                  fill="#4640DE"
                />
              </g>
              <defs>
                <clipPath id="clip0_31177_13867">
                  <rect
                    width="143.522"
                    height="170.1"
                    fill="white"
                    transform="translate(23.625 9.4502)"
                  />
                </clipPath>
                <clipPath id="clip1_31177_13867">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(17 36)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex flex-col text-left w-full">
          <div className="flex items-center md:flex-row md:items-center justify-between">
            <h1 className="text-4xl font-bold font-clash text-neutral-100">
              Nomad
            </h1>
            <div className="hidden  md:block">
              <div className="flex gap-3 ">
                <span className="text-brand flex gap-2 text-center justify-center items-center text-sm font-epilogue font-semibold">
                  <MdOutlineRemoveRedEye className="text-brand w-5 h-5" />
                  Public View
                </span>
                <span className="text-brand flex gap-2 text-center justify-center items-center text-sm font-epilogue font-semibold border border-[#CCCCF5] p-2">
                  <MdOutlineSettings className="text-brand w-4 h-4" />
                  Profile Settings
                </span>
              </div>
            </div>
          </div>

          <Link
            href="https://stripe.com"
            className="text-base text-brand font-medium md:text-[16px] font-epilogue break-all hover:text-brand"
          >
            https://stripe.com
          </Link>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6">
            {icons.map((icon, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="rounded-full p-2 w-10 h-10 flex items-center justify-center">
                  <Image
                    src={icon.src}
                    alt={icon.name}
                    height={10}
                    width={10}
                    className="w-5 h-5 object-contain object-center"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-80 font-epilogue">
                    {icon.name}
                  </span>
                  <span className="text-sm text-neutral-100 font-medium font-epilogue">
                    {icon.data}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


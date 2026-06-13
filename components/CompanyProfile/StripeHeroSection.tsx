import Image from "next/image";
import Link from "next/link";

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
    data: "Payment Gateway",
  },
];

const Stripe = () => {
  return (
    <main className="">
      <div className="relative w-full overflow-hidden">
        <Image
          fill
          src="/BG.png"
          alt="Hero background"
          className="object-cover absolute inset-0"
        />

        <div className="relative z-10 px-4 md:px-12   w-full max-w-7xl mx-auto py-6 md:py-10">
          <div className="font-epilogue text-sm text-neutral-80 mb-8">
            <h1 className="">
              <Link href="/" className="hover:text-brand duration-300">
                {" "}
                Home{" "}
              </Link>
              /
              <Link href="/companies" className="hover:text-brand duration-300">
                Companies{" "}
              </Link>
              /
              <Link href="" className="font-medium">
                Nomad
              </Link>
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div>
              <img
                width={0}
                height={0}
                src="/stripe.png"
                alt="stripe"
                className="w-16 h-16 md:w-42 md:h-42"
              />
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center md:flex-row md:items-center justify-between md:justify-start md:gap-4">
                <h1 className="text-[48px] font-bold font-clash text-neutral-100">
                  Stripe
                </h1>

                <span className="border border-brand text-brand px-3 py-1 md:mt-3 -mt-46">
                  43 Jobs
                </span>
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
                    <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                      <img src={icon.src} alt={icon.name} className="w-5 h-5" />
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
      </div>
    </main>
  );
};

export default Stripe;

import Image from "next/image";

const icons = [
  {
    name: "Founded",
    src: "/icon1.png",
    data: "July 31, 2011",
  },
  {
    name: "Employees",
    src: "/icon2.png",
    data: "4000+",
  },
  {
    name: "Location",
    src: "/icon3.png",
    data: "20 countries",
  },
  {
    name: "Industry",
    src: "/icon4.png",
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
          <div className="font-epilogue text-sm text-neutral-80 mb-8">
            <h1 className="">
              Home / Companies / <span className="font-medium">Nomad</span>
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div>
              <img
                src="/stripe.png"
                alt="stripe"
                className="w-16 h-16 md:w-42 md:h-42"
              />
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center md:flex-row md:items-center justify-between md:gap-4">
                <h1 className="text-[48px] font-bold font-clash text-neutral-100">
                  Stripe
                </h1>

                <span className="border border-brand text-brand px-3 py-1 md:mt-3 -mt-46">
                  43 Jobs
                </span>
              </div>

              <span className="text-base md:text-lg text-brand font-epilogue break-all">
                https://stripe.com
              </span>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6">
                {icons.map((icon, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                      <img src={icon.src} alt={icon.name} className="w-6 h-6" />
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

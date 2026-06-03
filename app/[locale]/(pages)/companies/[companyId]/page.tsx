import { ArrowRightIcon, MoveRightIcon } from "lucide-react";
import Stripe from "./ProfileSection/StripeSection";

const Tech = [
  {
    image: "/HTML 5.png",
    name: "HTML5",
  },
  {
    image: "/CSS 3.png",
    name: "CSS3",
  },
  {
    image: "/javascript.png",
    name: "JavaScript",
  },
  {
    image: "/Ruby.png",
    name: "Ruby",
  },
  {
    image: "/Mixpanel.png",
    name: "mixpanel",
  },
  {
    image: "/Framer.png",
    name: "Framer",
  }

];

const Office = [
  {
    image: "/unitedState.png",
    name: "United States",
  },
  {
    image: "/England.png",
    name: "England",
  },
  {
    image: "/japan.png",
    name: "Japan",
  },
  {
    image: "/australia.png",
    name: "Australia",
  },
  {
    image: "/china.png",
    name: "China",
  },
];

export default function CompanyPage({

 

  params,
}: {
  params: { companyId: string };
}) {
  return (
    <main className="w-full ">
      <Stripe />
      <div className="flex gap-20 max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-15">
        <div className="w-[752px] ">
          <h1 className="text-neutral-100 text-3xl font-clash font-bold mb-5">
            Company Profile
          </h1>
          <p className="text-neutral-80 font-epilogue">
            Stripe is a software platform for starting and running internet
            businesses. Millions of businesses rely on Stripe’s software tools
            to accept payments, expand globally, and manage their businesses
            online. Stripe has been at the forefront of expanding internet
            commerce, powering new business models, and supporting the latest
            platforms, from marketplaces to mobile commerce sites. We believe
            that growing the GDP of the internet is a problem rooted in code and
            design, not finance. Stripe is built for developers, makers, and
            creators. We work on solving the hard technical problems necessary
            to build global economic infrastructure—from designing highly
            reliable systems to developing advanced machine learning algorithms
            to prevent fraud.
          </p>
          <div className="">
            <h1 className="text-neutral-100 text-3xl font-clash font-bold mb-5 mt-5">
              Contact
            </h1>
            <div className="flex flex-wrap gap-5">
              <div className="flex gap-5 border border-brand/50 px-2 py-1">
                <img
                  src="/icon5.png"
                  alt="icon"
                  className="h-4 w-4 items-center mt-1"
                />
                <h1 className="text-base md:text-lg text-brand font-epilogue break-all">
                  twitter.com/stripe
                </h1>
              </div>
              <div className="flex gap-5 border border-brand/50 px-2 py-1">
                <img
                  src="/icon6.png"
                  alt="icon"
                  className="h-5 w-2 items-center mt-1"
                />
                <h1 className="text-base md:text-lg text-brand font-epilogue break-all">
                  facebook.com/StripeHQ
                </h1>
              </div>
              <div className="flex gap-5 border border-brand/50 px-2 py-1">
                <img src="/icon7.png" alt="icon" className="h-5 w-5" />
                <h1 className="text-base md:text-lg text-brand font-epilogue break-all">
                  linkedin.com/company/stripe
                </h1>
              </div>
            </div>
            <div>
              <img src="/office.png" alt="image" />
            </div>
          </div>
        </div>
        <div className="w-[376px] ">
          <h1 className="text-neutral-100 text-3xl font-clash font-bold mb-5">
            Tech stack
          </h1>
          <p className="text-neutral-80 font-epilogue">
            Learn about the technology and tools that Stripe uses.
          </p>
          <div className="flex flex-wrap gap-8 mt-4">
            {Tech.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center">
                <img src={tech.image} alt={tech.name} className="h-15 w-15" />
                <span className="text-neutral-100 font-epilogue">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-15 ">
            <a
              href=""
              className="text-base md:text-lg text-brand font-epilogue break-all"
            >
              View tech stack
              <ArrowRightIcon className="inline-block h-5 w-5 ml-5" />
            </a>
          </div>
          <div className="w-[376px] h-0.5 bg-[#D6DDEB] mt-5" />
          <div className="mt-15">
            <h1 className="text-neutral-100 text-3xl font-clash font-bold mb-5">
              Office Location
            </h1>
            <p className="text-neutral-80 font-epilogue">
              Stripe offices spread across 20 countries
            </p>

            <div>
{Office.map((office) => (
  <div key={office.name} className="flex items-center gap-4 mt-4">
    <img src={office.image} alt={office.name} className="h-10 w-10" />
    <span className="text-neutral-100 font-epilogue">{office.name}</span>
  </div>
))}
             <a   className="text-base md:text-lg text-brand font-epilogue break-all mt-10 inline-flex items-center" href="/">
                View tech stack
                <ArrowRightIcon className="inline-block h-5 w-5 ml-5" />
              </a>
            </div>
            <div className="w-[376px] h-0.5 bg-[#D6DDEB] mt-5" />
          </div>
        </div>
      </div>
    </main>
  );
}

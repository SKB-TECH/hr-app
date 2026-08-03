import Image from "next/image";

const companies = [
    {
        name: "Vodafone",
        logo: "/img_design/vodafone.png",
    },
    {
        name: "Intel",
        logo: "/img_design/intel.png",
    },
    {
        name: "Tesla",
        logo: "/img_design/tesla.png",
    },
    {
        name: "AMD",
        logo: "/img_design/amd.png",
    },
    {
        name: "Talkit",
        logo: "/img_design/talkit.png",
    },
];

export default function CompaniesCategoryHeader() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-0 md:py-20">
                <p className="text-sm text-[#8A93A6] md:text-lg">
                    Companies we helped grow
                </p>

                <div className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:mt-10 md:grid-cols-5 md:gap-16">
                    {companies.map((company) => (
                        <div
                            key={company.name}
                            className="flex h-10 items-center opacity-35 grayscale"
                        >
                            <Image
                                src={company.logo}
                                alt={company.name}
                                width={150}
                                height={50}
                                className="h-auto w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

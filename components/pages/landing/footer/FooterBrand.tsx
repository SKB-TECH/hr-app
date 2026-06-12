import Image from "next/image";

export function FooterBrand() {
  return (
    <div className="col-span-2 md:col-span-2">
      <div className="mb-5">
        <Image
          src="/logo/brandlogodark.png"
          alt="logo-white"
          width={120}
          height={120}
        />
      </div>
      <p className="text-sm text-gray-400 leading-relaxed max-w-[300px]">
        Great platform for the job seeker that passionate about startups. Find
        your dream job easier.
      </p>
    </div>
  );
}

import Image from "next/image";

export function FooterBrand() {
  return (
    <div className="col-span-2 md:col-span-2">
      <div className="mb-5">
          <Image
              src="/logo/logow.png"
              alt="JobHuntly Logo"
              width={180}
              height={180}
              className="object-cover"
          />
      </div>
      <p className="text-sm text-gray-400 leading-relaxed max-w-[300px]">
        Great platform for the job seeker that passionate about startups. Find
        your dream job easier.
      </p>
    </div>
  );
}

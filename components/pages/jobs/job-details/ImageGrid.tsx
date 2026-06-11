import Image from "next/image";
interface ImageGridProps {
  mainImage: string;
  topRightImage: string;
  bottomRightImage: string;
}

export default function ImageGrid({
  mainImage,
  topRightImage,
  bottomRightImage,
}: ImageGridProps) {
  return (
    <div className="flex gap-4 items-start w-full max-w-[640px] ">
      {/* Left Large Image */}
      <div className="relative w-[320px] max-w-full max-sm:w-full h-[270px] rounded-sm overflow-hidden flex-shrink">
        <Image src={mainImage} alt="Main" fill className="object-cover" />
      </div>

      {/* Right Side Images */}
      <div className="flex flex-col gap-4  max-lg:flex-1">
        <div className="relative max-lg:w-full  w-[160px] max-w-full max-sm:w-[105px] h-[130px] rounded-sm overflow-hidden flex-shrink">
          <Image
            src={topRightImage}
            alt="Top Right"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative max-lg:w-full  w-[160px] max-w-full max-sm:w-[105px] h-[130px] rounded-sm overflow-hidden flex-shrink">
          <Image
            src={bottomRightImage}
            alt="Bottom Right"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

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
    <div className=" flex gap-4 w-fit">
      {/* Left Large Image */}
      <div className="relative w-[260px] h-[220px] rounded-sm overflow-hidden">
        <Image src={mainImage} alt="Main" fill className="object-cover" />
      </div>

      {/* Right Side Images */}
      <div className="flex flex-col gap-4">
        <div className="relative w-[140px] h-[102px] rounded-sm overflow-hidden">
          <Image
            src={topRightImage}
            alt="Top Right"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative w-[140px] h-[102px] rounded-sm overflow-hidden">
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

import useDropImage from "@/hooks/useDropImage";
import Image from "next/image";
import { Image as Gallery } from "lucide-react";
import { UseFormSetValue, FieldValues } from "react-hook-form";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { mediaUrl } from "@/core/lib/media-url";

function UploadFile<T extends FieldValues>({
  setValue,
  imagePlaceholder,
  currentImageUrl,
  imageClassName,
  dropzoneClassName,
}: {
  setValue?: UseFormSetValue<T>;
  imagePlaceholder?: string;
  currentImageUrl?: string | null;
  imageClassName?: string;
  dropzoneClassName?: string;
}) {
  const t = useTranslations("candidateSettings.profile.uploadFile");
  const { error, profileImage, getInputProps, getRootProps, isDragActive } =
    useDropImage(setValue);

  return (
    <div className="flex min-w-0 items-center gap-6">
      <Image
        src={profileImage || mediaUrl(currentImageUrl, imagePlaceholder!)}
        alt={t("profilePictureAlt")}
        width={96}
        height={96}
        className={cn(
          "h-32 w-32 shrink-0 self-start rounded-none object-cover max-sm:h-18 max-sm:w-18",
          imageClassName,
        )}
      />

      <div
        {...getRootProps()}
        className={cn("relative flex-1 max-w-md", dropzoneClassName)}
      >
        <input {...getInputProps()} />

        <div
          className={`relative h-[140px] rounded-none text-center py-6 px-4 cursor-pointer transition-colors ${
            isDragActive ? "bg-indigo-50" : "bg-[#F8F8FD]"
          }`}
        >
          {isDragActive ? (
            <div className="h-full flex flex-col justify-center  ">
              <p className="text-brand font-medium">{t("dropHere")}</p>
            </div>
          ) : (
            <>
              {/* SVG BORDER */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="0"
                  fill="none"
                  stroke={error ? "#DC2626" : "#4640DE"}
                  strokeWidth="2"
                  strokeDasharray="12 12"
                />
              </svg>

              <div className="relative z-10   h-full ">
                <div className="flex flex-col items-center  h-full justify-center  mb-2">
                  <span aria-label={t("uploadIconLabel")} className="text-brand">
                    <Gallery />
                  </span>
                  <p className="text-sm ">
                    <span className="text-brand font-medium ">
                      {t("clickToReplace")}
                    </span>{" "}
                    <span className="text-gray-500 font-medium">
                      {t("orDragAndDrop")}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {t("fileHint")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default UploadFile;

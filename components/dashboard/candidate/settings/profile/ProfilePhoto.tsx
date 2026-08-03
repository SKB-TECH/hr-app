import UploadFile from "./UploadFile";
import { UseFormSetValue, FieldValues } from "react-hook-form";

interface ProfilePhotoProps<T extends FieldValues> {
  heading?: string;
  paragraph?: string;
  imagePlaceholder: string;
  setValue?: UseFormSetValue<T>;
  imageClassName?: string;
  dropzoneClassName?: string;
}

function ProfilePhoto<T extends FieldValues>({
  heading,
  paragraph,
  imagePlaceholder,
  setValue,
  imageClassName,
  dropzoneClassName,
}: ProfilePhotoProps<T>) {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-[300px_minmax(0,540px)] md:gap-x-[78px]">
      <div>
        <h2 className="text-[16px]!  font-semibold text-neutral-100">
          {heading}
        </h2>
        <p className="text-[15px] leading-relaxed font-epilogue text-gray-500 mt-1">
          {paragraph}
        </p>
      </div>

      <UploadFile
        imagePlaceholder={imagePlaceholder}
        setValue={setValue}
        imageClassName={imageClassName}
        dropzoneClassName={dropzoneClassName}
      />
    </div>
  );
}
export default ProfilePhoto;

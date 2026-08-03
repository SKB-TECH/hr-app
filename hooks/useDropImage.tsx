import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormSetValue, FieldValues, Path, PathValue } from "react-hook-form";

function useDropImage<T extends FieldValues>(setValue?: UseFormSetValue<T>) {
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/gif": [".gif"],
      "image/svg+xml": [".svg"],
    },
    maxFiles: 1,

    onDrop: (acceptedFiles) => {
      setError("");

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        setProfileImage(URL.createObjectURL(file));
        setValue?.("profileImage" as Path<T>, file as PathValue<T, Path<T>>, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    },

    onDropRejected: (fileRejections) => {
      const firstError = fileRejections[0]?.errors[0];

      switch (firstError?.code) {
        case "file-invalid-type":
          setError("Only PNG, JPG, JPEG,SVG and GIF files are allowed.");
          break;

        case "too-many-files":
          setError("Please upload only one image.");
          break;

        default:
          setError(firstError?.message || "File upload failed.");
      }
    },
  });
  return {
    error,
    profileImage,
    getInputProps,
    getRootProps,
    isDragActive,
  };
}

export default useDropImage;

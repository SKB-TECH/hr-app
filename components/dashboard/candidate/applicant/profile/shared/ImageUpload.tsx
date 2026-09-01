"use client";

import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { CameraIcon } from "@heroicons/react/24/outline";
import { ACCEPTED_IMAGE_TYPES, IMAGE_FILE_HINT, MAX_IMAGE_FILE_SIZE } from "./profile-document-validation";

interface ImageUploadProps {
  label: string;
  shape?: "circle" | "rectangle";
  file: File | null;
  currentImageUrl?: string | null;
  onSelect: (file: File) => void;
  error?: string;
}

export default function ImageUpload({ label, shape = "rectangle", file, currentImageUrl, onSelect, error }: ImageUploadProps) {
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  const imageSrc = preview || currentImageUrl;

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_IMAGE_FILE_SIZE,
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) onSelect(acceptedFiles[0]);
    },
  });

  const rejectionMessage = useMemo(() => {
    const firstError = fileRejections[0]?.errors[0];
    if (!firstError) return null;
    switch (firstError.code) {
      case "file-invalid-type":
        return "Unsupported file type. Please upload a JPG, PNG, or WEBP.";
      case "file-too-large":
        return "This file is too large. Maximum allowed size is 5 MB.";
      default:
        return firstError.message || "Upload failed.";
    }
  }, [fileRejections]);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#25324B]">{label}</label>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed p-3 transition-colors ${
          isDragActive
            ? "border-brand bg-indigo-50"
            : rejectionMessage || error
              ? "border-red-300"
              : "border-gray-300 hover:border-brand hover:bg-indigo-50/40"
        }`}
      >
        <input {...getInputProps()} aria-label={label} />
        <div
          className={`flex shrink-0 items-center justify-center overflow-hidden bg-gray-100 text-gray-400 ${
            shape === "circle" ? "h-16 w-16 rounded-full" : "h-16 w-28 rounded-md"
          }`}
        >
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <CameraIcon className="h-6 w-6" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-brand">{file ? "Change photo" : "Click to upload or drag & drop"}</p>
          <p className="mt-0.5 text-[12px] text-gray-400">{IMAGE_FILE_HINT}</p>
        </div>
      </div>
      {(rejectionMessage || error) && <p className="mt-2 text-[13px] text-red-500">{rejectionMessage || error}</p>}
    </div>
  );
}

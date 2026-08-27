"use client";

import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { DocumentIcon, PhotoIcon, XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import {
  ACCEPTED_CERTIFICATE_TYPES,
  CERTIFICATE_FILE_HINT,
  MAX_CERTIFICATE_FILE_SIZE,
  formatFileSize,
} from "./certification-validation";

interface CertificateUploadProps {
  file: File | null;
  existingFileUrl?: string | null;
  existingFileName?: string | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
  error?: string;
}

export default function CertificateUpload({
  file,
  existingFileUrl,
  existingFileName,
  onSelect,
  onRemove,
  error,
}: CertificateUploadProps) {
  const preview = useMemo(() => {
    if (file && file.type.startsWith("image/")) return URL.createObjectURL(file);
    return null;
  }, [file]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: ACCEPTED_CERTIFICATE_TYPES,
    maxSize: MAX_CERTIFICATE_FILE_SIZE,
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
        return "Unsupported file type. Please upload a PDF, JPG, JPEG, or PNG.";
      case "file-too-large":
        return "This file is too large. Maximum allowed size is 5 MB.";
      case "too-many-files":
        return "Please upload only one file.";
      default:
        return firstError.message || "File upload failed.";
    }
  }, [fileRejections]);

  const displayName = file?.name || existingFileName;
  const displaySize = file ? formatFileSize(file.size) : null;
  const hasFile = Boolean(file || existingFileUrl);
  const showError = error || rejectionMessage;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#25324B]">Upload Certificate</label>

      {!hasFile && (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors ${
            isDragActive ? "border-brand bg-indigo-50" : showError ? "border-red-300 bg-red-50/40" : "border-gray-300 hover:border-brand hover:bg-indigo-50/40"
          }`}
        >
          <input {...getInputProps()} aria-label="Upload certificate file" />
          <div className="flex flex-col items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand">
              <ArrowUpTrayIcon className="h-5 w-5" />
            </span>
            <p className="text-[14px] font-medium text-[#202430]">Upload your certificate</p>
            <p className="text-[13px] text-gray-500">
              {isDragActive ? "Drop the file here" : "Drag & drop your file here or browse"}
            </p>
            <p className="text-[12px] text-gray-400">{CERTIFICATE_FILE_HINT}</p>
          </div>
        </div>
      )}

      {hasFile && (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Certificate preview" className="h-full w-full object-cover" />
            ) : (
              <DocumentIcon className="h-5 w-5 text-brand" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-[#202430]">{displayName || "Certificate file"}</p>
            <p className="text-[12px] text-gray-400">
              {displaySize || (existingFileUrl && !file ? "Previously uploaded" : "")}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <label className="cursor-pointer border border-gray-200 px-2.5 py-1.5 text-[12px] font-medium text-brand hover:bg-indigo-50">
              Replace
              <input {...getInputProps()} className="hidden" aria-label="Replace certificate file" />
            </label>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove certificate file"
              className="border border-gray-200 p-1.5 text-gray-500 hover:border-red-300 hover:text-red-500"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {existingFileUrl && !file && (
        <a
          href={existingFileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-brand hover:underline"
        >
          <PhotoIcon className="h-3.5 w-3.5" />
          View current certificate
        </a>
      )}

      {showError && <p className="mt-2 text-[13px] text-red-500">{showError}</p>}
    </div>
  );
}

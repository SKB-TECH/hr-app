"use client";

import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { DocumentArrowUpIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { ACCEPTED_DOCUMENT_TYPES, DOCUMENT_FILE_HINT, MAX_DOCUMENT_FILE_SIZE, formatFileSize } from "./profile-document-validation";

interface DocumentUploadProps {
  label: string;
  file: File | null;
  error?: string;
  onSelect: (file: File) => void;
}

export default function DocumentUpload({ label, file, error, onSelect }: DocumentUploadProps) {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: ACCEPTED_DOCUMENT_TYPES,
    maxSize: MAX_DOCUMENT_FILE_SIZE,
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
        return "Unsupported file type. Please upload a PDF, DOC, or DOCX.";
      case "file-too-large":
        return "This file is too large. Maximum allowed size is 10 MB.";
      default:
        return firstError.message || "Upload failed.";
    }
  }, [fileRejections]);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#25324B]">{label}</label>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed p-4 transition-colors ${
          isDragActive
            ? "border-brand bg-indigo-50"
            : rejectionMessage || error
              ? "border-red-300"
              : "border-gray-300 hover:border-brand hover:bg-indigo-50/40"
        }`}
      >
        <input {...getInputProps()} aria-label={label} />
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-400">
          {file ? <DocumentTextIcon className="h-6 w-6 text-brand" /> : <DocumentArrowUpIcon className="h-6 w-6" />}
        </div>
        <div className="min-w-0">
          {file ? (
            <>
              <p className="truncate text-[14px] font-medium text-[#25324B]">{file.name}</p>
              <p className="mt-0.5 text-[12px] text-gray-400">{formatFileSize(file.size)} — click to replace</p>
            </>
          ) : (
            <>
              <p className="text-[14px] font-medium text-brand">Click to upload or drag & drop</p>
              <p className="mt-0.5 text-[12px] text-gray-400">{DOCUMENT_FILE_HINT}</p>
            </>
          )}
        </div>
      </div>
      {(rejectionMessage || error) && <p className="mt-2 text-[13px] text-red-500">{rejectionMessage || error}</p>}
    </div>
  );
}

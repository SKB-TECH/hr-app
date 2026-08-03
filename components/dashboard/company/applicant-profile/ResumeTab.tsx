"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// worker (required)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumeTab() {
  const [numPages, setNumPages] = useState<number>();

  function onLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full my-10 md:p-8 flex flex-col items-center h-[750px] overflow-y-auto custom-scrollbar">
      <style>{`
        .react-pdf__Page {
          width: 100% !important;
          height: auto !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        .react-pdf__Page__canvas {
          width: 100% !important;
          height: auto !important;
          max-width: 100% !important;
          display: block !important;
        }
      `}</style>

      <Button
        onClick={() => window.open("/resume/resume-sample.pdf")}
        variant="custom-primary"
        className="md:hidden mb-6 hover:bg-brand-light-neutral/30 cursor-pointer"
      >
        Download Resume
      </Button>

      {/* PDF Document Container */}
      <Document
        className="flex flex-col gap-6 w-full items-center"
        file="/resume/resume-sample.pdf"
        onLoadSuccess={onLoadSuccess}
        loading={
          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
            <p className="text-sm font-medium">Loading CV...</p>
          </div>
        }
      >
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <div
              key={index}
              className="border border-slate-200/80 rounded overflow-hidden w-full max-w-[800px] shrink-0"
            >
              <Page
                pageNumber={index + 1}
                width={800}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
      </Document>
    </div>
  );
}

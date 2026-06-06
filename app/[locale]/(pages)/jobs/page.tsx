"use client";
import { useState } from "react";
import ApplyOverlay from "@/components/jobs/ApplyOverlay";

export default function JobsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Apply</button>
      <ApplyOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
"use client";

import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ShareJobButton({
  title,
  label = "Share job offer",
  className = "",
}: {
  title: string;
  label?: string;
  className?: string;
}) {
  async function share() {
    const url = window.location.href;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text: `Check out this executive role: ${title}`, url });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast.success("Job link copied to clipboard!");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Unable to share this job offer");
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center w-11 h-11 border border-[#D6DDEB] bg-white text-[#515B6F] hover:text-[#4640DE] hover:border-[#4640DE] rounded-none transition-all cursor-pointer shadow-sm ${className}`}
    >
      <Share2 size={18} />
    </button>
  );
}


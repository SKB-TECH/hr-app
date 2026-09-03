"use client";

import Image from "next/image";
import toast from "react-hot-toast";

export default function ShareJobButton({ title, label, className = "" }: { title: string; label: string; className?: string }) {
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Lien de l’offre copié");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Impossible de partager cette offre");
    }
  }

  return (
    <button type="button" onClick={share} aria-label={label} title={label} className={`text-[#7C8493] hover:text-[#4640DE] transition-colors cursor-pointer ${className}`}>
      <Image src="/linkIcon.png" alt="" width={28} height={28} />
    </button>
  );
}

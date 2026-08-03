import Image from "next/image";
import { cn } from "@/lib/utils";

const logoColors: Record<string, string> = {
  Nomad: "bg-accent-green text-white",
  Discord: "bg-[#5865F2] text-white",
  Maze: "bg-accent-yellow text-neutral-100",
  Udacity: "bg-accent-light-blue text-white",
  Webflow: "bg-brand text-white",
  Foundation: "bg-neutral-100 text-white",
  Pentagram: "bg-neutral-100 text-white",
  "Wolff Olins": "bg-accent-red text-white",
  Clay: "bg-accent-light-blue text-white",
  MediaMonks: "bg-accent-green text-white",
  Packer: "bg-accent-yellow text-neutral-100",
  Square: "bg-neutral-100 text-white",
  Divy: "bg-brand text-white",
};

type CompanyLogoProps = {
  name: string;
  src?: string;
  size?: number;
  className?: string;
};

export default function CompanyLogo({
  name,
  src,
  size = 48,
  className,
}: CompanyLogoProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        className={cn("rounded-lg object-contain", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg font-semibold",
        logoColors[name] ?? "bg-brand-light-neutral text-brand",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

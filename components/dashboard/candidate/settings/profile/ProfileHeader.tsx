import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  header?: string;
  paragraph?: string;
  className?: string;
}
function ProfileHeader({ header, paragraph, className }: ProfileHeaderProps) {
  return (
    <div className={cn(className, "mb-6")}>
      <h1 className="text-[16px] font-epilogue font-semibold text-neutral-100">
        {header}
      </h1>
      <p className="text-[15px] leading-relaxed font-epilogue text-gray-500 mt-1">
        {paragraph}
      </p>
    </div>
  );
}

export default ProfileHeader;

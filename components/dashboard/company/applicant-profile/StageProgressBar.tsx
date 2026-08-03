import { ApplicationStage } from "@/types/company-applicants";
import ProressBar from "./ProressBar";

function StageProgressBar({ stages }: { stages: ApplicationStage }) {
  return (
    <div className="bg-[#f8f8fd]  p-4 my-6 w-full font-epilogue">
      <div className="flex justify-between ">
        <p className="text-[14px] tracking-wide text-neutral-100 ">Stage</p>
        <div className="flex gap-2 items-center">
          <span className="bg-blue-400 w-[11px] h-[11px] rounded-full block" />
          <p className="text-blue-400 text-[14px] tracking-wide">
            {stages.title}
          </p>
        </div>
      </div>

      {/* progress bar -- 4 steps */}
      <ProressBar stages={stages} />
    </div>
  );
}

export default StageProgressBar;

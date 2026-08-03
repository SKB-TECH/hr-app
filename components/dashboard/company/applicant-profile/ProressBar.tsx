import { ApplicationStage } from "@/types/company-applicants";

function ProressBar({ stages }: { stages: ApplicationStage }) {
  const LoopCount = [];
  for (let i = 1; i <= stages.totalStages; i++) {
    LoopCount.push(i);
  }
  return (
    <div className="h-2.5 w-full flex gap-1 justify-between bg-gray-200 my-2">
      {LoopCount.map((step) => (
        <div
          key={step}
          className={`h-full w-full ${
            step <= stages.stage ? "bg-[#26a4ff]" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default ProressBar;

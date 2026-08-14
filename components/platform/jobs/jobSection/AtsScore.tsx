import { AtsProps } from "./JobsCard";

function AtsScore({ score, atsInfo }: AtsProps) {
  return (
    <div className="text-xs text-center md:text-right">
      <span className="text-neutral-60 font-medium">ATS Match: </span>
      <span className={`font-bold ${atsInfo.textColor}`}>
        {score}% ({atsInfo.chanceText})
      </span>
    </div>
  );
}

export default AtsScore;

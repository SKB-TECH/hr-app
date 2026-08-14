import { AtsProps } from "./JobsCard";

function AtsScore({ score, atsInfo }: AtsProps) {
  return (
    <div
      className={`text-xs text-center md:text-right w-fit ml-auto ${atsInfo.bg}  ${atsInfo.textColor} px-3 py-1.5`}
    >
      <span className="font-semibold uppercase text-start tracking-wide">
        Score:{" "}
      </span>
      <span
        className={`font-semibold text-[14px] tracking-wide ${atsInfo.textColor} `}
      >
        {" "}
        {score}%
      </span>
    </div>
  );
}

export default AtsScore;

"use client";

import { Applicant } from "@/types/applicant";
import { Star } from "lucide-react";
import { useState } from "react";

function PipelineStarLogic({ applicant }: { applicant: Applicant }) {
  const [starState, setStarState] = useState({
    score: applicant.score,
    isStarred: false,
  });

  const handleStarClick = () => {
    setStarState((currentState) => {
      const nextStarred = !currentState.isStarred;

      return {
        isStarred: nextStarred,
        score: Math.max(0, currentState.score + (nextStarred ? 1 : -1)),
      };
    });
  };

  return (
    <button
      type="button"
      onClick={handleStarClick}
      aria-pressed={starState.isStarred}
      aria-label={starState.isStarred ? "Unstar applicant" : "Star applicant"}
      className="mt-1 inline-flex items-center gap-1 font-medium text-neutral-100"
    >
      <Star
        size={18}
        className={
          starState.isStarred
            ? "fill-amber-400 text-amber-400"
            : "text-neutral-40"
        }
      />
      {starState.score.toFixed(1)}
    </button>
  );
}

export default PipelineStarLogic;

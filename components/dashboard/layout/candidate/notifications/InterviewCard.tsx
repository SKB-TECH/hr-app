import Image from "next/image";
import { InterviewCardData } from "./types";
import { Clock, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  card: InterviewCardData;
  isExpanded?: boolean;
}

export function InterviewCard({ card, isExpanded = false }: Props) {
  return (
    <div className="mt-2.5 rounded-sm border-l-[4px] border-brand bg-gray-50 py-3 pl-3 pr-2 transition-all">
      {/* Title and role */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-100">{card.title}</p>
          <p className={`text-xs text-neutral-60 ${isExpanded ? "mb-3" : ""}`}>
            {card.role}
          </p>
        </div>
        <div className="text-neutral-60">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-3 max-md:flex-col flex gap-5">
            {/* Date */}
            <div className="flex items-start gap-1.5 text-neutral-60">
              <Calendar size={16} />
              <div>
                <p className="text-[10px] leading-none text-gray-400">Date</p>
                <p className="mt-0.5 text-xs font-medium text-neutral-100">
                  {card.date}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-1.5 text-neutral-60">
              <Clock size={16} />
              <div>
                <p className="text-[10px]  text-neutral-60">Time</p>
                <p className="mt-0.5 text-xs font-medium text-neutral-100">
                  {card.time}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src={card.personAvatar}
              alt={card.personName}
              width={22}
              height={22}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-semibold leading-none text-neutral-100">
                {card.personName}
              </p>
              <p className="text-[12px] text-neutral-60">{card.personEmail}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

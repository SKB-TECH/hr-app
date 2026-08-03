import Image from "next/image";
import { Star } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Applicant } from "@/types/applicant";

export default function ApplicantCard({ applicant }: { applicant: Applicant }) {
  return (
    <div className="p-4 flex gap-5">
      <div className="flex items-center gap-3">
        <Image
          src={applicant.avatar}
          alt={applicant.name}
          width={55}
          height={55}
          className="rounded-full h-15 w-15 object-cover"
        />
      </div>

      <div className="">
        <h3 className="font-medium mb-2">{applicant.name}</h3>
        <div className="flex items-center gap-3">
          <div className="flex gap-3 border border-neutral-20 rounded-full px-4 py-2 text-sm font-medium text-neutral-80 justify-center items-center">
            {applicant.score > 0 ? (
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ) : (
              <Star className="w-3 h-3 fill-neutral-20 text-neutral-20" />
            )}

            {applicant.score}
          </div>
            <StatusBadge status={applicant.stage} />
        </div>
      </div>
    </div>
  );
}

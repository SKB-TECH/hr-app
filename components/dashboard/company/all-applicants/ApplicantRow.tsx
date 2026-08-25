import Image from "next/image";
import { Star, MoreHorizontal } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Link } from "@/i18n/routing";

interface Props {
  applicant: {
    id: number;
    name: string;
    avatar: string;
    score: number;
    stage: string;
    appliedDate: string;
    jobRole?: string;
  };
  index: number;
}

export default function ApplicantRow({ applicant, index }: Props) {
  return (
    <tr
      className={
        index % 2 === 0
          ? "bg-[#F6F6FD] text-sm text-neutral-100"
          : "text-sm text-neutral-100"
      }
    >
      <td className="p-4">
        <input
          type="checkbox"
          className="h-4 w-4 cursor-pointer border border-neutral-20"
        />
      </td>

      <td className="p-4">
        <div className="flex items-center gap-3">
          <Image
            src={applicant.avatar}
            alt={applicant.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />

          <span className="font-medium">{applicant.name}</span>
        </div>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-1 font-medium">
          {index > 1 ? (
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ) : (
            <Star className="w-5 h-5 fill-neutral-20 text-neutral-20" />
          )}

          {applicant.score}
        </div>
      </td>

      <td className=" font-medium">
        <StatusBadge status={applicant.stage} />
      </td>

      <td className=" font-medium">{applicant.appliedDate}</td>
      {applicant.jobRole && (
        <td className=" font-medium ">{applicant.jobRole}</td>
      )}

      <td>
        <Link
          href={`/company/applicants/${applicant.id}`}
          className="border border-brand text-brand px-4 py-2  bg-[#E9EBFD] cursor-pointer"
        >
          See Application
        </Link>
      </td>

      <td className="p-4">
        <MoreHorizontal className="cursor-pointer" />
      </td>
    </tr>
  );
}

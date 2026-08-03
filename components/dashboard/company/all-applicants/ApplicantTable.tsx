import ApplicantRow from "./ApplicantRow";
import ApplicantCard from "./ApplicantCard";
import { Applicant } from "@/types/applicant";
import { RiExpandUpDownLine } from "react-icons/ri";

interface Props {
  applicants: Applicant[];
  tableHeaders: string[];
}

export default function ApplicantTable({ applicants, tableHeaders }: Props) {
  return (
    <>
      {/* Desktop */}

      <div className="hidden md:block overflow-x-hidden">
        <table className="w-full  border border-neutral-20 text-sm text-neutral-60 tracking-wide">
          <thead className="px-4  pt-4 pb-6 border border-neutral-20">
            <tr className="font-medium  text-neutral-80 justify-center place-items-center">
              {tableHeaders.map((header, index) => (
                <th key={header} className="p-4  text-left">
                  {index === 0 ? (
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer border border-neutral-20"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{header}</span>
                      <RiExpandUpDownLine className="h-4 w-4 text-neutral-60" />
                    </div>
                  )}
                </th>
              ))}
              <th className="border-b border-neutral-20"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={8} className="h-5 border border-white"></td>
            </tr>
            {applicants.map((applicant, index) => (
              <ApplicantRow
                key={applicant.id}
                applicant={applicant}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="grid gap-4 md:hidden mt-8">
        {applicants.map((applicant) => (
          <ApplicantCard key={applicant.id} applicant={applicant} />
        ))}
        <hr className="bg-neutral-20" />
      </div>
    </>
  );
}

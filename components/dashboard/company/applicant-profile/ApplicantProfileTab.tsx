import { Applicant } from "@/types/company-applicants";
import InfoField from "./InfoField";

function ApplicantProfileTab({
  applicantDetails,
}: {
  applicantDetails: Applicant;
}) {
  return (
    <div className="mt-8 flex flex-col gap-8 pb-8 font-epilogue">
      {/* Personal Info Section */}
      <section>
        <h3 className="text-[18px] tracking-wide font-bold text-neutral-100 mb-6">
          Personal Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
          {applicantDetails.personalInfo.map((info) => (
            <InfoField
              key={info.id}
              label={info.label}
              value={info.value}
              subValue={info.subValue}
              isFullWidth={info.isFullWidth}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Professional Info Section */}
      <section>
        <h3 className="text-[18px] tracking-wide font-bold text-neutral-100 mb-6">
          Professional Info
        </h3>

        {/* About Me */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">About Me</p>
          <div className="text-gray-700 space-y-4 text-[15px] leading-relaxed font-medium">
            {applicantDetails.professionalInfo.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Professional Details & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
          {/* Loop through Details */}
          {applicantDetails.professionalInfo.details.map((info) => (
            <InfoField
              className="max-md:grid grid-cols-2 gap-6 max-md:text-[14px]"
              key={info.id}
              label={info.label}
              value={info.value}
            />
          ))}

          {/* Render Skills using the InfoField component */}
          <InfoField label="Skill set">
            <div className="flex flex-wrap gap-2">
              {applicantDetails.professionalInfo.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[#F8F8FD] text-brand  text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </InfoField>
        </div>
      </section>
    </div>
  );
}

export default ApplicantProfileTab;

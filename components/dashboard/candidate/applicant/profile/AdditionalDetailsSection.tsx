
import { PencilSquareIcon, EnvelopeIcon, DevicePhoneMobileIcon, LanguageIcon } from "@heroicons/react/24/outline";

interface AdditionalDetailsSectionProps {
  email?: string;
  phone?: string;
  languages?: string;
}

export default function AdditionalDetailsSection({
  email = "jakegyll@email.com",
  phone = "+44 1245 572 135",
  languages = "English, French",
}: AdditionalDetailsSectionProps) {
  return (
    <div className="bg-white border border-gray-200 p-6 font-epilogue">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-bold text-[#25324B]">Additional Details</h2>
        <button className="border border-gray-200 p-1.5  ">
          <PencilSquareIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <EnvelopeIcon className="w-5 h-5 text-[#7C8493] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] text-[#7C8493]">Email</p>
            <p className="text-[16px] font-medium text-[#25324B] mt-0.5">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DevicePhoneMobileIcon className="w-5 h-5 text-[#7C8493] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] text-[#7C8493]">Phone</p>
            <p className="text-[16px] font-medium text-[#25324B] mt-0.5">{phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageIcon className="w-5 h-5 text-[#7C8493] flex-shrink-0 mt-1" />
          <div>
            <p className="text-[14px] text-[#7C8493]">Languages</p>
            <p className="text-[16px] font-medium text-[#25324B] mt-0.5">{languages}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

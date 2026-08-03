import { UseFormRegister } from "react-hook-form";
import { ProfileFormValues } from "./SettingsProfile";

function AccountType({
  register,
}: {
  register: UseFormRegister<ProfileFormValues>;
}) {
  return (
    <div className="flex max-md:flex-col gap-6 md:gap-16  mb-8">
      <div className=" shrink-0">
        <h2 className="text-[16px]  font-semibold text-neutral-1000">
          Account Type
        </h2>
        <p className="text-[15px] text-gray-500 mt-1">
          You can update your account type
        </p>
      </div>

      <div className="flex-1 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="radio"
            value="jobSeeker"
            {...register("accountType")}
            className="mt-0.5 w-5 h-5 accent-[#4640DE]"
          />
          <div>
            <p className="text-[15px] font-semibold">Job Seeker</p>
            <p className="text-[15px] text-gray-500">Looking for a job</p>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="radio"
            value="employer"
            {...register("accountType")}
            className="mt-0.5 w-5 h-5 accent-[#4640DE]"
          />
          <div>
            <p className="text-[15px] font-semibold">Employer</p>
            <p className="text-[15px] text-gray-500">
              Hiring, sourcing candidates, or posting jobs
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
export default AccountType;

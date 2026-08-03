import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import InputField from "./InputField";
import { PersonalFormProps } from "./SettingsProfile";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

function PersonalDetails({ register, errors, setValue }: PersonalFormProps) {
  register("gender", { required: "Gender is required" }); // Register the gender
  return (
    <div className="flex max-md:flex-col gap-6 md:gap-16 mb-8">
      <div className="w-48 shrink-0">
        <h2 className="text-[16px]  font-semibold text-neutral-100">
          Personal Details
        </h2>
      </div>

      <div className=" flex-1 space-y-5">
        <div>
          <InputField
            {...register("fullName", {
              required: "Full name is required",
            })}
            label="Full Name"
            placeholder="Jake Gyll"
            required={true}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField
              {...register("phone", {
                required: "Phone number is required",
              })}
              label="Phone Number"
              required={true}
              placeholder="+1 234 567 890"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <InputField
              {...register("email", {
                required: "Email is required",
              })}
              label="email"
              required={true}
              placeholder="Jakegyll@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              label="Date of Birth"
              type="date"
              required={true}
              placeholder="09/08/1997"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-2">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <Select
              onValueChange={(value) => {
                setValue?.("gender", value, { shouldValidate: true });
              }}
            >
              <SelectTrigger className="text-neutral-100! w-full border border-gray-200 placeholder:text-neutral-100  px-4 py-5.5 text-sm rounded-none !focus:outline-brand">
                <SelectValue
                  className="!placeholder:text-neutral-100"
                  placeholder="Select Gender"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {genderOptions.map((option) => (
                    <SelectItem
                      onClick={() =>
                        setValue?.("gender", option.value, {
                          shouldValidate: true,
                        })
                      }
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-2">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PersonalDetails;

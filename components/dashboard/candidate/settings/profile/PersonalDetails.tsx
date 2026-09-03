import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import InputField from "./InputField";
import { PersonalFormProps } from "./SettingsProfile";

function PersonalDetails({ register, errors, setValue }: PersonalFormProps) {
  const t = useTranslations("candidateSettings.profile.personalDetails");

  const genderOptions = [
    { value: "male", label: t("genderOptions.male") },
    { value: "female", label: t("genderOptions.female") },
    { value: "other", label: t("genderOptions.other") },
  ];

  register("gender", { required: t("genderRequired") }); // Register the gender
  return (
    <div className="flex max-md:flex-col gap-6 md:gap-16 mb-8">
      <div className="w-48 shrink-0">
        <h2 className="text-[16px]  font-semibold text-neutral-100">
          {t("title")}
        </h2>
      </div>

      <div className=" flex-1 space-y-5">
        <div>
          <InputField
            {...register("fullName", {
              required: t("fullNameRequired"),
            })}
            label={t("fullNameLabel")}
            placeholder={t("fullNamePlaceholder")}
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
                required: t("phoneRequired"),
              })}
              label={t("phoneLabel")}
              required={true}
              placeholder={t("phonePlaceholder")}
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
                required: t("emailRequired"),
              })}
              label={t("emailLabel")}
              required={true}
              placeholder={t("emailPlaceholder")}
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
                required: t("dobRequired"),
              })}
              label={t("dobLabel")}
              type="date"
              required={true}
              placeholder={t("dobPlaceholder")}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-2">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("genderLabel")} <span className="text-red-500">*</span>
            </label>
            <Select
              onValueChange={(value) => {
                setValue?.("gender", value, { shouldValidate: true });
              }}
            >
              <SelectTrigger className="text-neutral-100! w-full border border-gray-200 placeholder:text-neutral-100  px-4 py-5.5 text-sm rounded-none !focus:outline-brand">
                <SelectValue
                  className="!placeholder:text-neutral-100"
                  placeholder={t("genderPlaceholder")}
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

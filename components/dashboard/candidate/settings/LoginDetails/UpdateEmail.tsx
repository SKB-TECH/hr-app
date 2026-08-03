import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import InputField from "../profile/InputField";
import useSettingsForm from "@/hooks/useSettingsForm";

interface UpdateEmailFormValues {
  email: string;
}

function UpdateEmail() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useSettingsForm<UpdateEmailFormValues>();

  return (
    <div className="flex max-md:flex-col max-md:gap-5  gap-16 mb-8">
      <div className="w-48 shrink-0">
        <h2 className="text-[16px]  font-semibold text-neutral-100">
          Update Email
        </h2>
        <p className="text-[15px] leading-relaxed font-epilogue text-gray-500 mt-1">
          Update your email address to make sure it is safe
        </p>
      </div>

      <div className="flex-1   space-y-4">
        {/* Current email with verified badge */}
        <div className="max-md:bg-brand-light-neutral/25 p-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center text-sm font-medium text-neutral-100">
              <span>jakegyll@email.com</span>
              <span aria-label="Verified" className="text-accent-green text-sm">
                <CheckCircle size={16} />{" "}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Your email address is verified.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Update Email field */}
          <div>
            <InputField
              {...register("email", { required: "Email is required" })}
              label="Update Email"
              type="email"
              placeholder="Enter your new email address"
              className="!placeholder:text-neutral-60 "
            />
            {errors && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email?.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="custom-secondary">
            {isSubmitting ? "Updating..." : "Update Email"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmail;

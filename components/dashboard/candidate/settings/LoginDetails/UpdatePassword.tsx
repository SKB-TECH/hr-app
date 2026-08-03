import { Button } from "@/components/ui/button";
import InputField from "../profile/InputField";
import useSettingsForm from "@/hooks/useSettingsForm";

interface UpdatePasswordFormValues {
  currentPassword: string;
  newPassword: string;
}

function UpdatePassword() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useSettingsForm<UpdatePasswordFormValues>();

  return (
    <div className="flex max-md:flex-col gap-4 md:gap-16 mb-8">
      <div className="w-48 shrink-0">
        <h2 className="text-[16px]  font-semibold text-neutral-100">
          New Password
        </h2>
        <p className="text-[15px] leading-relaxed font-epilogue text-gray-500 mt-1">
          Manage your password to make sure it is safe
        </p>
      </div>

      <form className="flex-1 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Old Password */}
        <div className="mb-8 ">
          <InputField
            {...register("currentPassword", {
              required: "Old password is required",
            })}
            label="Old Password"
            type="password"
            placeholder="Enter your old password"
          />
          {errors && (
            <p className="text-red-500 text-sm mt-2">
              {errors.currentPassword?.message}
            </p>
          )}

          <p className="tracking-wide text-xs font-medium mt-1 text-neutral-60">
            Minimum 8 characters.
          </p>
        </div>

        {/* New Password */}

        <InputField
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          className="mt-4"
          {...register("newPassword", { required: "New password is required" })}
        />
        {errors && (
          <p className="text-red-500 text-sm mt-2">
            {errors.newPassword?.message}
          </p>
        )}

        <Button type="submit" variant="custom-secondary">
          {isSubmitting ? "Changing Password..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
}

export default UpdatePassword;

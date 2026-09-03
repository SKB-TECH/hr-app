"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import InputField from "../profile/InputField";
import { useSession } from "@/core/hooks/auth/use-session";
import { useUpdateUserEmail } from "@/core/hooks/users/use-update-user-email";
import { ApiError } from "@/core/types/api";

interface UpdateEmailFormValues {
  email: string;
}

function UpdateEmail() {
  const { data: session } = useSession();
  const updateEmail = useUpdateUserEmail();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateEmailFormValues>({ defaultValues: { email: "" } });

  const onSubmit = async (values: UpdateEmailFormValues) => {
    try {
      await updateEmail.mutateAsync({ email: values.email.trim() });
      toast.success("Email updated successfully.");
      reset({ email: "" });
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Something went wrong. Please try again.");
    }
  };

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
              <span>{session?.email || "—"}</span>
              {session?.emailVerified && (
                <span aria-label="Verified" className="text-accent-green text-sm">
                  <CheckCircle size={16} />{" "}
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {session?.emailVerified ? "Your email address is verified." : "Your email address is not verified yet."}
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="custom-secondary" disabled={updateEmail.isPending}>
            {updateEmail.isPending ? "Updating..." : "Update Email"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmail;

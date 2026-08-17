"use client";

import Separator from "@/components/common/auth/Separetor";
import TabsUserLevel from "@/components/common/auth/TabsUserLevel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FormGroup {
  id: string;
  type: string;
  name: string;
  placeholder: string;
}

type UserLevel = "job-seeker" | "company";

export default function SignUpPage() {
  const [userLevel, setUserLevel] =
      useState<UserLevel>("job-seeker");

  const inputs: FormGroup[] = [
    {
      id: "FullName",
      type: "text",
      name: "Full name",
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      name: "Email",
      placeholder: "Enter your email",
    },
    {
      id: "password",
      type: "password",
      name: "Password",
      placeholder: "Enter your password",
    },
  ];

  return (
      <main className="flex w-full flex-1 items-center justify-center">
        <div className="w-full max-w-xl">
          <div className="flex w-full flex-col gap-5">
            <TabsUserLevel
                value={userLevel}
                onChange={setUserLevel}
            />

            <div className="space-y-2 text-center">
              <h1 className="font-epilogue text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Get more opportunities
              </h1>

              <p className="font-epilogue text-sm text-slate-500 sm:text-base">
                {userLevel === "job-seeker"
                    ? "Create your candidate account and discover new opportunities."
                    : "Create your company account and start hiring great talent."}
              </p>
            </div>

            <div className="w-full">
              <button
                  type="button"
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 border border-gray-300 bg-white px-4 font-epilogue font-semibold text-indigo-600 transition duration-300 hover:bg-gray-50"
              >
                <Image
                    width={24}
                    height={24}
                    src="/images/google.svg"
                    alt="Google"
                    className="h-6 w-6"
                />

                <span>Sign up with Google</span>
              </button>
            </div>

            <Separator text="Or sign up with email" />

            <div className="flex w-full flex-col gap-5">
              {inputs.map((input) => (
                  <div
                      key={input.id}
                      className="w-full min-w-0"
                  >
                    <Label
                        htmlFor={input.id}
                        className="mb-2 block font-epilogue text-sm font-medium text-gray-700 sm:text-base"
                    >
                      {input.name}
                    </Label>

                    <Input
                        type={input.type}
                        id={input.id}
                        name={input.id}
                        className="
                    h-14
                    w-full
                    rounded-none
                    border
                    border-gray-300
                    px-4
                    font-epilogue
                    text-sm
                    font-normal
                    placeholder:text-gray-400
                    focus:border-indigo-500
                    focus:outline-none
                    focus:ring-1
                    focus:ring-indigo-500
                    sm:text-base
                  "
                        placeholder={input.placeholder}
                    />
                  </div>
              ))}

              <button
                  type="button"
                  className="
                mt-1
                h-14
                w-full
                cursor-pointer
                bg-indigo-600
                px-4
                font-epilogue
                font-semibold
                text-white
                transition
                duration-300
                hover:bg-indigo-700
              "
              >
                Continue
              </button>

              <div className="pt-1">
                <p className="text-center font-epilogue text-sm text-gray-600 sm:text-left sm:text-base">
                  Already have an account?{" "}
                  <Link
                      href="/sign-in"
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Login
                  </Link>
                </p>
              </div>

              <div>
                <p className="text-center font-epilogue text-xs leading-5 text-gray-500 sm:text-left sm:text-sm">
                  By clicking &apos;Continue&apos;, you acknowledge that you have
                  read and accept the{" "}
                  <Link
                      href="/terms"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                      href="/privacy"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
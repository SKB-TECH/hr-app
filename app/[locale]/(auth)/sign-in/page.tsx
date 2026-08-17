"use client";

import Separator from "@/components/common/auth/Separetor";
import TabsUserLevel, {
  type UserLevel,
} from "@/components/common/auth/TabsUserLevel";
import { FilterTick } from "@/components/ui/FilterTick";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormGroup } from "@/types/FormGroupType";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [check, setCheck] = useState(false);

  const [userLevel, setUserLevel] =
      useState<UserLevel>("job-seeker");

  const inputs: FormGroup[] = [
    {
      id: "email",
      type: "email",
      name: "Email Address",
      placeholder: "Enter email address",
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
                Welcome Back
              </h1>

              <p className="font-epilogue text-sm text-slate-500 sm:text-base">
                {userLevel === "job-seeker"
                    ? "Sign in to continue your job search and manage your applications."
                    : "Sign in to manage your jobs, candidates and recruitment process."}
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

                <span>Sign in with Google</span>
              </button>
            </div>

            <Separator text="Or login with email" />

            <div className="flex w-full flex-col gap-5">
              {inputs.map((input: FormGroup) => (
                  <div
                      className="w-full min-w-0"
                      key={input.id}
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

              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="group flex cursor-pointer items-center gap-3 text-sm sm:text-base">
                  <FilterTick
                      key={String(check)}
                      defaultChecked={check}
                      onChange={setCheck}
                  />

                  <button
                      type="button"
                      onClick={() => setCheck(!check)}
                      className="font-epilogue text-slate-600 transition-colors group-hover:text-indigo-600"
                  >
                    Remember me
                  </button>
                </div>

                <Link
                    href="/forgot-password"
                    className="font-epilogue text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:text-base"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                  type="submit"
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
                Sign In
              </button>

              <div className="pt-2 text-center sm:text-left">
                <p className="font-epilogue text-sm text-gray-600 sm:text-base">
                  Don&apos;t have an account?{" "}
                  <Link
                      href="/sign-up"
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
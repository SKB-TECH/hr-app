"use client";

import Separator from "@/components/common/auth/Separetor";
import TabsUserLevel from "@/components/common/auth/TabsUserLevel";
import { FilterTick } from "@/components/ui/FilterTick";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormGroup } from "@/types/FormGroupType";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [check, setCheck] = useState(false);

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
    <main className='flex flex-col flex-1 p-8'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center gap-5 mx-auto'>
        <TabsUserLevel />

        <h1 className='text-3xl font-epilogue font-extrabold font-heading font-3xl text-center'>
          Welcome Back, Dude
        </h1>

        <Separator text='Or login with email' />

        <div className='w-full'>
          <button className='font-epilogue font-semibold w-full bg-none border rounded-none p-4 py-4 text-indigo-500 cursor-pointer flex flex-row items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 transition duration-300'>
            <Image
              width={20}
              height={20}
              src='/images/google.svg'
              alt='Google'
              className='w-6 h-6'
            />
            Sign in with Google
          </button>
        </div>

        <div className='w-full flex flex-col gap-5 mt-3'>
          {inputs?.map((input: FormGroup) => (
            <div className='form-group' key={input.id}>
              <Label
                htmlFor={input.id}
                className='block font-epilogue text-xl font-medium text-gray-700'
              >
                {input.name}
              </Label>
              <Input
                type={input.type}
                id={input.id}
                className='font-normal font-epilogue text-md mt-1 block w-full px-3 py-4 border border-gray-300 rounded-none p-8 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl'
                placeholder={input.placeholder}
              />
            </div>
          ))}

          <div className=''>
            <div className='flex items-center text-[14px] lg:text-[16px] justify-start gap-3 cursor-pointer group'>
              <FilterTick
                key={String(check)}
                defaultChecked={check}
                onChange={setCheck}
              />
              <div className='flex items-center gap-1 transition-colors group-hover:text-indigo-600'>
                <span
                  className='text-slate-600'
                  onClick={() => {
                    setCheck(!check);
                  }}
                >
                  Remember me
                </span>
              </div>
            </div>
          </div>

          <button className='w-full mt-2 cursor-pointer py-4 bg-indigo-600 text-white font-epilogue font-medium rounded-none hover:bg-indigo-700 transition duration-300'>
            Sign In
          </button>

          <div className='mt-4'>
            <p className='text-left font-epilogue text-md text-gray-600'>
              Don&apos;t have an account?{" "}
              <Link
                href='/sign-up'
                className='text-indigo-600 font-semibold hover:text-indigo-700'
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

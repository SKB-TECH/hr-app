import Separator from "@/components/common/auth/Separetor";
import TabsUserLevel from "@/components/common/auth/TabsUserLevel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

interface FormGroup {
  id: string;
  type: string;
  name: string;
  placeholder: string;
}

export default function SignUpPage() {
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
    <main className='flex flex-col flex-1 p-8'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center gap-5 mx-auto'>
        <TabsUserLevel />

        <h1 className='text-3xl font-epilogue font-extrabold font-heading font-3xl text-center'>
          Get more opportunities
        </h1>

        <Separator text='Or sign up with email' />

        <div className='w-full'>
          <button className='font-epilogue font-semibold w-full bg-none border rounded-none p-4 py-4 text-indigo-500 cursor-pointer flex flex-row items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 transition duration-300'>
            <Image
              width={20}
              height={20}
              src='/images/google.svg'
              alt='Google'
              className='w-6 h-6'
            />
            Sign up with Google
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

          <button className='w-full mt-2 cursor-pointer py-4 bg-indigo-600 text-white font-epilogue font-medium rounded-none hover:bg-indigo-700 transition duration-300'>
            Continue
          </button>

          <div className='mt-4'>
            <p className='text-left font-epilogue text-md text-gray-600'>
              Already have an account?{" "}
              <Link
                href='/sign-in'
                className='text-indigo-600 font-semibold hover:text-indigo-700'
              >
                Login
              </Link>
            </p>
          </div>

          <div className=''>
            <p className='text-left font-epilogue text-md text-gray-600'>
              By clicking &apos;Continue&apos;, you acknowledge that you have
              read and accept the{" "}
              <Link
                href='#/terms'
                className='text-indigo-600 hover:text-indigo-700'
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href='#/privacy'
                className='text-indigo-600 hover:text-indigo-700'
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
}

export default function InputField({ label, type, name }: InputFieldProps) {
  return (
    <div>
      <Label htmlFor={name} className='block text-gray-700 font-medium mb-3'>
        {label}
      </Label>

      <Input
        placeholder={label}
        id={name}
        name={name}
        type={type}
        className='w-full h-14 px-4 border border-gray-200 rounded-md bg-white outline-none focus:ring-2 focus:ring-[#40EBC7] focus:border-transparent'
      />
    </div>
  );
}

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
}

export default function InputField({ label, type, name }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-3">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        className="w-full h-14 px-4 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-[#40EBC7] focus:border-transparent"
      />
    </div>
  );
}

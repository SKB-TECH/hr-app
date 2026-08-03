interface RadioOptionProps {
  name: string;
  value: string;
  title: string;
  description: string;
  defaultChecked?: boolean;
}

function RadioOption({
  name,
  value,
  title,
  description,
  defaultChecked,
}: RadioOptionProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="mt-1 w-5 h-5 accent-[#4640DE]"
      />

      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </label>
  );
}
export default RadioOption;

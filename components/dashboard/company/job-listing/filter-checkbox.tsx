import { Check } from "lucide-react";

function FilterCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all border shrink-0
        ${checked ? "bg-indigo-600 border-indigo-600" : "bg-white border-slate-200 hover:border-indigo-300"}`}
    >
      {checked && <Check size={12} className="text-white stroke-[3px]" />}
    </div>
  );
}
export default FilterCheckbox
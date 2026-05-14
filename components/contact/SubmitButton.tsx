import { ArrowRight } from "lucide-react";

export default function SubmitButton() {
  return (
    <button
      type="submit"
      className="inline-flex items-center gap-6 bg-[#40EBC7] hover:bg-[#32dcb9] text-[#0D2145] font-medium px-8 py-4 transition-colors"
    >
      <span>Submit</span>
      <ArrowRight size={20} strokeWidth={2.5} />
    </button>
  );
}

import { TbFilter2 } from "react-icons/tb";

export default function FilterButton() {
  return (
    <button
      className="
      flex
      h-12
      items-center
      gap-2
      border
      border-neutral-20
      px-5
      transition
      cursor-pointer
      "
    >
      <TbFilter2 className="h-5 w-5" />
      Filter
    </button>
  );
}

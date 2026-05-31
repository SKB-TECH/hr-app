import Image from "next/image";

function MobileFilterButton({
  setShowMobileFilters,
}: {
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => setShowMobileFilters((prev) => !prev)}
      className="flex items-center justify-center md:hidden mb-4 gap-2 font-clash font-medium text-neutral-100 text-[16px] p-4 border border-brand-light-neutral"
    >
      <Image src="/filter.png" alt="filter icon" width={20} height={20} />
      <p>More Filters</p>
    </div>
  );
}

export default MobileFilterButton;

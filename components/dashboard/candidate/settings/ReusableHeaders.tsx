export interface NavigationItem<T extends string> {
  id: number;
  title: T;
}

interface ReusableHeadersProps<T extends string> {
  currentTab: T;
  setCurrentTab: React.Dispatch<React.SetStateAction<T>>;
  navigations: NavigationItem<T>[];
}

function ReusableHeaders<T extends string>({
  currentTab,
  setCurrentTab,
  navigations,
}: ReusableHeadersProps<T>) {
  return (
    <nav className="flex space-x-4 border-b border-gray-300 overflow-x-auto scrollbar-hide">
      {navigations.map((item) => (
        <div
          key={item.id}
          onClick={() => setCurrentTab(item.title)}
          className={`relative  cursor-pointer px-1 font-medium text-[15px] font-epilogue tracking-wide transition-all duration-300 ${
            currentTab === item.title ? "font-semibold" : "text-neutral-60"
          }`}
        >
          <p
            className={`py-2 mt-2 max-sm:tracking-tight font-medium max-md:text-md text-nowrap  capitalize transition-colors duration-300 ${
              currentTab === item.title
                ? "text-neutral-100"
                : "text-neutral-60 hover:text-neutral-100"
            }`}
          >
            {item.title}
          </p>

          <span
            className={`absolute bottom-0 left-0 h-1 rounded-t-full bg-brand transition-all duration-300 ${
              currentTab === item.title ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>
      ))}
    </nav>
  );
}

export default ReusableHeaders;

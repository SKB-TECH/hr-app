import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";

function SettingsLoginDetails() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[16px] font-epilogue font-semibold text-neutral-100">
          Basic Information
        </h1>
        <p className="text-[15px] font-epilogue text-gray-500 mt-1">
          This is login information that you can update anytime.
        </p>
      </div>

      <hr className="border-gray-200 mb-8" />

      <UpdateEmail />

      <hr className="border-gray-200 mb-8" />

      <UpdatePassword />
      <hr className="border-gray-200 mb-8" />
      {/* Close Account */}
      <div className="flex justify-start md:justify-end ">
        <button className="flex items-center gap-2 text-sm font-semibold text-[#FF6550] hover:text-[#e0503c] transition-colors">
          Close Account
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="9" stroke="#FF6550" strokeWidth="1.5" />
            <path
              d="M12 8V12"
              stroke="#FF6550"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="0.75" fill="#FF6550" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SettingsLoginDetails;

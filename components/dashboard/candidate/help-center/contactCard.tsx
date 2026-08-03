import React from 'react'

export const ContactCard = () => {
  return (
    <div className="mt-5 md:mt-30">
      {/* Contact card */}
      <div
        className="p-5 text-white
    bg-[url('/logo/helpBg.png')]
    bg-cover bg-center bg-no-repeat"
      >
        <h3 className="mb-2 text-lg font-semibold text-white">
          Didn&apos;t find what you were looking for?
        </h3>

        <p className="mb-5 text-sm text-[#F8F8FD] font-epilogue">
          Contact our customer service
        </p>

        <button className="bg-white px-5 py-2 text-sm font-semibold text-[#4640DE] transition hover:bg-gray-100">
          Contact Us
        </button>
      </div>
    </div>
  );
}

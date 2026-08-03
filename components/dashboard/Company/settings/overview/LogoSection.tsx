function LogoSection() {
  return (
    <div className="flex max-lg:flex-col  gap-16 mb-8">
      <div className="md:w-[70%] lg:w-60 shrink-0">
        <h2 className="text-[16px]  font-semibold text-neutral-100">
          Profile Photo
        </h2>
        <p className="text-[15px] leading-relaxed font-epilogue text-gray-500 mt-1">
          This image will be shown publicly as Company logo.
        </p>
      </div>

      {/* <UploadFile setValue={setValue} /> */}
    </div>
  );
}

export default LogoSection;

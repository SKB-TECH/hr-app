function ReusableHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full relative flex-1 overflow-hidden bg-[#132745]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/heroImage.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.35,
          }}
        />
        <div className="absolute inset-0 bg-[#132745]/70" />
      </div>
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-6 py-16 md:px-12">
        {children}
      </div>
    </section>
  );
}

export default ReusableHero;

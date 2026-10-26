function SharedCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#D6DDEB] rounded-none p-5 sm:p-6 bg-white hover:border-[#4640DE] hover:shadow-[0_12px_32px_rgba(70,64,222,0.08)] transition-all duration-300">
      {children}
    </div>
  );
}

export default SharedCard;

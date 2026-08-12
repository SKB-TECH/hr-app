function SharedCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-brand-light-neutral rounded-sm space-y-1 p-5 hover:shadow-sm transition-shadow  bg-white">
      {children}
    </div>
  );
}

export default SharedCard;

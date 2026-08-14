import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

function CardWrapper({ children, className }: Props) {
  return (
    <div className={`p-4 border border-brand-light-neutral  ${className}`}>
      {children}
    </div>
  );
}

export default CardWrapper;

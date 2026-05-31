import Navbar from "@/components/common/navbar/Navbar";
import { ReactNode } from "react";

export default function LayoutPages({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

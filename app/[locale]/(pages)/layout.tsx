import Navbar from "@/components/common/navbar/Navbar";
import { Epilogue } from "next/font/google";
import { ReactNode } from "react";


const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function LayoutPages({ children }: { children: ReactNode }) {
  return (
    <div className={epilogue.className}>
      <Navbar />
      {children}
    </div>
  );
}
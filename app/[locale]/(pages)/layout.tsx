import Navbar from "@/components/common/navbar/Navbar";
import { Epilogue } from "next/font/google";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function LayoutPages({ children }: { children: React.ReactNode }) {
  return (
    <div className={epilogue.className}>
      <Navbar />
      {children}
    </div>
  );
}
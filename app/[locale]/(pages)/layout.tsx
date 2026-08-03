import { ReactNode } from "react";
import NavbarComponentLandingPage from "@/components/common/navbar/Navbar";
import Footer from "@/components/platform/landing/footer/Footer";

export default function LayoutPages({ children }: { children: ReactNode }) {
  return (
    <>
      <NavbarComponentLandingPage />
      {children}
      <Footer />
    </>
  );
}

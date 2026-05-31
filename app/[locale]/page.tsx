import HomePage from "@/app/[locale]/(pages)/page";
import NavbarComponentLandingPage from "@/components/common/navbar/Navbar";
import Footer from "@/components/landing/footer/Footer";

export default function LandingPage() {
  return (
    <>
      <NavbarComponentLandingPage />
      <HomePage />
      <Footer />
    </>
  );
}

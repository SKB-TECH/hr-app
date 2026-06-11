import HomePage from "@/app/[locale]/(pages)/page";
import NavbarComponentLandingPage from "@/components/common/navbar/Navbar";
import Footer from "@/components/pages/landing/footer/Footer";

export default function LandingPage() {
  return (
    <main>
      <NavbarComponentLandingPage />
      <HomePage />
      <Footer />
    </main>
  );
}

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="bg-[#f7f7f7] ">
      <div className="px-6 py-20 md:px-12 max-w-7xl  mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}

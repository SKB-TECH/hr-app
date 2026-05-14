import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

export default function ContactForm() {
  return (
    <form className="space-y-8">
      <InputField label="Full Name" type="text" name="fullName" />
      <InputField label="Email" type="email" name="email" />
      <InputField label="Contact Number" type="tel" name="phone" />

      <div className="pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}

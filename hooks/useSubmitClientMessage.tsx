import { useState } from "react";
import { ContactFormData } from "../types/contact";
import { sendContactForm } from "../services/contact.service";

const useSubmitClientMessage = (data: ContactFormData) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    setError(null);

    try {
      await sendContactForm(data);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setisLoading(false);
    }
  };
  return { isLoading, error, success, submitForm };
};

export default useSubmitClientMessage;

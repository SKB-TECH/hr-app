import api from "../lib/axios";
import type { ContactFormData } from "../types/contact";

export const sendContactForm = async (formData: ContactFormData) => {
  try {
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Unable to send your message.");
    }
    throw new Error("An unexpected error occurred. Please try again later.");
  }
};

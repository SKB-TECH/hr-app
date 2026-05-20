import api from "../lib/axios";
import type { ContactFormData } from "../types/contact";

export const sendContactForm = async (formData: ContactFormData) => {
  try {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.message ||
      !formData.phone
    ) {
      throw new Error("Please fill in all required fields.");
    }
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Unable to send your message.");
    }
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred. Please try again later.",
    );
  }
};

import axios from "axios";
import api from "../lib/axios";
import type { ContactFormData } from "@/types/types";

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
    if (axios.isAxiosError(error) && error.response) {
      if (!error.response) {
        throw new Error(
          "Network error. Please check your connection and try again.",
        );
      }
      if (error.response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }
      throw new Error(
        "Something went wrong while sending your message. Please try again later.",
      );
    }
    if (error instanceof Error) {
      throw new Error(error.message || "Unable to send your message.");
    }

    throw new Error(
      "Something went wrong while sending your message. Please try again later.",
    );
  }
};

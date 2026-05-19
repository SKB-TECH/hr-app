import axios from "axios";
import api from "../lib/axios";

export const fetchJob = async (jobQuery: string) => {
  try {
    const response = await api.get("/posts", {
      params: { title_like: jobQuery },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Unable to get jobs.");
    }
    throw new Error("An unexpected error occurred. Please try again later.");
  }
};

export const getAllJobs = async () => {
  try {
    const response = await api.get("/posts", {
      params: {
        _limit: 10,
      },
    });
    const data = response.data.map((post: any) => ({
      id: post.id.toString(),
      ref: `#FDMAN2038-${post.id}`,
      title:
        post.title
          .split(" ")
          .slice(0, 2)
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ") + " Developer",
      location: "Manchester, UK",
      salary: "£40000 - £55000 per annum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam.",
    }));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Unable to get jobs.");
    }
    throw new Error(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please try again later.",
    );
  }
};

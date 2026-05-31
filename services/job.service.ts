import axios from "axios";
import api from "../lib/axios";
import type { JobDetail, PaginationParams } from "@/types/types";

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

export const getAllJobs = async (params: PaginationParams = {}) => {
  try {
    const { page = 1, limit = 10, search = "" } = params;

    const response = await api.get("/posts", {
      params: {
        _page: page,
        _limit: limit,
        ...(search && { title_like: search }),
      },
    });
    const totalItems = parseInt(response.headers["x-total-count"] || "0");
    const totalPages = Math.ceil(totalItems / limit);

    const data = response.data.map((post: { id: number; title: string }) => ({
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
      description: `Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit. Consectetur neque nostrum consequuntur
                      optio, nam eveniet. Voluptates dolorum illum rerum ad
                      nihil cumque eum iste ipsum commodi. Officia nam maxime
                      quae? Lorem ipsum, dolor sit amet consectetur adipisicing
                      elit. Consectetur neque nostrum consequuntur optio, nam
                      eveniet. Voluptates dolorum illum rerum ad nihil cumque
                      eum iste ipsum commodi. Officia nam maxime quae?`,
    }));

    return {
      data,
      totalItems,
      currentPage: page,
      totalPages,
      itemsPerPage: limit,
    };
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

export const getJobById = async (id: string): Promise<JobDetail> => {
  try {
    const response = await api.get(`/posts/${id}`);
    const job = response.data;
    return {
      id: job.id.toString(),
      ref: `#FDMAN2038-${job.id}`,
      title: job.title.split(" ")[0] + " Developer",
      location: "Manchester, UK",
      salary: "£40000 - £55000 per annum",
      jobType: "Full-time",
      companyLine: "Amazon",
      descriptionParagraphs: [
        "As a core member of our engineering team, you will play a pivotal role in shaping the technical direction of our customer-facing platforms. You will be responsible for developing high-performance, accessible, and scalable web applications using the latest industry standards and modern frameworks.",
        "You will work in an agile environment, collaborating with product owners and UX designers to create seamless user journeys. Your contribution will span the entire development stack, from optimizing front-end performance to designing robust API integrations and ensuring high code coverage through automated testing.",
        "The ideal candidate brings several years of experience in full-stack development, with a deep proficiency in TypeScript and React. We are looking for a problem-solver who enjoys tackling complex architectural puzzles and is eager to mentor others while continuously improving their own technical expertise.",
        "Our office in Manchester provides a collaborative and creative space where innovation is encouraged. We offer a competitive benefits package, including flexible work arrangements, professional development budgets, and a focus on maintaining a healthy work-life balance.",
      ],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Network error. Please check your connection and try again.",
        );
      }
      throw new Error(
        error.response?.data.message || "Unable to get job details.",
      );
    }
    throw new Error("An unexpected error occurred. Please try again later.");
  }
};

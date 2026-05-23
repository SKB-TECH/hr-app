export interface Job {
  id: string;
  ref: string;
  title: string;
  location: string;
  salary: string;
  description: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface JobDetail {
  id: string;
  ref: string;
  title: string;
  location: string;
  salary: string;
  jobType: string;
  companyLine: string;
  descriptionParagraphs: string[];
}

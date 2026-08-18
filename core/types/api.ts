export type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type PaginatedEnvelope<T> = ApiEnvelope<T[]> & {
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

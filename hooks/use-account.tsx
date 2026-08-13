"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";

export interface UseDeleteAccountOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useDeleteAccount(options?: UseDeleteAccountOptions) {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const deleteAccount = async (reason?: string) => {
    setIsPending(true);
    setIsError(false);
    setError(null);

    try {
      // 1. Send DELETE request to account API endpoint
      //TODO: change the api endpoin when backend is available
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete account");
      }
      options?.onSuccess?.();
      const targetRoute = options?.redirectTo ?? "/";

      router.push(targetRoute);
    } catch (err) {
      const errorObj =
        err instanceof Error ? err : new Error("Failed to delete account");
      setIsError(true);
      setError(errorObj);
      options?.onError?.(errorObj);
    } finally {
      setIsPending(false);
    }
  };

  return {
    deleteAccount,
    isPending,
    isError,
    error,
  };
}

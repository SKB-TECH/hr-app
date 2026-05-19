const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";

const api = {
  async post<T>(url: string, payload: unknown) {
    const response = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        responseData?.message || response.statusText || "Unable to send your message.",
      );
    }

    return { data: responseData } as { data: T };
  },
};

export default api;

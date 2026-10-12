import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getApiMessage = (response) => {
  const message = response?.data?.message;
  return typeof message === "string" && message.trim() ? message : null;
};

const shouldShowSuccessToast = (method) =>
  ["post", "put", "patch", "delete"].includes(method);

api.interceptors.response.use(
  (response) => {
    const method = response.config?.method?.toLowerCase();
    if (shouldShowSuccessToast(method) && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("app:toast", {
          detail: {
            type: "success",
            message: getApiMessage(response) || "Request completed successfully.",
          },
        })
      );
    }
    return response;
  },
  (error) => {
    const url = error.config?.url || "";
    const isExpectedUnauthenticatedCheck =
      error.response?.status === 401 && /\/auth\/me(?:\?|$)/.test(url);

    if (!isExpectedUnauthenticatedCheck && typeof window !== "undefined") {
      const message =
        getApiMessage(error.response) ||
        (error.response
          ? `Request failed (${error.response.status}).`
          : "Unable to reach the server. Check your connection and try again.");

      window.dispatchEvent(
        new CustomEvent("app:toast", {
          detail: { type: "error", message },
        })
      );
    }
    return Promise.reject(error);
  }
);

export const getData = (response) => {
  return response?.data?.data;
};

export const getMessage = (
  error,
  fallback = "Something went wrong"
) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
};
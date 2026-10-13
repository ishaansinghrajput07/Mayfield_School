import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const developmentApiUrl = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "";
const apiBaseUrl = configuredApiUrl || developmentApiUrl;
const missingProductionApiUrl =
  import.meta.env.PROD && !configuredApiUrl;

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (missingProductionApiUrl) {
    throw new Error(
      "VITE_API_URL is not configured for production. Set it in Vercel to the deployed backend API URL ending in /api, then redeploy.",
    );
  }

  if (import.meta.env.PROD && /localhost|127\.0\.0\.1/i.test(apiBaseUrl)) {
    throw new Error(
      "VITE_API_URL points to localhost in production. Set it in Vercel to the deployed backend API URL ending in /api, then redeploy.",
    );
  }

  return config;
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
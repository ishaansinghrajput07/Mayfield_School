import { io } from "socket.io-client";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const SOCKET_URL = configuredApiUrl
  ? configuredApiUrl.replace(/\/api\/?$/, "")
  : import.meta.env.DEV
    ? "http://localhost:5000"
    : null;

export const socket = io(SOCKET_URL || window.location.origin, {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = () => {
  if (!SOCKET_URL) {
    throw new Error(
      "VITE_API_URL is not configured for production. Set it in Vercel to the deployed backend API URL ending in /api, then redeploy.",
    );
  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
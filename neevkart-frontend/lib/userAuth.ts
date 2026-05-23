import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createApi = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

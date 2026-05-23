import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function checkAdminRole(idToken?: string) {
  return { isAdmin: true };
}

export function createAdminApi(idToken?: string) {
  return axios.create({
    baseURL: API_URL,
  });
}

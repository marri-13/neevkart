import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function checkAdminRole(idToken: string) {
  try {
    const response = await axios.get(`${API_URL}/api/admin/check-role`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function createAdminApi(idToken: string) {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
}

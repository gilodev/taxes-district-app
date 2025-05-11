import axios from "axios";
import Cookies from "js-cookie";
import { decryptData } from "./authUtils";

const TOKEN_NAME = process.env.NEXT_PUBLIC_NAME_TOKEN as string;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey || "",
  },
});

let authToken: string | null = null;

// Fonction pour récupérer et décrypter le token
const getDecryptedToken = async (): Promise<string | null> => {
  const encryptedToken = Cookies.get(TOKEN_NAME);

  if (!encryptedToken) {
    return null;
  }

  return await decryptData(encryptedToken);
};

axiosAuth.interceptors.request.use(
  async (config) => {
    if (!authToken) {
      authToken = await getDecryptedToken();
    }

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      authToken = null;

      authToken = await getDecryptedToken();

      if (authToken) {
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${authToken}`;
        return axiosAuth(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAuth;

import axios from "axios";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // browser should use relative path
    return "";
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3001}`;
};

const api = axios.create({
  baseURL: `${getBaseUrl()}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Post {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}

export const postsApi = {
  hello: async (text: string) => {
    const response = await api.get(
      `/posts?action=hello&text=${encodeURIComponent(text)}`,
    );
    return response.data as { greeting: string };
  },

  create: async (name: string) => {
    const response = await api.post("/posts", { name });
    return response.data as Post;
  },

  getLatest: async () => {
    const response = await api.get("/posts?action=latest");
    return response.data as Post | null;
  },

  getSecretMessage: async () => {
    const response = await api.get("/posts?action=secret");
    return response.data as { message: string };
  },
};

export default api;

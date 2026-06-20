import axios from "axios";

const API_URL = "";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Attach JWT token on admin requests (client-side only)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");
        const { data } = await axios.post(`/api/auth/refresh`, {
          refreshToken,
        });
        localStorage.setItem("access_token", data.data.accessToken);
        localStorage.setItem("refresh_token", data.data.refreshToken);
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(original);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        if (typeof window !== "undefined") {
          window.location.href = "/admin/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// ── Public API helpers ──────────────────────────────────────────────────────

export const publicApi = {
  getSettings: () =>
    api.get("/api/settings/public").then((r) => r.data.data),

  getServices: (category?: string) =>
    api.get("/api/services", { params: { category } }).then((r) => r.data.data),

  getServiceBySlug: (slug: string) =>
    api.get(`/api/services/${slug}`).then((r) => r.data.data),

  getServiceCategories: () =>
    api.get("/api/services/categories").then((r) => r.data.data),

  getBlogPosts: (params?: { category?: string; tag?: string }) =>
    api.get("/api/blog", { params }).then((r) => r.data.data),

  getBlogPostBySlug: (slug: string) =>
    api.get(`/api/blog/${slug}`).then((r) => r.data.data),

  getSuccessStories: (industry?: string) =>
    api
      .get("/api/success-stories", { params: { industry } })
      .then((r) => r.data.data),

  getSuccessStoryBySlug: (slug: string) =>
    api.get(`/api/success-stories/${slug}`).then((r) => r.data.data),

  getTestimonials: (page?: string) =>
    api.get("/api/testimonials", { params: { page } }).then((r) => r.data.data),

  getTeam: () =>
    api.get("/api/team").then((r) => r.data.data),

  submitEnquiry: (data: EnquiryPayload) =>
    api.post("/api/enquiries", data).then((r) => r.data),
};

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  message?: string;
  sourcePage?: string;
}

// ── Admin API helpers ───────────────────────────────────────────────────────

export const adminApi = {
  login: (email: string, password: string) =>
    api.post("/api/auth/login", { email, password }).then((r) => r.data.data),

  getStats: () =>
    api.get("/api/admin/stats").then((r) => r.data.data),

  getEnquiries: (params?: { status?: string; page?: number }) =>
    api.get("/api/admin/enquiries", { params }).then((r) => r.data.data),
  updateEnquiryStatus: (id: string, status: string) =>
    api.patch(`/api/admin/enquiries/${id}/status`, { status }).then((r) => r.data),

  getServices: () =>
    api.get("/api/admin/services").then((r) => r.data.data),
  createService: (data: unknown) =>
    api.post("/api/admin/services", data).then((r) => r.data.data),
  updateService: (id: string, data: unknown) =>
    api.put(`/api/admin/services/${id}`, data).then((r) => r.data.data),
  deleteService: (id: string) =>
    api.delete(`/api/admin/services/${id}`).then((r) => r.data),

  getBlogPosts: () =>
    api.get("/api/admin/blog").then((r) => r.data.data),
  createBlogPost: (data: unknown) =>
    api.post("/api/admin/blog", data).then((r) => r.data.data),
  updateBlogPost: (id: string, data: unknown) =>
    api.put(`/api/admin/blog/${id}`, data).then((r) => r.data.data),
  deleteBlogPost: (id: string) =>
    api.delete(`/api/admin/blog/${id}`).then((r) => r.data),

  getStories: () =>
    api.get("/api/admin/success-stories").then((r) => r.data.data),
  createStory: (data: unknown) =>
    api.post("/api/admin/success-stories", data).then((r) => r.data.data),
  updateStory: (id: string, data: unknown) =>
    api.put(`/api/admin/success-stories/${id}`, data).then((r) => r.data.data),
  deleteStory: (id: string) =>
    api.delete(`/api/admin/success-stories/${id}`).then((r) => r.data),

  getTestimonials: () =>
    api.get("/api/admin/testimonials").then((r) => r.data.data),
  createTestimonial: (data: unknown) =>
    api.post("/api/admin/testimonials", data).then((r) => r.data.data),
  updateTestimonial: (id: string, data: unknown) =>
    api.put(`/api/admin/testimonials/${id}`, data).then((r) => r.data.data),
  deleteTestimonial: (id: string) =>
    api.delete(`/api/admin/testimonials/${id}`).then((r) => r.data),

  getTeam: () =>
    api.get("/api/admin/team").then((r) => r.data.data),
  createMember: (data: unknown) =>
    api.post("/api/admin/team", data).then((r) => r.data.data),
  updateMember: (id: string, data: unknown) =>
    api.put(`/api/admin/team/${id}`, data).then((r) => r.data.data),
  deleteMember: (id: string) =>
    api.delete(`/api/admin/team/${id}`).then((r) => r.data),

  getSettings: () =>
    api.get("/api/admin/settings").then((r) => r.data.data),
  updateSettings: (data: unknown) =>
    api.put("/api/admin/settings", data).then((r) => r.data.data),
};

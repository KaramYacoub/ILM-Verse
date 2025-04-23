import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authAdmin: null,
  authTeacher: null,
  authStudent: null,
  authParent: null,
  isCheckingAuth: false,

  adminLogin: async (data) => {
    try {
      const response = await axiosInstance.post("admin/staffLogin", data);
      set({ authAdmin: response.data.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  teacherLogin: async (data) => {
    try {
      const response = await axiosInstance.post("teacher/staffLogin", data);
      set({ authTeacher: response.data.data });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  studentLogin: async (data) => {
    try {
      const response = await axiosInstance.post("student/studentLogin", data);
      set({ authStudent: response.data.data });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  parentLogin: async (data) => {
    try {
      const response = await axiosInstance.post("parent/studentLogin", data);
      set({ authParent: response.data.data });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("shared/check");

      if (res.data?.data && res.data?.role) {
        switch (res.data.role) {
          case "admin":
            set({ authAdmin: res.data.data });
            break;
          case "teacher":
            set({ authTeacher: res.data.data });
            break;
          case "student":
            set({ authStudent: res.data.data });
            break;
          case "parent":
            set({ authParent: res.data.data });
            break;
        }
      }
      return res.data;
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({
        authAdmin: null,
        authTeacher: null,
        authStudent: null,
        authParent: null,
      });
      return null;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.post("/shared/logout");
      set({
        authAdmin: null,
        authTeacher: null,
        authStudent: null,
        authParent: null,
      });
      return res.data;
    } catch (error) {
      console.error("Logout Error:", error.response?.data?.message);
      throw error;
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

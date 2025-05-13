// src/store/ParentsStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const useParentsStore = create((set) => ({
  students: [],
  courses: [],
  grades: [],
  absence: [],
  reports: [],
  count: 0,
  dates: [],
  loading: false,
  error: null,

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/parent/students");
      set({ students: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load students",
        loading: false,
      });
    }
  },

  getCoursesForStudent: async (studentId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/parent/courses/${studentId}`);
      set({
        courses: response.data.data, // assuming response structure
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch courses",
        loading: false,
      });
    }
  },

  fetchShowGrades: async (studentId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/parent/marks/${studentId}`);
      set({
        grades: response.data.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load grades",
        loading: false,
      });
    }
  },

  fetchShowAbsences: async (studentId, sectionId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/parent/absence/${studentId}/${sectionId}`
      );

      set({
        absence: {
          count: response.data.absenceCount,
          dates: response.data.absenceDates,
        },
        loading: false,
      });
    } catch (error) {
      console.error("Absence fetch error:", error);
      set({
        error: error.response?.data?.message || "Failed to load absences",
        loading: false,
        absence: { count: 0, dates: [] }, // Reset on error
      });
    }
  },

  fetchShowReports: async (studentId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/parent/reports/${studentId}`);
      set({
        reports: response.data.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load reports",
        loading: false,
      });
    }
  },
}));

export default useParentsStore;

// useStudentStore.js (Zustand store for student-related data)
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const useStudentStore = create((set) => ({
  courses: [],
  course: [],
  courseContent: [],
  grades: [],
  unitDetails: null,
  unitContent: null,
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/student/courses");
      set({ courses: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load courses",
        loading: false,
      });
    }
  },

  fetchCourseByID: async (courseId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/student/course/${courseId}`);
      set({ course: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load course",
        loading: false,
      });
    }
  },

  fetchCourseUnits: async (courseId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/student/course/${courseId}/units`
      );
      set({ courseContent: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load units",
        loading: false,
      });
    }
  },

  fetchUnitContent: async (courseId, unitId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/course/${courseId}/${unitId}/content`
      );
      set({
        unitContent: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load unit",
        loading: false,
      });
    }
  },

  fetchShowGrades: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/student/grades");
      set({ grades: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load grades",
        loading: false,
      });
    }
  },
}));

export default useStudentStore;

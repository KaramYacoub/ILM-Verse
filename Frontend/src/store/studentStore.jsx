import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const useStudentStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,
  fetchCourses: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/student/courses");
      set({ courses: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },
  fetchCourseContent: async (courseId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/student/course/${courseId}`);
      set({ courseContent: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },
}));

export default useStudentStore;

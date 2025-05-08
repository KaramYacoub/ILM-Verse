import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useTeacherStore = create((set) => ({
  coursesForTeacher: [],

  getCoursesForTeacher: async () => {
    try {
      const response = await axiosInstance.get("/teacher/courses/");
      set({ coursesForTeacher: response.data.data });
    } catch (error) {
      console.log(
        "Error fetching courses: ",
        error.response?.data?.error || error.message
      );
    }
  },
}));

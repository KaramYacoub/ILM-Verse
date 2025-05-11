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
  TeacherGetAssignment: async (course_id) => {
    try {
      const response = await axiosInstance.get(
        `/teacher/course/${course_id}/assigments`
      );
      return response.data.data;
    } catch (error) {
      console.log(
        "Error fetching assignments: ",
        error.response?.data?.error || error.message
      );
    }
  },

  TeacherAddAssignment: async (course_id, assignmentData) => {
    try {
      const response = await axiosInstance.post(
        `/teacher/course/${course_id}/addassigment`,
        assignmentData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response; // Add this line
    } catch (error) {
      throw error; // Re-throw the error
    }
  },

  TeacherShowSubmition: async (course_id, assignment_id) => {
    try {
      const response = await axiosInstance.get(
        `/teacher/course/${course_id}/assigments/${assignment_id}`
      );
      return response.data.data;
    } catch (error) {
      console.log(
        "Error fetching submissions: ",
        error.response?.data?.error || error.message
      );
    }
  },
}));

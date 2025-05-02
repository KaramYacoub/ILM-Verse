import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useCourseStore = create((set) => ({
  courses: [],
  teachersBySection: [],

  getALlCourses: async () => {
    try {
      const response = await axiosInstance.get("/admin/course");
      set({ courses: response.data.data.filteredCourses });
      return response.data.data.filteredCourses;
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  },

  getStudentsInCourse: async (course_id) => {
    try {
      const response = await axiosInstance.get(
        `/admin/course/getstudents/${course_id}`
      );
      return response.data.data;
    } catch (error) {
      console.log(
        "Error fetching students:",
        error.response?.data?.error || error.message
      );
      throw error;
    }
  },

  involveStudents: async (course_id) => {
    try {
      const response = await axiosInstance.post("/admin/course/involve", {
        course_id,
      });
      return response.data;
    } catch (error) {
      console.log("Error involving students:", error);
    }
  },

  getTeacherBySection: async (grad_id, section_id) => {
    try {
      const response = await axiosInstance.get(
        `/admin/addition/course/grades/${grad_id}/${section_id}`
      );
      set({ teachersBySection: response.data.data });
      return response.data;
    } catch (error) {
      console.log("Error fetching teachers by section:", error.message);
    }
  },

//   getAllGrades: async () => {
//     try {
//       const response = await axiosInstance.get("/admin/addition/course/grades");
//       return response.data.data.filteredCourses;
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   },

//   getAllSections: async (grad_id) => {
//     try {
//       const response = await axiosInstance.get(
//         `/admin/addition/course/grades/${grad_id}`
//       );
//       return response.data.data.filteredCourses;
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useCourseStore = create((set) => ({
  courses: [],
  teachersBySection: [],
  teachersByDepartment: [],

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

  getTeachersByDepartment: async (course_id) => {
    try {
      const response = await axiosInstance.get(
        `/admin/course/getteachersbycourse/${course_id}`
      );
      set({ teachersByDepartment: response.data.data });
      return response.data.data;
    } catch (error) {
      console.log("Error fetching teachers:", error.message);
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

  updateTeacher: async (course_id, newTeacher_id) => {
    try {
      const response = await axiosInstance.patch(
        "/admin/course/changeteacher",
        {
          course_id,
          newTeacher_id,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error updating teacher:", error);
    }
  },

  getCourseUnits: async (course_id) => {
    try {
      const response = await axiosInstance.get(`/admin/course/${course_id}`);
      return response.data.data;
    } catch (error) {
      console.log(
        "Error fetching course units: ",
        error.response?.data?.error || error.message
      );
    }
  },

  addCourseUnit: async (course_id, { unit_name, unit_description }) => {
    try {
      const response = await axiosInstance.post("/admin/course/addunit", {
        course_id,
        unit_name,
        unit_description,
      });
      return response.data.data;
    } catch (error) {
      console.log(
        "Error in add unit: ",
        error.response?.data?.error || error.message
      );
    }
  },
}));

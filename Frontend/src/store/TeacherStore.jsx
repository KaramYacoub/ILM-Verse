import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useTeacherStore = create((set) => ({
  coursesForTeacher: [],
  course: [],
  units: [],
  unitContent: [],

  // add report
  addReport: async (course_id, student_id, title, description, date) => {
    try {
      const response = await axiosInstance.post(
        `/teacher/course/${course_id}/addnewreport`,
        {
          course_id,
          student_id,
          title,
          description,
          date,
        }
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error adding report from teacher: ",
        error.response?.data?.error || error.message
      );
    }
  },

  addCourseUnit: async (course_id, { unit_name, unit_description }) => {
    try {
      const response = await axiosInstance.post(
        `/teacher/course/${course_id}/addunit`,
        {
          course_id,
          unit_name,
          unit_description,
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(
        "Error in add unit: ",
        error.response?.data?.error || error.message
      );
    }
  },

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

  getCourseByID: async (course_id) => {
    try {
      const response = await axiosInstance.get(`/teacher/course/${course_id}`);
      return response.data.data;
    } catch (error) {
      console.log(
        "Error fetching course: ",
        error.response?.data?.error || error.message
      );
    }
  },

  getCourseUnits: async (course_id) => {
    try {
      const response = await axiosInstance.get(
        `/teacher/course/${course_id}/units`
      );
      set({ units: response.data.data });
      return response.data.data;
    } catch (error) {
      console.log(
        "Error fetching course units: ",
        error.response?.data?.error || error.message
      );
    }
  },

  getUnitContent: async (unit_id) => {
    try {
      const response = await axiosInstance.get(
        `teacher/course/media/${unit_id}`
      );
      set({ unitContent: response.data.data });
      return response.data;
    } catch (error) {
      console.log(
        "Error fetching course units: ",
        error.response?.data?.error || error.message
      );
    }
  },

  addUnitContent: async (unit_id, formData) => {
    try {
      const response = await axiosInstance.post(
        `teacher/course/${unit_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error adding media: ",
        error.response?.data?.error || error.message
      );
      throw error;
    }
  },
  
  deleteUnitContent: async (unit_id, media_id) => {
    try {
      const response = await axiosInstance.delete(
        `teacher/course/media/${unit_id}/${media_id}`
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error deleting media from a unit: ",
        error.response?.data?.error || error.message
      );
    }
  },

  getStudentsInCourse: async (course_id) => {
    try {
      const response = await axiosInstance.get(
        `/teacher/course/${course_id}/students`
      );
      return response.data.data.students;
    } catch (error) {
      console.log(
        "Error fetching students in course: ",
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
      console.log(
        "Error adding assignment: ",
        error.response?.data?.error || error.message
      );
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

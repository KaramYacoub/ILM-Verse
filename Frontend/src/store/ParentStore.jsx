import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const useParentsStore = create((set) => ({
  students: [],
  courses: [],
  grades: [],
  absence: [],
  reports: [],
  courseContent: [],
  course: [],
  unitDetails: null,
  unitContent: null,
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

  fetchCourseByID: async (course_id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/parent/course/${course_id}`);
      set({ course: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load course",
        loading: false,
      });
    }
  },

  fetchCourseAllUnits: async (course_id) => {
    if (!course_id) {
      set({ error: "Course ID is missing", loading: false });
      console.error("Course ID is undefined");
      return;
    }
    try {
      set({ loading: true });
      const response = await axiosInstance.get(
        `/parent/course/${course_id}/allunits`
      );
      set({ courseContent: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load units",
        loading: false,
      });
    }
  },
  fetchUnitContent: async (course_id, unit_id) => {
    if (!course_id || !unit_id) {
      set({ error: "Course ID or Unit ID is missing", loading: false });
      console.error("Course ID or Unit ID is undefined");
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/parent/course/${course_id}/${unit_id}/content`
      );
      set({ unitContent: response.data.data });
      return response.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load unit content",
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

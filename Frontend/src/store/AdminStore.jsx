import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAdminStore = create((set) => ({
  isFetchingStudents: false,
  isFetchingTeachers: false,
  isFetchingParents: false,
  isFetchingAdmins: false,

  isChangingPassword: false,

  addAdmin: async (admin) => {
    try {
      const formattedAdmin = {
        first_name: admin.firstName,
        last_name: admin.lastName,
        email: admin.email,
        password: admin.password,
      };

      const response = await axiosInstance.post(
        "admin/addition/admin",
        formattedAdmin
      );
      return response.data;
    } catch (error) {
      console.log("Error adding admin:", error);
    }
  },

  addStudent: async (student) => {
    try {
      const formattedStudent = {
        first_name: student.firstName,
        last_name: student.lastName,
        parent_id: student.parent_id,
        grade_id: student.grade_id,
        section_id: student.section_id,
        password: student.password,
      };

      const response = await axiosInstance.post(
        "admin/addition/student",
        formattedStudent
      );
      return response.data;
    } catch (error) {
      console.log("error adding student:", error.message);
    }
  },

  addParent: async (parent) => {
    try {
      const formattedParent = {
        first_name: parent.firstName,
        last_name: parent.lastName,
        phone: parent.phone,
        password: parent.password,
      };

      const response = await axiosInstance.post(
        "admin/addition/parent",
        formattedParent
      );
      return response.data;
    } catch (error) {
      console.log("Error adding parent:", error);
    }
  },

  addTeacher: async (teacher) => {
    try {
      const formattedTeacher = {
        first_name: teacher.firstName,
        last_name: teacher.lastName,
        email: teacher.email,
        password: teacher.password,
        section_id: teacher.section_id,
        dept_id: teacher.dept_id,
      };

      const response = await axiosInstance.post(
        "admin/addition/teacher",
        formattedTeacher
      );
      return response.data;
    } catch (error) {
      console.log("Error adding teacher:", error);
    }
  },

  getAllAdmins: async () => {
    try {
      set({ isFetchingAdmins: true });
      const response = await axiosInstance.get("/admin/getAdmins");
      return response.data;
    } catch (error) {
      console.log("error fetching parents:", error.message);
    } finally {
      set({ isFetchingAdmins: false });
    }
  },

  getAllStudents: async () => {
    try {
      set({ isFetchingStudents: true });
      const response = await axiosInstance.get("/admin/getStudents");
      return response.data;
    } catch (error) {
      console.log("error fetching students:", error.message);
    } finally {
      set({ isFetchingStudents: false });
    }
  },

  getAllParents: async () => {
    try {
      set({ isFetchingParents: true });
      const response = await axiosInstance.get("/admin/getParents");
      return response.data;
    } catch (error) {
      console.log("error fetching parents:", error.message);
    } finally {
      set({ isFetchingParents: false });
    }
  },

  getAllTeachers: async () => {
    try {
      set({ isFetchingTeachers: true });
      const response = await axiosInstance.get("/admin/getTeachers");
      return response.data;
    } catch (error) {
      console.log("error fetching parents:", error.message);
    } finally {
      set({ isFetchingTeachers: false });
    }
  },

  getAllGrades: async () => {
    try {
      const response = await axiosInstance.get("/admin/addition/course/grades");
      return response.data;
    } catch (error) {
      console.log("error fetching grades:", error.message);
    }
  },

  getAllSections: async (gradID) => {
    try {
      const response = await axiosInstance.get(
        `/admin/addition/course/grades/${gradID}`
      );
      return response.data;
    } catch (error) {
      console.log("error fetching sections:", error.message);
    }
  },

  deleteStudent: async (studentId) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete/student/${studentId}`
      );
      return response.data;
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  },

  deleteParent: async (parentId) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete/parent/${parentId}`
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error deleting parent:",
        error.response?.data?.error || error.message
      );
    }
  },

  deleteTeacher: async (teacherId) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete/teacher/${teacherId}`
      );
      return response.data;
    } catch (error) {
      console.log("Error deleting teacher:", error);
    }
  },

  deleteAdmin: async (AdminId) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete/admin/${AdminId}`
      );
      return response.data;
    } catch (error) {
      console.log("Error deleting teacher:", error);
    }
  },

  addEvent: async (formData) => {
    try {
      const response = await axiosInstance.post("/admin/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding event:", error);
    }
  },

  deleteEvent: async (event_id) => {
    try {
      console.log("Deleting event with ID:", event_id);
      await axiosInstance.delete(`/admin/events/${event_id}`, {
        data: { event_id },
      });
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  },

  changeUserPassword: async ({ userType, identifier, newPassword }) => {
    try {
      const response = await axiosInstance.patch("/admin/update/password", {
        userType,
        identifier,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.log(
        "Error changing password:",
        error.response?.data?.error || error.message
      );
      throw error;
    }
  },
}));

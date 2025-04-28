import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAdminStore = create(() => ({
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
      console.error("Error adding admin:", error);
      throw error;
    }
  },

  addStudent: async (student) => {
    try {
      const formattedStudent = {
        first_name: student.firstName,
        last_name: student.lastName,
        section_id: student.section_id,
        parent_id: student.parent_id,
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
      console.error("Error adding parent:", error);
      throw error;
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
      console.error("Error adding teacher:", error);
      throw error;
    }
  },
}));

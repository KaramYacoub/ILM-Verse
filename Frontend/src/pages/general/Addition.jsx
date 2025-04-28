import GeneralNav from "../../components/general/GeneralNav";
import { useState } from "react";
import { useAdminStore } from "../../store/AdminStore";
import AdminForm from "../../components/general/addition/AdminForm";
import StudentForm from "../../components/general/addition/StudentForm";
import TeacherForm from "../../components/general/addition/TeacherForm";
import ParentForm from "../../components/general/addition/ParentForm";

function Addition() {
  const [activeTab, setActiveTab] = useState("students");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({ message: "", type: "" });
  const { addAdmin, addStudent, addParent, addTeacher } = useAdminStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    try {
      if (activeTab === "admins") {
        await addAdmin(formData);
        setStatus({
          message: "Admin added successfully!",
          type: "success",
        });
      } else if (activeTab === "students") {
        await addStudent(formData);
        setStatus({
          message: "Student added successfully!",
          type: "success",
        });
      } else if (activeTab === "parents") {
        await addParent(formData);
        setStatus({
          message: "Parent added successfully!",
          type: "success",
        });
      } else if (activeTab === "teachers") {
        await addTeacher(formData);
        setStatus({
          message: "Teacher added successfully!",
          type: "success",
        });
      }

      setFormData({});
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        message: error.response?.data?.error || "Something went wrong!",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Administrator</h1>
          <h2 className="text-2xl font-semibold">Add New User</h2>
        </div>

        <div className="tabs tabs-boxed bg-gray-100 p-1 rounded-lg mb-8">
          {["students", "parents", "teachers", "admins"].map((tab) => (
            <button
              key={tab}
              className={`tab ${
                activeTab === tab ? "tab-active bg-primary text-white" : ""
              }`}
              onClick={() => {
                setActiveTab(tab);
                setFormData({});
                setStatus({ message: "", type: "" });
              }}
              type="button"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          {activeTab === "students" && (
            <StudentForm formData={formData} handleChange={handleChange} />
          )}

          {activeTab === "parents" && (
            <ParentForm formData={formData} handleChange={handleChange} />
          )}

          {activeTab === "teachers" && (
            <TeacherForm formData={formData} handleChange={handleChange} />
          )}

          {activeTab === "admins" && (
            <AdminForm formData={formData} handleChange={handleChange} />
          )}

          <div className="flex justify-between items-center pt-4">
            {status.message && (
              <div
                className={`text-sm ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.message}
              </div>
            )}
            <button type="submit" className="btn btn-primary ml-auto">
              {activeTab === "students" && "Add Student"}
              {activeTab === "parents" && "Add Parent"}
              {activeTab === "teachers" && "Add Teacher"}
              {activeTab === "admins" && "Add Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addition;

import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";

function Deletion() {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for all user types
  const [students, setStudents] = useState([
    {
      id: "STU2025-001",
      name: "Ahmad Khalid",
      grade: "Grade 10",
      status: "Active",
    },
    {
      id: "STU2025-002",
      name: "Layla Hassan",
      grade: "Grade 11",
      status: "Active",
    },
    {
      id: "STU2025-003",
      name: "Omar Mahmoud",
      grade: "Grade 9",
      status: "Pending",
    },
  ]);

  const [teachers, setTeachers] = useState([
    {
      id: "TCH2025-001",
      name: "Sarah Johnson",
      subject: "Mathematics",
      status: "Active",
    },
    {
      id: "TCH2025-002",
      name: "Michael Brown",
      subject: "Science",
      status: "Active",
    },
  ]);

  const [parents, setParents] = useState([
    {
      id: "PRT2025-001",
      name: "Khalid Al-Farsi",
      student: "Ahmad Khalid",
      status: "Active",
    },
    {
      id: "PRT2025-002",
      name: "Hassan Family",
      student: "Layla Hassan",
      status: "Active",
    },
  ]);

  const getCurrentData = () => {
    switch (activeTab) {
      case "teachers":
        return teachers.filter(
          (teacher) =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "parents":
        return parents.filter(
          (parent) =>
            parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parent.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default: // students
        return students.filter(
          (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      switch (activeTab) {
        case "teachers":
          setTeachers(teachers.filter((teacher) => teacher.id !== id));
          break;
        case "parents":
          setParents(parents.filter((parent) => parent.id !== id));
          break;
        default: // students
          setStudents(students.filter((student) => student.id !== id));
      }
    }
  };

  const renderTable = () => {
    const data = getCurrentData();

    return (
      <table className="table w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Details</th>
            <th className="text-left">Confirm Deletion</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="font-medium">{item.id}</td>
              <td>
                <div className="font-medium">{item.name}</div>
                {activeTab === "students" && (
                  <div className="text-sm text-gray-500">{item.grade}</div>
                )}
                {activeTab === "teachers" && (
                  <div className="text-sm text-gray-500">{item.subject}</div>
                )}
                {activeTab === "parents" && (
                  <div className="text-sm text-gray-500">
                    Parent of: {item.student}
                  </div>
                )}
              </td>
              <td>
                <div className="text-red-600">
                  Are you sure you want to delete?
                </div>
                <div className="text-sm text-red-600">
                  Warning: This action cannot be undone.
                </div>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-error btn-sm text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">General Administrator</h1>
        <h2 className="text-2xl font-semibold mb-6">Delete User</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={`Search for ${activeTab}...`}
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tab Navigation */}
        <div className="tabs tabs-boxed bg-gray-100 p-1 rounded-lg mb-8">
          <button
            className={`tab ${
              activeTab === "students" ? "tab-active bg-primary text-white" : ""
            }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`tab ${
              activeTab === "teachers" ? "tab-active bg-primary text-white" : ""
            }`}
            onClick={() => setActiveTab("teachers")}
          >
            Teachers
          </button>
          <button
            className={`tab ${
              activeTab === "parents" ? "tab-active bg-primary text-white" : ""
            }`}
            onClick={() => setActiveTab("parents")}
          >
            Parents
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            {getCurrentData().length > 0 ? (
              renderTable()
            ) : (
              <div className="p-8 text-center text-gray-500">
                No {activeTab} found matching your search
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}

export default Deletion;

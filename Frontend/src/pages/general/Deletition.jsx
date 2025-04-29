import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import StudentDeleteTable from "../../components/general/deletition/StudentDeleteTable";
import TeacherDeleteTable from "../../components/general/deletition/TeacherDeleteTable";
import ParentDeleteTable from "../../components/general/deletition/ParentDeleteTable";
import AdminDeleteTable from "../../components/general/deletition/AdminDeleteTable";
import TabNavigation from "../../components/general/TabNavigation";

function DeleteUser() {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");

  const [students, setStudents] = useState([
    {
      id: "STU-001",
      name: "Ahmad Khalid",
      grade: "Grade 10",
      status: "Active",
    },
    {
      id: "STU-002",
      name: "Layla Hassan",
      grade: "Grade 11",
      status: "Active",
    },
    {
      id: "STU-003",
      name: "Omar Mahmoud",
      grade: "Grade 9",
      status: "Pending",
    },
  ]);

  const [teachers, setTeachers] = useState([
    {
      id: "TCH-001",
      name: "Sarah Johnson",
      subject: "Mathematics",
      status: "Active",
    },
    {
      id: "TCH-002",
      name: "Michael Brown",
      subject: "Science",
      status: "Active",
    },
  ]);

  const [parents, setParents] = useState([
    {
      id: "PRT-001",
      name: "Khalid Al-Farsi",
      student: "Ahmad Khalid",
      status: "Active",
    },
    {
      id: "PRT-002",
      name: "Hassan Family",
      student: "Layla Hassan",
      status: "Active",
    },
  ]);

  const [admins, setAdmins] = useState([
    {
      id: "ADM-001",
      name: "Admin One",
      role: "System Administrator",
      status: "Active",
    },
    {
      id: "ADM-002",
      name: "Admin Two",
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
      case "admins":
        return admins.filter(
          (admin) =>
            admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.id.toLowerCase().includes(searchTerm.toLowerCase())
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
        case "admins":
          setAdmins(admins.filter((admin) => admin.id !== id));
          break;
        default: // students
          setStudents(students.filter((student) => student.id !== id));
      }
    }
  };

  const renderTable = () => {
    const data = getCurrentData();
    if (data.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500">
          No {activeTab} found matching your search
        </div>
      );
    }

    switch (activeTab) {
      case "teachers":
        return <TeacherDeleteTable data={data} onDelete={handleDelete} />;
      case "parents":
        return <ParentDeleteTable data={data} onDelete={handleDelete} />;
      case "admins":
        return <AdminDeleteTable data={data} onDelete={handleDelete} />;
      default:
        return <StudentDeleteTable data={data} onDelete={handleDelete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Administrator</h1>
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
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

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
      </div>
    </div>
  );
}

export default DeleteUser;

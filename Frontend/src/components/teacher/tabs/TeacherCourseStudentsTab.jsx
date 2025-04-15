import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import StudentReportModal from "../ReportModal";
// import { Search } from "lucide-react";

function TeacherCourseStudentsTab() {
  const { courseData } = useOutletContext(); // gets students from context
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const course = "Math - Grade 10";
  const handleReportClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const studentsPerPage = 3;

  const filteredStudents = courseData.students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Students</h2>

      {/* Search */}
      <div className="w-full flex items-center mb-4">
        <input
          type="text"
          placeholder="Search students..."
          className="input input-secondary w-full pr-12"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {/* <div className="w-full mb-4">
        <div className="relative w-full flex items-center">
          <input
            type="text"
            placeholder="Search students..."
            className="input input-bordered w-full pr-12"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="absolute right-2 btn btn-sm btn-primary rounded-l-none px-3">
            <Search size={18} />
          </button>
        </div>
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto rounded border border-base-300">
        <table className="table table-zebra-zebra w-full text-center">
          <thead className="bg-base-300">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="flex justify-center gap-2">
                  <button className="btn btn-sm btn-primary">Chat</button>
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => handleReportClick(student.name)}
                  >
                    Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <StudentReportModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          student={selectedStudent}
          course={course}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <p>
          Page {currentPage} of {totalPages}
        </p>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TeacherCourseStudentsTab;

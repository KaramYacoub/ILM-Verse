import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import StudentReportModal from "../ReportModal";
import StudentMarksModal from "../StudentMarksModal"; // Import the new component
import { MoreHorizontal } from "lucide-react";

function TeacherCourseStudentsTab() {
  const { courseData } = useOutletContext(); // gets students from context
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const course = "Math - Grade 10";
  
  const handleReportClick = (student) => {
    setSelectedStudent(student);
    setIsReportModalOpen(true);
  };
  
  const handleAddMarks = (student) => {
    setSelectedStudent(student);
    setIsMarksModalOpen(true);
  };

  const handleChat = (student) => {
    // Your existing chat logic here
    console.log(`Chatting with ${student}`);
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

      {/* Table */}
      <div className="rounded border border-base-300">
        <table className="table table-zebra w-full text-center">
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
                <td>
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-sm">
                      <MoreHorizontal size={16} />
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                      <li>
                        <button onClick={() => handleChat(student.name)}>Chat</button>
                      </li>
                      <li>
                        <button onClick={() => handleReportClick(student.name)}>Report</button>
                      </li>
                      <li>
                        <button onClick={() => handleAddMarks(student.name)}>Add marks</button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals */}
        <StudentReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          student={selectedStudent}
          course={course}
        />
        
        <StudentMarksModal
          isOpen={isMarksModalOpen}
          onClose={() => setIsMarksModalOpen(false)}
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
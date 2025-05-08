import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { useAdminStore } from "../../store/AdminStore";
import AdminReportModal from "../general/AdminReportModal";

function SearchStudent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const { isFetchingStudents, getAllStudents } = useAdminStore();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleReportClick = (student) => {
    setSelectedStudent({
      ...student,
      student_name: `${student.first_name} ${student.last_name}`, // Create combined name
    });
    setIsReportModalOpen(true);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();

        if (response && response.data) {
          setAllStudents(response.data);
          setFilteredStudents(response.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [getAllStudents]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = allStudents.filter(
        (student) =>
          `${student.first_name} ${student.last_name}`
            .toLowerCase()
            .includes(term.toLowerCase()) ||
          student.student_id.toString().includes(term)
      );
      setFilteredStudents(results);
    } else {
      setFilteredStudents(allStudents);
    }
  };

  if (isFetchingStudents) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by student name or ID"
          className="input input-bordered w-full pl-10"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Search
          className="absolute left-3 top-[0.9rem] text-gray-500"
          size={20}
        />
      </div>

      {/* Search Results Table */}
      {filteredStudents.length > 0 && (
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Student Search Results</h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="table w-full text-center">
              <thead>
                <tr className="bg-primary text-white">
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Section</th>
                  <th>Grade</th>
                  <th>Department</th>
                  <th>Parent ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.student_id} className="hover">
                    <td>{student.student_id}</td>
                    <td>
                      {student.first_name} {student.last_name}
                    </td>
                    <td>{student.section_name}</td>
                    <td>{student.grade_name}</td>
                    <td>{student.dept_name}</td>
                    <td>{student.parent_id}</td>
                    <td>
                      <button
                        onClick={() => handleReportClick(student)}
                        className="btn btn-primary btn-sm"
                      >
                        add report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <AdminReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
}

export default SearchStudent;

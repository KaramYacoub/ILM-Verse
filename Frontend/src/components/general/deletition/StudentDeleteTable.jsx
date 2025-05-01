import { useEffect, useState } from "react";
import { useAdminStore } from "../../../store/AdminStore";
import { Loader2 } from "lucide-react";

function StudentDeleteTable({ searchTerm }) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const { isFetchingStudents, getAllStudents, deleteStudent } = useAdminStore();
  
  const [deletingIds, setDeletingIds] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        if (response?.data) {
          setStudents(response.data);
          setFilteredStudents(response.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [getAllStudents]);

  useEffect(() => {
    if (searchTerm) {
      const results = students.filter(
        (student) =>
          `${student.first_name} ${student.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.student_id.toString().includes(searchTerm)
      );
      setFilteredStudents(results);
    } else {
      setFilteredStudents(students);
    }
  }, [searchTerm, students]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      setDeletingIds((prev) => [...prev, id]);
      await deleteStudent(id);

      setStudents(students.filter((student) => student.student_id !== id));
      setFilteredStudents(
        filteredStudents.filter((student) => student.student_id !== id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    } finally {
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id));
    }
  };

  if (isFetchingStudents) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  return (
    <table className="table w-full text-center">
      <thead className="bg-primary text-white">
        <tr>
          <th>ID</th>
          <th>Details</th>
          <th>Confirm Deletion</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <tr key={student.student_id}>
              <td className="font-medium">{student.student_id}</td>
              <td>
                <div className="font-medium">
                  {student.first_name} {student.last_name}
                </div>
                <div className="text-sm text-gray-500">
                  {student.grade_name}
                </div>
              </td>
              <td className="text-red-600">
                Are you sure you want to delete?
                <div className="text-sm">This action cannot be undone.</div>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(student.student_id)}
                  className="btn btn-error btn-sm text-white"
                  disabled={deletingIds.includes(student.student_id)}
                >
                  {deletingIds.includes(student.student_id) ? (
                    <Loader2 className="animate-spin h-4 w-4 mx-auto" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center p-8 text-gray-500">
              No students found{searchTerm ? " matching your search" : ""}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default StudentDeleteTable;

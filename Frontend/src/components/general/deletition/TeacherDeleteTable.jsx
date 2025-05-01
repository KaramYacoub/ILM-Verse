import { useEffect, useState } from "react";
import { useAdminStore } from "../../../store/AdminStore";
import { Loader2 } from "lucide-react";

function TeacherDeleteTable({ searchTerm }) {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const { isFetchingTeachers, getAllTeachers } = useAdminStore();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getAllTeachers();
        if (response?.data) {
          setTeachers(response.data);
          setFilteredTeachers(response.data);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, [getAllTeachers]);

  useEffect(() => {
    if (searchTerm) {
      const results = teachers.filter(
        (teacher) =>
          `${teacher.first_name} ${teacher.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          teacher.teacher_id.toString().includes(searchTerm)
      );
      setFilteredTeachers(results);
    } else {
      setFilteredTeachers(teachers);
    }
  }, [searchTerm, teachers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;
    // Implement actual delete API call here
    setTeachers(teachers.filter((teacher) => teacher.teacher_id !== id));
    setFilteredTeachers(
      filteredTeachers.filter((teacher) => teacher.teacher_id !== id)
    );
  };

  if (isFetchingTeachers) {
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
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <tr key={teacher.teacher_id}>
              <td className="font-medium">{teacher.teacher_id}</td>
              <td>
                <div className="font-medium">
                  {teacher.first_name} {teacher.last_name}
                </div>
                <div className="text-sm text-gray-500">{teacher.dept_name}</div>
              </td>
              <td className="text-red-600">
                Are you sure you want to delete?
                <div className="text-sm">This action cannot be undone.</div>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(teacher.teacher_id)}
                  className="btn btn-error btn-sm text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center p-8 text-gray-500">
              No teachers found{searchTerm ? " matching your search" : ""}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TeacherDeleteTable;

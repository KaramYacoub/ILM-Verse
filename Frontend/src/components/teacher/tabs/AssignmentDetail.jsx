import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTeacherStore } from "../../../store/TeacherStore";

export default function AssignmentDetail() {
  const location = useLocation();
  const assignment = location.state?.assignment;

  const TeacherShowSubmition = useTeacherStore(
    (state) => state.TeacherShowSubmition
  );
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (assignment && assignment._id && assignment.course_id) {
        const data = await TeacherShowSubmition(
          assignment.course_id,
          assignment._id
        );
        setSubmissions(
          data?.map((student) => ({
            id: student.student_id,
            name: student.student_name,
            checked: student.checked || false,
            fileUrl: student.file_url,
          })) || []
        );
      }
    };

    fetchSubmissions();
  }, [assignment]);

  const toggleCheck = (id) => {
    setSubmissions((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, checked: !student.checked } : student
      )
    );
  };

  const handleUpdate = () => {
    console.log("Updated submission statuses:", submissions);
    alert("Student submission statuses updated successfully!");
    // TODO: send updated statuses to backend
  };

  if (!assignment) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        No assignment data provided.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-primary mb-4">
        {assignment.title}
      </h1>
      <p className="mb-2 text-lg">
        <strong>Description:</strong> {assignment.description || "N/A"}
      </p>
      <p className="mb-6 text-lg">
        <strong>Due Date:</strong> {assignment.end_at || "No due date"}
      </p>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-primary">
          Submitted Students
        </h2>
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Checked</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((student) => (
              <tr key={student.id} className="border-t">
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={student.checked}
                    onChange={() => toggleCheck(student.id)}
                  />
                </td>
                <td>
                  <a
                    href={student.fileUrl}
                    download
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

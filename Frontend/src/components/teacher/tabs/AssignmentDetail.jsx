import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function AssignmentDetail() {
  const location = useLocation();
  const assignment = location.state?.assignment;

  // Simulated submission data
  const [submissions, setSubmissions] = useState([
    {
      id: "2021001",
      name: "Ali Ahmad",
      checked: false,
      fileUrl: "/submissions/ali_ahmad_assignment.pdf",
    },
    {
      id: "2021002",
      name: "Lina Omar",
      checked: true,
      fileUrl: "/submissions/lina_omar_assignment.pdf",
    },
    {
      id: "2021003",
      name: "Khaled Naser",
      checked: false,
      fileUrl: "/submissions/khaled_naser_assignment.pdf",
    },
  ]);

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
    // TODO: send data to server or API
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
        <strong>Due Date:</strong> {assignment.dueDate}
      </p>

      {/* Header with Update Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-primary">
          Submitted Students
        </h2>
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </div>

      {/* Student Submissions Table */}
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download } from "lucide-react";
import useStudentStore from "../../../store/StudentStore";

function StudentAssignmentsTab() {
  const { course_id } = useParams();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    assignments = [],
    fetchAssignments,
    submitAssignment,
    loading,
    error,
  } = useStudentStore();

  useEffect(() => {
    if (course_id) {
      fetchAssignments(course_id);
    }
  }, [course_id]);

  const handleSubmit = async () => {
    if (!selectedFile || !selectedAssignment) return;

    const formData = new FormData();
    formData.append("solution", selectedFile);

    try {
      await submitAssignment(course_id, selectedAssignment._id, formData);
      document.getElementById("submit-modal").checked = false;
      fetchAssignments(course_id); // refresh list
      setSelectedAssignment(null);
      setSelectedFile(null);
    } catch (err) {
      console.error("Submission failed:", err);
      alert(err.response?.data?.message || "Upload failed.");
    }
  };

  const getStatusBadge = (assignment) => {
    return assignment.submission === "Not exist" ? (
      <span className="badge badge-error text-base-100 w-full h-full">
        Not Submitted
      </span>
    ) : (
      <span className="badge badge-success text-base-100 w-full h-full">
        Submitted
      </span>
    );
  };

  const getActionButton = (assignment) => {
    return assignment.submission === "Not exist" ? (
      <label
        htmlFor="submit-modal"
        className="btn btn-primary btn-sm w-full h-full"
        onClick={() => {
          setSelectedAssignment(assignment);
          setSelectedFile(null);
        }}
      >
        View and Submit
      </label>
    ) : (
      <span className="font-bold text-success">✓</span>
    );
  };

  if (loading)
    return <div className="text-center py-10">Loading assignments...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table table-zebra w-full text-center">
          <thead className="bg-primary text-base-100">
            <tr>
              <th>Assignment</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td className="flex flex-col items-start">
                  <div className="font-semibold">{assignment.title}</div>
                  <div className="text-sm text-gray-500">
                    {assignment.description}
                  </div>
                </td>
                <td>{assignment.end_at}</td>
                <td>{getStatusBadge(assignment)}</td>
                <td>{getActionButton(assignment)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for File Upload */}
      <input type="checkbox" id="submit-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-full max-w-2xl">
          {selectedAssignment && (
            <>
              <div className="mb-6">
                <h3 className="font-bold text-lg">Download Instructions</h3>
                <a
                  href={`/${selectedAssignment.path.replace("./", "")}`}
                  download
                  className="link link-primary flex items-center gap-2 mt-2"
                >
                  <Download /> {selectedAssignment.title}.pdf
                </a>
              </div>

              <div className="divider divider-primary"></div>

              <div>
                <h3 className="font-bold text-lg mb-4">
                  Submit: {selectedAssignment.title}
                </h3>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                {selectedFile && (
                  <p className="text-sm mt-2 text-gray-600">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="modal-action mt-4">
                <label htmlFor="submit-modal" className="btn btn-outline">
                  Cancel
                </label>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!selectedFile}
                >
                  Submit Assignment
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentAssignmentsTab;

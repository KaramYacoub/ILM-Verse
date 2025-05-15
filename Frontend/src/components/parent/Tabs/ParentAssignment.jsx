import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download } from "lucide-react";
import useParentsStore from "../../../store/ParentStore";

function ParentAssignment() {
  const { course_id, student_id } = useParams();
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const { assignments = [], fetchAssignments } = useParentsStore();

  useEffect(() => {
    const fetchData = async () => {
      if (course_id && student_id) {
        await fetchAssignments(course_id, student_id);
      }
    };
    fetchData();
  }, [course_id, student_id, fetchAssignments]);

  const getStatusBadge = (status) => {
    if (status === "Not exist") {
      return (
        <span className="badge badge-error text-base-100 w-full h-full">
          Not Submitted
        </span>
      );
    }
    return (
      <span className="badge badge-success text-base-100 w-full h-full">
        Submitted
      </span>
    );
  };

  const getGradeButton = (assignment) => {
    if (assignment.submission === "Not exist") {
      return <span className="font-bold">0%</span>;
    } else {
      return (
        <label
          htmlFor="submit-modal"
          className="btn btn-primary btn-sm w-full h-full"
          onClick={() => setSelectedAssignment(assignment)}
        >
          View Submission
        </label>
      );
    }
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table table-zebra w-full text-center">
          <thead className="bg-primary text-base-100">
            <tr>
              <th>Assignment</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment._id || index}>
                <td>
                  <div className="font-semibold">{assignment.title}</div>
                  <div className="text-sm text-gray-500">
                    Published: {assignment.published_at}
                  </div>
                </td>
                <td>{assignment.end_at}</td>
                <td>{getStatusBadge(assignment.submission)}</td>
                <td>{getGradeButton(assignment)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL for submission */}
      <input type="checkbox" id="submit-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-full max-w-2xl">
          {selectedAssignment && (
            <>
              <div className="mb-6 pb-4">
                <h3 className="font-bold text-lg mb-2">Download assignment:</h3>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedAssignment.path.replace(
                      "./Data/Assigments",
                      "/api/static/assignments"
                    )}
                    download
                    className="link link-primary font-medium flex gap-2 mt-2"
                  >
                    <Download />
                    {selectedAssignment.title} (Instructions)
                  </a>
                </div>
              </div>

              <div className="divider divider-primary m-0"></div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {selectedAssignment.submission === "Not exist"
                    ? "No submission yet."
                    : "Submission exists."}
                </p>
              </div>

              <div className="modal-action">
                <label htmlFor="submit-modal" className="btn btn-outline">
                  Close
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParentAssignment;

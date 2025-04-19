import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Download } from "lucide-react";

function StudentAssignmentsTab() {
  const { courseData } = useOutletContext();
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = courseData.units.flatMap((unit, unitIndex) =>
    unit.assignments.map((assignment, idx) => ({
      id: `${unitIndex + 1}-${idx + 1}`,
      name: assignment.title,
      unit: unit.name,
      dueDate: assignment.dueDate,
      status: assignment.status,
      grade: assignment.grade,
    }))
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Submitted":
        return (
          <span className="badge badge-success text-base-100 w-full h-full">
            {status}
          </span>
        );
      case "Not Submitted":
        return (
          <span className="badge badge-error text-base-100 w-full h-full">
            {status}
          </span>
        );
      case "Pending":
        return (
          <span className="badge badge-warning text-base-100 w-full h-full">
            {status}
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getGradeButton = (assignment) => {
    const { grade, status } = assignment;

    if (status === "Not Submitted") {
      return <span className="font-bold">-</span>;
    } else if (grade === "submit") {
      return (
        <label
          htmlFor="submit-modal"
          className="btn btn-primary btn-sm w-full h-full"
          onClick={() => setSelectedAssignment(assignment)}
        >
          View and Submit
        </label>
      );
    } else {
      return <span className="font-bold">{grade}</span>;
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
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="flex flex-col items-start">
                  <div className="font-semibold">{assignment.name}</div>
                  <div className="text-sm text-gray-500">{assignment.unit}</div>
                </td>
                <td>{assignment.dueDate}</td>
                <td>{getStatusBadge(assignment.status)}</td>
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
              {/* Download Assignment Section */}
              <div className="mb-6 pb-4">
                <h3 className="font-bold text-lg mb-2">Download assignment:</h3>
                <div className="flex items-center gap-2">
                  <a
                    href={`/assignments/${selectedAssignment.id}.pdf`}
                    download={`${selectedAssignment.name}.pdf`}
                    className="link link-primary font-medium flex gap-2 mt-2"
                  >
                    <Download />
                    {selectedAssignment.name} Instructions (PDF)
                  </a>
                </div>
              </div>

              <div className="divider divider-primary m-0"></div>

              {/* Submission Section */}
              <div>
                <h3 className="font-bold text-lg mb-4">
                  Submit: {selectedAssignment.name}
                </h3>

                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">Upload file (PDF, DOCX)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="file-input file-input-bordered w-full"
                  />
                </div>

                <div className="mb-6">
                  <label className="label">
                    <span className="label-text">Or write your answer</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows="5"
                    placeholder="Write your answer here..."
                  ></textarea>
                </div>

                <div className="modal-action">
                  <label htmlFor="submit-modal" className="btn btn-outline">
                    Cancel
                  </label>
                  <button className="btn btn-primary">Submit Assignment</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentAssignmentsTab;

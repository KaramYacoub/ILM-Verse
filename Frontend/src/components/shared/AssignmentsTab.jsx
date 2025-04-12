import { useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function AssignmentsTab() {
  const { courseData } = useOutletContext();
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Flatten all assignments
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
          <span className="badge badge-success h-fit text-center text-base-100">
            {status}
          </span>
        );
      case "Not Submitted":
        return (
          <span className="badge badge-error h-fit text-center text-base-100">
            {status}
          </span>
        );
      case "Pending":
        return (
          <span className="badge badge-warning h-fit text-center text-base-100">
            {status}
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getGradeButton = (grade, status, assignment) => {
    if (status === "Not Submitted") {
      return <span className="font-bold">0%</span>;
    } else if (grade === "submit") {
      return (
        <label
          htmlFor="submit-modal"
          className="btn btn-primary btn-sm"
          onClick={() => setSelectedAssignment(assignment)}
        >
          Submit
        </label>
      );
    } else {
      return <span className="font-bold">{grade}</span>;
    }
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <div className="grid grid-cols-12 gap-4 mb-4 font-bold border-b pb-2">
        <div className="col-span-5">ASSIGNMENT</div>
        <div className="col-span-2">DUE DATE</div>
        <div className="col-span-2">STATUS</div>
        <div className="col-span-3">GRADE</div>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="grid grid-cols-12 gap-4 items-center bg-base-200 p-4 rounded-lg shadow-sm"
          >
            <div className="col-span-5">
              <div className="font-semibold">{assignment.name}</div>
              <div className="text-sm text-gray-500">{assignment.unit}</div>
            </div>
            <div className="col-span-2">{assignment.dueDate}</div>
            <div className="col-span-2 flex justify-center">
              {getStatusBadge(assignment.status)}
            </div>
            <div className="col-span-3">
              {getGradeButton(assignment.grade, assignment.status)}
            </div>

            {/* MODAL for submission */}
            <input type="checkbox" id="submit-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box w-full max-w-2xl">
                <h3 className="font-bold text-lg mb-2">
                  Submit: {selectedAssignment?.name}
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

                <div className="mb-4">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

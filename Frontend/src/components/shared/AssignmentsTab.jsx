// AssignmentsTab.jsx
// import { useOutletContext } from "react-router-dom";

export default function AssignmentsTab() {
//   const { courseData } = useOutletContext();

  // Sample assignments data
  const assignments = [
    {
      id: 1,
      name: "Assignment 1: Assignment name",
      unit: "Unit 1: Unit name",
      dueDate: "April 1, 2025",
      status: "Submitted",
      grade: "90%",
    },
    {
      id: 2,
      name: "Assignment 2: Assignment name",
      unit: "Unit 1: Unit name",
      dueDate: "April 3, 2025",
      status: "Not Submitted",
      grade: "0%",
    },
    {
      id: 3,
      name: "Assignment 3: Assignment name",
      unit: "Unit 2: Unit name",
      dueDate: "April 9, 2025",
      status: "Pending",
      grade: "submit",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Submitted":
        return <span className="badge badge-success">{status}</span>;
      case "Not Submitted":
        return <span className="badge badge-error">{status}</span>;
      case "Pending":
        return <span className="badge badge-warning">{status}</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getGradeButton = (grade, status) => {
    if (status === "Not Submitted") {
      return <span className="font-bold">0%</span>;
    } else if (grade === "submit") {
      return <button className="btn btn-primary btn-sm">Submit</button>;
    } else {
      return <span className="font-bold">{grade}</span>;
    }
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 mb-4 font-bold border-b pb-2">
        <div className="col-span-5">ASSIGNMENT</div>
        <div className="col-span-2">DUE DATE</div>
        <div className="col-span-2">STATUS</div>
        <div className="col-span-3">GRADE</div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="grid grid-cols-12 gap-4 items-center"
          >
            <div className="col-span-5">
              <div className="font-semibold">{assignment.name}</div>
              <div className="text-sm text-gray-500">{assignment.unit}</div>
            </div>
            <div className="col-span-2">{assignment.dueDate}</div>
            <div className="col-span-2">
              {getStatusBadge(assignment.status)}
            </div>
            <div className="col-span-3">
              {getGradeButton(assignment.grade, assignment.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

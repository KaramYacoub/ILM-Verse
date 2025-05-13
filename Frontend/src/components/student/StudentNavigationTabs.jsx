import { useNavigate, useLocation, useParams } from "react-router-dom";

function StudentNavigationTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course_id } = useParams();

  // Determine active tab
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const isUnitsTabActive = pathSegments.includes("units");
  const isAssignmentsTabActive = lastSegment === "student-assignments";

  return (
    <div className="tabs tabs-boxed items-center bg-base-100 mb-6 shadow-md overflow-x-auto">
      <button
        onClick={() =>
          navigate(`/student-course-content/${course_id}/student-overview`)
        }
        className={`w-full h-14 text-lg tab ${
          !isUnitsTabActive && !isAssignmentsTabActive
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Overview
      </button>
      <button
        onClick={() =>
          navigate(`/student-course-content/${course_id}/units/${unit_id}`, {
            state: { unit },
          })
        }
        className={`w-full h-14 text-lg tab ${
          isUnitsTabActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Units
      </button>
      <button
        onClick={() =>
          navigate(`/student-course-content/${course_id}/student-assignments`)
        }
        className={`w-full h-14 text-lg tab ${
          isAssignmentsTabActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Assignments
      </button>
    </div>
  );
}

export default StudentNavigationTabs;

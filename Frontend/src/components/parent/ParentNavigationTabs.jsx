import { useNavigate, useLocation, useParams } from "react-router-dom";

function ParentNavigationTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course_id } = useParams();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  const isOverviewTabActive =
    !pathSegments.includes("parent-units") &&
    lastSegment !== "parent-assignments" &&
    lastSegment !== "parent-quizzes";

  const isUnitsTabActive = pathSegments.includes("parent-units");
  const isAssignmentsTabActive = lastSegment === "parent-assignments";
  const isQuizzesTabActive = lastSegment === "parent-quizzes";

  return (
    <div className="tabs tabs-boxed items-center bg-base-100 mb-6 shadow-md overflow-x-auto">
      <button
        onClick={() =>
          navigate(`/parent-course-content/${course_id}/parent-overview`, {
            state: { unit: location.state?.unit },
          })
        }
        className={`w-full h-14 text-lg tab ${
          isOverviewTabActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Overview
      </button>

      {/* Units tab — disabled (not clickable) */}
      <button
        disabled
        className={`w-full h-14 text-lg tab border-2 opacity-50 cursor-not-allowed ${
          isUnitsTabActive
            ? "bg-accent text-primary border-yellow-500"
            : "text-gray-600 border-transparent"
        }`}
      >
        Units
      </button>

      <button
        onClick={() =>
          navigate(
            `/parent-course-content/${course_id}/parent-assignments/${location.state?.student_id}`,
            {
              state: { unit: location.state?.unit },
            }
          )
        }
        className={`w-full h-14 text-lg tab ${
          isAssignmentsTabActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Assignments
      </button>

      <button
        onClick={() =>
          navigate(`/parent-course-content/${course_id}/parent-quizzes`, {
            state: { unit: location.state?.unit },
          })
        }
        className={`w-full h-14 text-lg tab ${
          isQuizzesTabActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Quizzes
      </button>
    </div>
  );
}

export default ParentNavigationTabs;

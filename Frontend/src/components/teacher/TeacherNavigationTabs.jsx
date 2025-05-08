import { useNavigate, useLocation } from "react-router-dom";

function TeacherNavigationTabs() {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop(); // Get the last segment of the path

  const pathSegments = location.pathname.split("/").filter(Boolean); // Split the path into segments and filter out empty strings
  const lastSegment = pathSegments[pathSegments.length - 1];
  const courseID = pathSegments[pathSegments.length - 2];;

  // Determine if the Overview tab is active based on the path
  // The Overview tab is active if the last segment is "overview" or if there are no segments
  const isStudentActive =
    pathSegments.length === 1 ||
    lastSegment === "teacher-course-students" ||
    lastSegment === "teacher-course-content";

  const navigate = useNavigate();
  function handleNavigation(tab) {
    return () => {
      navigate(`/teacher-course-content/${courseID}/${tab}`, {
        state: { unit: location.state?.unit },
      });
    };
  }

  return (
    <div className="tabs tabs-boxed items-center bg-base-100 mb-6 shadow-md overflow-x-auto">
      <button
        onClick={handleNavigation("teacher-course-students")}
        className={`w-full h-14 text-lg tab ${
          isStudentActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Students
      </button>
      <button
        onClick={handleNavigation("teacher-overview")}
        className={`w-full h-14 text-lg tab ${
          currentTab === "teacher-overview"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Overview
      </button>
      <button
        onClick={handleNavigation("teacher-unit-content")}
        disabled={isStudentActive || currentTab === "teacher-overview"}
        className={`w-full h-14 text-lg tab ${
          currentTab === "teacher-unit-content"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Content
      </button>
      <button
        onClick={handleNavigation("teacher-assignments")}
        disabled={isStudentActive || currentTab === "teacher-overview"}
        className={`w-full h-14 text-lg tab ${
          currentTab === "teacher-assignments"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Assignments
      </button>
      <button
        onClick={handleNavigation("teacher-quizzes")}
        disabled={isStudentActive || currentTab === "teacher-overview"}
        className={`w-full h-14 text-lg tab ${
          currentTab === "teacher-quizzes"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Quizzez
      </button>
    </div>
  );
}

export default TeacherNavigationTabs;

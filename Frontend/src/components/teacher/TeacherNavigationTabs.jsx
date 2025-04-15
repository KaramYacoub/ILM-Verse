import { useNavigate, useLocation } from "react-router-dom";

function TeacherNavigationTabs() {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop(); // Get the last segment of the path

  const pathSegments = location.pathname.split("/").filter(Boolean); // Split the path into segments and filter out empty strings
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Determine if the Overview tab is active based on the path
  // The Overview tab is active if the last segment is "overview" or if there are no segments
  const isOverviewActive =
    pathSegments.length === 1 ||
    lastSegment === "teacher-overview" ||
    lastSegment === "teacher-course-content";

  const navigate = useNavigate();
  function handleNavigation(tab) {
    return () => {
      navigate(`/teacher-course-content/${tab}`, {
        state: { unit: location.state?.unit },
      });
    };
  }

  return (
    <div className="tabs tabs-boxed items-center bg-base-100 mb-6 shadow-md">
      <button
        onClick={handleNavigation("teacher-overview")}
        className={`w-full h-14 text-lg tab ${
          isOverviewActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Overview
      </button>
      <button
        onClick={handleNavigation("teacher-lessons")}
        disabled={isOverviewActive || currentTab === "teacher-assignments"}
        className={`w-full h-14 text-lg tab ${
          currentTab === "teacher-lessons" ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Lessons
      </button>
      <button
        onClick={handleNavigation("teacher-resources")}
        disabled={isOverviewActive || currentTab === "teacher-assignments"}
        className={`w-full h-14 text-lg tab ${
          currentTab === "teacher-resources"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Resources
      </button>
      <button
        onClick={handleNavigation("teacher-assignments")}
        className={`w-full h-14 text-lg tab ${
          currentTab === "teacher-assignments"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Assignments
      </button>
    </div>
  );
}

export default TeacherNavigationTabs;

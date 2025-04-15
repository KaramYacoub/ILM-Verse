import { useNavigate, useLocation } from "react-router-dom";

function StudentNavigationTabs() {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop(); // Get the last segment of the path

  const pathSegments = location.pathname.split("/").filter(Boolean); // Split the path into segments and filter out empty strings
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Determine if the Overview tab is active based on the path
  // The Overview tab is active if the last segment is "overview" or if there are no segments
  const isOverviewActive =
    pathSegments.length === 1 ||
    lastSegment === "student-overview" ||
    lastSegment === "student-course-content";

  const navigate = useNavigate();
  function handleNavigation(tab) {
    return () => {
      navigate(`/student-course-content/${tab}`, {
        state: { unit: location.state?.unit },
      });
    };
  }

  return (
    <div className="tabs tabs-boxed items-center bg-base-100 mb-6 shadow-md">
      <button
        onClick={handleNavigation("student-overview")}
        className={`w-full h-14 text-lg tab ${
          isOverviewActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Overview
      </button>
      <button
        onClick={handleNavigation("student-lessons")}
        disabled={isOverviewActive || currentTab === "student-assignments"}
        className={`w-full h-14 text-lg tab ${
          currentTab === "student-lessons" ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Lessons
      </button>
      <button
        onClick={handleNavigation("student-resources")}
        disabled={isOverviewActive || currentTab === "student-assignments"}
        className={`w-full h-14 text-lg tab ${
          currentTab === "student-resources"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Resources
      </button>
      <button
        onClick={handleNavigation("student-assignments")}
        className={`w-full h-14 text-lg tab ${
          currentTab === "student-assignments"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Assignments
      </button>
    </div>
  );
}

export default StudentNavigationTabs;

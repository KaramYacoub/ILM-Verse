import { Link, useLocation } from "react-router-dom";

function NavigationTabs() {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop(); // Get the last segment of the path

  const pathSegments = location.pathname.split("/").filter(Boolean); // Split the path into segments and filter out empty strings
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Determine if the Overview tab is active based on the path
  // The Overview tab is active if the last segment is "overview" or if there are no segments
  const isOverviewActive =
    pathSegments.length === 1 ||
    lastSegment === "overview" ||
    lastSegment === "coursecontent";

  return (
    <div className="tabs tabs-boxed items-center bg-base-100 mb-6 shadow-md">
      <Link
        to="overview"
        className={`w-full h-14 text-lg tab ${
          isOverviewActive ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Overview
      </Link>
      <Link
        to="lessons"
        
        className={`w-full h-14 text-lg tab ${
          currentTab === "lessons" ? "bg-accent text-primary" : "text-gray-600"
        }`}
      >
        Lessons
      </Link>
      <Link
        to="resources"
        className={`w-full h-14 text-lg tab ${
          currentTab === "resources"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Resources
      </Link>
      <Link
        to="assignments"
        className={`w-full h-14 text-lg tab ${
          currentTab === "assignments"
            ? "bg-accent text-primary"
            : "text-gray-600"
        }`}
      >
        Assignments
      </Link>
    </div>
  );
}

export default NavigationTabs;

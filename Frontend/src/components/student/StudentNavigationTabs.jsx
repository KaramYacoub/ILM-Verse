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

// import { useNavigate, useLocation } from "react-router-dom";

// function StudentNavigationTabs() {
//   const location = useLocation();
//   const currentTab = location.pathname.split("/").pop(); // Get the last segment of the path

//   const pathSegments = location.pathname.split("/").filter(Boolean); // Split the path into segments and filter out empty strings
//   const lastSegment = pathSegments[pathSegments.length - 1];

//   // Determine if the Overview tab is active based on the path
//   // The Overview tab is active if the last segment is "overview" or if there are no segments
//   const isOverviewActive =
//     pathSegments.length === 1 ||
//     lastSegment === "student-overview" ||
//     lastSegment === "student-course-content";

//   const navigate = useNavigate();
//   function handleNavigation(tab) {
//     return () => {
//       const course_id = location.state?.unit?.course_id; // Get course_id from state
//       if (!course_id) return;

//       navigate(`/student-course-content/${course_id}/${tab}`, {
//         state: { unit: location.state?.unit },
//       });
//     };
//   }

//   return (
//     <div className="tabs tabs-boxed items-center bg-base-100 mb-6 shadow-md overflow-x-auto">
//       <button
//         onClick={handleNavigation("student-overview")}
//         className={`w-full h-14 text-lg tab ${
//           isOverviewActive ? "bg-accent text-primary" : "text-gray-600"
//         }`}
//       >
//         Overview
//       </button>
//       <button
//         onClick={handleNavigation("student-units")}
//         disabled={isOverviewActive || currentTab === "student-units"}
//         className={`w-full h-14 text-lg tab ${
//           currentTab === "student-units"
//             ? "bg-accent text-primary"
//             : "text-gray-600"
//         }`}
//       >
//         Units
//       </button>

//       <button
//         onClick={handleNavigation("student-assignments")}
//         className={`w-full h-14 text-lg tab ${
//           currentTab === "student-assignments"
//             ? "bg-accent text-primary"
//             : "text-gray-600"
//         }`}
//       >
//         Assignments
//       </button>
//     </div>
//   );
// }

// export default StudentNavigationTabs;

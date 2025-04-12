import { Link, Outlet, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import StudentNavbar from "../../components/student/StudentNavbar";

function CourseContent() {
  const courseData = {
    name: "Course name",
    teacher: "teacher name",
    grade: "Grade 10",
    semester: "Fall Semester 2025",
    stats: {
      units: 4,
      lessons: 12,
      assignments: 8,
      quizzes: 5,
    },
    units: [
      {
        name: "Unit 1: Unit name",
        lessons: 4,
        assignments: 2,
        quizzes: 1,
      },
      {
        name: "Unit 2: Unit name",
        lessons: 5,
        assignments: 3,
        quizzes: 1,
      },
      {
        name: "Unit 3: Unit name",
        lessons: 3,
        assignments: 3,
        quizzes: 3,
      },
    ],
  };

  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-start pb-5">
      <StudentNavbar />
      <Breadcrumbs
        prevPages={[{ name: "My Courses", path: "/studentDashboard" }]}
        currentPage={courseData.name}
      />

      <div className="container mx-auto px-4">
        {/* Course Header */}
        <div className="bg-primary flex flex-col items-center rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl text-accent font-bold mb-2">
            {courseData.name}
          </h1>
          <p className="text-base-100 mb-4">
            {courseData.teacher} • {courseData.grade} • {courseData.semester}
          </p>

          <p className="text-accent">
            • {courseData.stats.units} Units • {courseData.stats.lessons}{" "}
            Lessons • {courseData.stats.assignments} Assignments •{" "}
            {courseData.stats.quizzes} Quizzes
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs tabs-boxed bg-base-100 mb-6">
          <Link
            to="overview"
            className={`tab ${
              ["overview", "coursecontent"].includes(currentTab)
                ? "tab-active"
                : ""
            }`}
          >
            Overview
          </Link>
          <Link
            to="lessons"
            className={`tab ${currentTab === "lessons" ? "tab-active" : ""}`}
          >
            Lessons
          </Link>
          <Link
            to="assignments"
            className={`tab ${
              currentTab === "assignments" ? "tab-active" : ""
            }`}
          >
            Assignments
          </Link>
          <Link
            to="resources"
            className={`tab ${currentTab === "resources" ? "tab-active" : ""}`}
          >
            Resources
          </Link>
        </div>

        {/* Tab Content */}
        <Outlet context={{ courseData }} />
      </div>
    </div>
  );
}

export default CourseContent;

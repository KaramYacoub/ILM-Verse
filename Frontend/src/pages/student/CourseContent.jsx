import Breadcrumbs from "../../components/shared/Breadcrumbs";
import StudentNavbar from "../../components/student/StudentNavbar";

function CourseContent() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-start pb-5">
      <StudentNavbar />
      <Breadcrumbs
        prevPages={[{ name: "My Courses", path: "/studentDashboard" }]}
        currentPage="Course name"
      />
    </div>
  );
}

export default CourseContent;

import StudentNavbar from "../../components/student/StudentNavbar";
import CourseCard from "../../components/shared/CourseCard";
import { Link } from "react-router-dom";

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <StudentNavbar />

      <div className="flex flex-col items-start justify-center mt-10 px-4 md:px-8">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-6xl font-bold text-primary">My Courses</h1>
            <p className="mt-2 text-3xl text-primary">Course overview</p>
          </div>
          <div>
            <Link
              to="/studentviewgrades"
              className="btn btn-active btn-primary rounded-full h-16 w-48 font-semibold text-xl text-base-100"
            >
              Show Grades
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
          {Array.from({ length: 6 }, (_, index) => (
            <CourseCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

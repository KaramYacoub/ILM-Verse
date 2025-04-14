import { Link } from "react-router-dom";
import StudentNavbar from "../../components/student/StudentNavbar";
import Breadcrumbs from "../../components/shared/Breadcrumbs";

function StudentViewGrades() {
  const student = {
    gpa: 91.3,
    classRank: { rank: 3, total: 28 },
    name: "Ahmed Omar",
    grade: 9,
    courses: [
      {
        name: "Mathematics (Algebra II)",
        teacher: "Mrs. Rodriguez",
        grade: 94,
        classAvg: 85,
        status: "Excellent",
      },
      {
        name: "Physics",
        teacher: "Mr. Johnson",
        grade: 92,
        classAvg: 83,
        status: "Excellent",
      },
      {
        name: "English Literature",
        teacher: "Ms. Williams",
        grade: 90,
        classAvg: 82,
        status: "Excellent",
      },
      {
        name: "World History",
        teacher: "Mr. Patel",
        grade: 88,
        classAvg: 81,
        status: "Good",
      },
      {
        name: "Computer Science",
        teacher: "Mrs. Kim",
        grade: 95,
        classAvg: 79,
        status: "Excellent",
      },
      {
        name: "Physical Education",
        teacher: "Coach Garcia",
        grade: 89,
        classAvg: 86,
        status: "Good",
      },
    ],
  };
  const breadcrumbPages = [{ name: "My Courses", path: "/studentDashboard" }];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <StudentNavbar />

      <Breadcrumbs
        prevPages={breadcrumbPages}
        currentPage="View Grades"
        styles="self-start"
      />
      <h1 className="text-4xl font-bold text-primary self-start ml-5">
        My Grades
      </h1>

      <div className="p-6 space-y-8 w-full max-w-4xl bg-base-100 rounded-lg shadow-md mt-5">
        <h2 className="text-lg font-semibold bg-primary text-base-100 px-4 py-2 rounded-md w-fit">
          Course Grades - {student.name} (Grade {student.grade})
        </h2>
        <div className="bg-base-100 rounded-lg shadow-sm p-6 flex justify-between gap-4">
          <div className="flex-1 bg-base-200 p-4 rounded-lg text-center">
            <p className="font-semibold text-gray-600">Current GPA</p>
            <p className="text-2xl font-bold text-primary">{student.gpa}/100</p>
          </div>
          <div className="flex-1 bg-base-200 p-4 rounded-lg text-center">
            <p className="font-semibold text-gray-600">Class Rank</p>
            <p className="text-2xl font-bold text-primary">
              {student.classRank.rank}
              <span className="text-sm text-gray-600">
                {" "}
                of {student.classRank.total}
              </span>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md shadow-md bg-base-300">
          <table className="table w-full">
            <thead className="bg-primary text-base-100 text-base">
              <tr>
                <th>Course</th>
                <th>Teacher</th>
                <th>Grade</th>
                <th>Class Avg</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {student.courses.map((course, i) => (
                <tr key={i} className="hover">
                  <td>{course.name}</td>
                  <td>{course.teacher}</td>
                  <td className="text-primary font-semibold">{course.grade}</td>
                  <td>{course.classAvg}</td>
                  <td
                    className={
                      course.status === "Excellent"
                        ? "text-green-600 font-medium"
                        : "text-blue-600 font-medium"
                    }
                  >
                    {course.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end flex-wrap gap-4">
          <Link to="#" className="btn btn-outline btn-primary">
            Contact Teachers
          </Link>
          <button className="btn btn-primary">Download Report Card</button>
        </div>
      </div>
    </div>
  );
}

export default StudentViewGrades;

import StudentNavbar from "../../components/student/StudentNavbar";

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
        term1: 37,
        term2: 38,
        term3: 39,
        final: 76,
        grade: 94,
        classAvg: 85,
        status: "Excellent",
      },
      {
        name: "Physics",
        teacher: "Mr. Johnson",
        term1: 36,
        term2: 37,
        term3: 38,
        final: 75,
        grade: 92,
        classAvg: 83,
        status: "Excellent",
      },
      {
        name: "English Literature",
        teacher: "Ms. Williams",
        term1: 35,
        term2: 36,
        term3: 37,
        final: 74,
        grade: 90,
        classAvg: 82,
        status: "Excellent",
      },
      {
        name: "World History",
        teacher: "Mr. Patel",
        term1: 34,
        term2: 35,
        term3: 36,
        final: 72,
        grade: 88,
        classAvg: 81,
        status: "Good",
      },
      {
        name: "Computer Science",
        teacher: "Mrs. Kim",
        term1: 38,
        term2: 39,
        term3: 40,
        final: 78,
        grade: 95,
        classAvg: 79,
        status: "Excellent",
      },
      {
        name: "Physical Education",
        teacher: "Coach Garcia",
        term1: 35,
        term2: 36,
        term3: 37,
        final: 71,
        grade: 89,
        classAvg: 86,
        status: "Good",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <StudentNavbar />
      <h1 className="text-4xl font-bold text-primary self-start mt-10 ml-5">
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
          <table className="table w-full text-center">
            <thead className="bg-primary text-base-100 text-base">
              <tr>
                <th>Course</th>
                <th>Teacher</th>
                <th>Term 1</th>
                <th>Term 2</th>
                <th>Term 3</th>
                <th>Final</th>
                <th>Grade</th>
                <th>Class Avg</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {student.courses.map((course, i) => (
                <tr key={i} className="hover">
                  <td>{course.name}</td>
                  <td>{course.teacher}</td>
                  <td>{course.term1}/40</td>
                  <td>{course.term2}/40</td>
                  <td>{course.term3}/40</td>
                  <td>{course.final}/80</td>
                  <td className="text-primary font-bold">{course.grade}</td>
                  <td>{course.classAvg}</td>
                  {/* <td>
                    <span
                      className={`badge badge-sm ${
                        course.status === "Excellent" ? "badge-success" : "badge-warning"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentViewGrades;

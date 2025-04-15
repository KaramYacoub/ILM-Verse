import StudentNavbar from "../../components/student/StudentNavbar";
import Breadcrumbs from "../../components/shared/Breadcrumbs";

export default function StudentShowQuizzes() {
  const quizzes = [
    {
      id: 1,
      course: "Mathematics",
      title: "Algebra Quiz",
      totalQuestions: 10,
      points: 20,
      Date: "2025-04-24",
      startAt: "10:00 AM",
      endAt: "11:00 AM",
      status: "Not Started",
    },
    {
      id: 2,
      course: "Physics",
      title: "Newton Laws Quiz",
      totalQuestions: 8,
      points: 15,
      Date: "2025-04-17",
      startAt: "09:00 AM",
      endAt: "09:45 AM",
      status: "Not available",
      grad: "N/A",
    },
    {
      id: 3,
      course: "Computer Science",
      title: "Loops & Conditions",
      totalQuestions: 12,
      points: 24,
      Date: "2025-04-18",
      startAt: "01:00 PM",
      endAt: "02:00 PM",
      status: "Completed",
      grad: "85%",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Not Started":
        return (
          <span className="badge badge-warning w-full h-full text-base-100">
            {status}
          </span>
        );
      case "Not available":
        return (
          <span className="badge badge-error w-full h-full text-base-100">
            {status}
          </span>
        );
      case "Completed":
        return (
          <span className="badge badge-success w-full h-full text-base-100">
            {status}
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const breadcrumbPages = [{ name: "My Courses", path: "/student-dashboard" }];
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <StudentNavbar />
      <Breadcrumbs
        prevPages={breadcrumbPages}
        currentPage="My quizzezs"
        styles="self-start"
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-primary">My Quizzes</h1>

        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
          <table className="table table-zebra w-full text-center">
            <thead className="bg-primary text-base-100">
              <tr>
                <th>Course</th>
                <th>Quiz Title</th>
                <th>Points</th>
                <th>Date</th>
                <th>Start At</th>
                <th>End At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id}>
                  <td>{quiz.course}</td>
                  <td>{quiz.title}</td>
                  <td>{quiz.points}</td>
                  <td>{quiz.Date}</td>
                  <td>{quiz.startAt}</td>
                  <td>{quiz.endAt}</td>
                  <td>{getStatusBadge(quiz.status)}</td>
                  <td>
                    {quiz.status === "Completed" ||
                    quiz.status === "Not available" ? (
                      <span className="font-bold">{quiz.grad}</span>
                    ) : (
                      <a
                        href={`/student-quiz-details`}
                        className="btn btn-primary btn-sm"
                      >
                        Start
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

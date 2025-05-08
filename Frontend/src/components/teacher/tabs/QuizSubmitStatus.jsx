import { useLocation } from "react-router-dom";

export default function QuizSubmitStatus() {
  const location = useLocation();
  const quiz = location.state?.quiz;

  if (!quiz) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        No quiz data provided.
      </div>
    );
  }

  // Dummy data (replace this with actual API data)
  const submittedStudents = [
    { student_id: "S001", student_name: "Ali Ahmad", status: true, marks: 18 },
    {
      student_id: "S002",
      student_name: "Lina Saeed",
      status: false,
      marks: null,
    },
    { student_id: "S003", student_name: "Omar Zaid", status: true, marks: 15 },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-primary mb-4">{quiz.title}</h1>
      <p className="text-lg mb-6">
        <strong>Status:</strong>{" "}
        <span className={quiz.published ? "text-green-600" : "text-red-600"}>
          {quiz.published ? "Published" : "Not Published"}
        </span>
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Submitted Students
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Student ID</th>
              <th className="py-2 px-4 border-b text-left">Student Name</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Marks</th>
            </tr>
          </thead>
          <tbody>
            {submittedStudents.map((student) => (
              <tr key={student.student_id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{student.student_id}</td>
                <td className="py-2 px-4 border-b">{student.student_name}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={
                      student.status
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {student.status ? "Submitted" : "Not Submitted"}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {student.status ? `${student.marks} / ${quiz.points}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

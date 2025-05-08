import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, FileText, Trash2, Pencil } from "lucide-react";
import { useState } from "react";

function TeacherQuizzesTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const courseID = pathSegments[pathSegments.length - 2];
  const unit = location.state?.unit;
  const [quizzes, setQuizzes] = useState(unit?.quizzes || []);

  const handleEdit = (title) => {
    alert(`Editing: ${title}`);
  };

  const handleDelete = (title) => {
    setQuizzes((prev) => prev.filter((q) => q.title !== title));
  };

  const handleShowSubmit = (quiz) => {
    navigate(`/teacher-course-content/${courseID}/quiz-submit-status`, {
      state: { quiz },
    });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      {quizzes.length === 0 ? (
        <p className="text-primary font-bold text-2xl text-center">
          No quizzes available.
        </p>
      ) : (
        <div className="grid gap-4 mb-6">
          <h2 className="text-3xl text-primary font-semibold">Quizzes</h2>

          {quizzes.map((quiz, idx) => (
            <div
              key={idx}
              className="border border-base-300 p-4 rounded-lg shadow-sm bg-base-100 flex justify-between items-start"
            >
              <div
                className="space-y-1 cursor-pointer"
                onClick={() => handleEdit(quiz.title)}
              >
                <h3 className="text-lg font-bold flex items-center gap-2 text-primary hover:underline">
                  <FileText className="w-5 h-5" />
                  {quiz.title}
                </h3>
                <p className="text-gray-700">
                  {quiz.description || "No description available."}
                </p>
                <div className="text-sm text-gray-500 flex flex-col gap-1 mt-1">
                  <span>Total Marks: {quiz.points} points</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due: {quiz.dueDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Available: {quiz.startAt} to {quiz.endAt}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center mt-1">
                <button
                  onClick={() => handleEdit(quiz.title)}
                  className="btn btn-sm btn-outline"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShowSubmit(quiz)}
                  className="btn btn-sm btn-outline btn-info"
                >
                  Show Quiz Submit
                </button>
                <button
                  onClick={() => handleDelete(quiz.title)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() =>
          navigate(
            `/teacher-course-content/${courseID}/teacher-quizzes/teacher-add-quiz`
          )
        }
        className="mt-6 border-dashed border-2 border-red-400 text-center rounded-md py-4 cursor-pointer hover:bg-red-50 transition"
      >
        <button className="text-red-600 font-semibold">+ Add Quiz</button>
      </div>
    </div>
  );
}
export default TeacherQuizzesTab;

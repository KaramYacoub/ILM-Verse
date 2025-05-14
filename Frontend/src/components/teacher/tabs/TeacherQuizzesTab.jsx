import { useNavigate, useParams } from "react-router-dom";
import { Calendar, FileText, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useTeacherStore } from "../../../store/TeacherStore";

function TeacherQuizzesTab() {
  const navigate = useNavigate();
  const { course_id } = useParams();

  const { getQuizzesForCourse, deleteQuiz } = useTeacherStore();

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await getQuizzesForCourse(course_id);
      setQuizzes(quizzes);
    };
    fetchQuizzes();
  }, [course_id, getQuizzesForCourse]);

  const handleEdit = (quiz) => {
    navigate(
      `/teacher-course-content/${course_id}/teacher-quizzes/teacher-add-quiz`,
      { state: { quiz } }
    );
  };

  const handleDelete = async (quiz_id) => {
    try {
      await deleteQuiz(quiz_id);
      setQuizzes((prev) => prev.filter((q) => q._id !== quiz_id));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      {quizzes.length === 0 ? (
        <p className="text-primary font-bold text-2xl text-center">
          No quizzes available.
        </p>
      ) : (
        <div className="grid gap-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl text-primary font-semibold">Quizzes</h2>
            <button
              onClick={() =>
                navigate(
                  `/teacher-course-content/${course_id}/teacher-quizzes/teacher-add-quiz`
                )
              }
              className="btn btn-primary"
            >
              + Add Quiz
            </button>
          </div>

          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="border border-base-300 p-4 rounded-lg shadow-sm bg-base-100 flex justify-between"
            >
              <div
                className="space-y-1 cursor-pointer"
                onClick={() => handleEdit(quiz)}
              >
                <h3 className="text-lg font-bold flex items-center gap-2 text-primary hover:underline">
                  <FileText className="w-5 h-5" />
                  {quiz.title}
                </h3>
                <p className="text-gray-700">
                  {quiz.description || "No description available."}
                </p>
                <div className="text-sm text-gray-500 flex flex-col gap-1 mt-1">
                  <span>Total Marks: {quiz.total_points} points</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due: {new Date(quiz.start_date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Available: {new Date(
                      quiz.start_date
                    ).toLocaleDateString()}{" "}
                    at {quiz.start_time}
                  </span>
                  <span>Questions: {quiz.questions.length}</span>
                </div>
              </div>

              <div className="flex gap-2 items-center mt-1">
                <button
                  onClick={() => handleEdit(quiz)}
                  className="btn btn-sm btn-outline"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  // onClick={() => handleShowSubmit(quiz)}
                  className="btn btn-sm btn-outline btn-info"
                >
                  Show Quiz Submit
                </button>
                <button
                  onClick={() => handleDelete(quiz._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default TeacherQuizzesTab;

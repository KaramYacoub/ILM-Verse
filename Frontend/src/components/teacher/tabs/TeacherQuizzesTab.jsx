import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  FileText,
  Trash2,
  Pencil,
  BarChart2,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useTeacherStore } from "../../../store/TeacherStore";

function TeacherQuizzesTab() {
  const navigate = useNavigate();
  const { course_id } = useParams();

  const { getQuizzesForCourse, deleteQuiz } = useTeacherStore();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const quizzes = await getQuizzesForCourse(course_id);
        setQuizzes(quizzes);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
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

  const handleShowSubmit = (quiz) => {
    console.log(quiz);
    navigate(`/teacher-course-content/${course_id}/quiz-submit-status/${quiz._id}`, {
      state: { quiz },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      {quizzes.length === 0 ? (
        <div className="flex flex-col gap-5">
          <p className="text-primary font-bold text-2xl text-center">
            No quizzes available.
          </p>
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

              <div className="space-y-3 self-center">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(quiz)}
                    className="btn btn-sm btn-outline btn-primary gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleShowSubmit(quiz)}
                    className="btn btn-sm btn-outline btn-info gap-2"
                  >
                    <BarChart2 className="w-4 h-4" />
                    Submissions
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="btn btn-sm btn-outline btn-error gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button
                    // onClick={() => handlePublishMarks(quiz)}
                    className="btn btn-sm btn-outline btn-success gap-2"
                  >
                    Publish Marks
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default TeacherQuizzesTab;

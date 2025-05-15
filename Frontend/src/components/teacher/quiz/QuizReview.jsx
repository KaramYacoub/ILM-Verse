import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTeacherStore } from "../../../store/TeacherStore";
import TeacherNavbar from "../TeacherNavbar";
import { Loader2 } from "lucide-react";

export default function QuizReview() {
  const { course_id, quiz_id, student_id } = useParams();
  const location = useLocation();

  const { getQuizById, getStudentQuizMark } = useTeacherStore();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentSubmission, setStudentSubmission] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.quiz) {
      setQuiz(location.state.quiz);
    }
  }, [location.state]);

  // Load quiz data and student submission
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);

        const submission = await getStudentQuizMark(
          course_id,
          quiz_id,
          student_id
        );

        if (submission) {
          setStudentSubmission(submission);
        }
      } catch (err) {
        console.error("Error fetching quiz data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [course_id, quiz_id, student_id, getQuizById, getStudentQuizMark]);

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNavigateTo = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  if (!quiz) return <div>No quiz data found</div>;
  if (!studentSubmission)
    return <div>No submission found for this student</div>;

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentSubmission = studentSubmission.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-start pb-5">
      <TeacherNavbar />

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">{quiz.title}</h1>
            <p className="text-gray-600">
              Reviewing submission for: {student_id}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="font-bold">
              Final Mark: {studentSubmission.mark} / {quiz.total_points}
            </p>
          </div>
        </div>

        {/* Student Info */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-2">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Student ID:</p>
              <p>{student_id}</p>
            </div>
            <div>
              <p className="font-medium">Submitted At:</p>
              <p>{new Date(studentSubmission.submited_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium">Final Grade:</p>
              <p>
                {studentSubmission.mark !== undefined
                  ? `${studentSubmission.mark} / ${quiz.total_points}`
                  : "Not graded"}
              </p>
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-base-100 p-4 rounded-lg flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {quiz.questions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleNavigateTo(index)}
                className={`w-10 h-10 rounded-full font-bold ${
                  currentQuestionIndex === index
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="btn btn-secondary"
              disabled={currentQuestionIndex <= 0}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="btn btn-secondary"
              disabled={currentQuestionIndex >= totalQuestions - 1}
            >
              Next
            </button>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center gap-4 mb-4">
            <p className="text-lg font-semibold">
              {currentSubmission?.question_text}
            </p>
            <span className="badge badge-primary">
              {currentQuestion.points} points
            </span>
          </div>

          <div className="ml-6 space-y-4">
            {/* Student's Answer */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">
                Student's Answer:
              </h3>
              <div
                className={`${
                  currentSubmission.choosed_answer ===
                  currentSubmission.correct_answer
                    ? "bg-success"
                    : "bg-error"
                } p-4 rounded-lg`}
              >
                <p className="font-medium">
                  {currentSubmission?.choosed_answer || "No answer provided"}
                </p>
                {currentSubmission?.choosed_answer && (
                  <p className={`mt-2 text-base-100`}>
                    {currentSubmission.choosed_answer ===
                    currentSubmission.correct_answer
                      ? "Correct Answer"
                      : "Incorrect Answer"}
                  </p>
                )}
              </div>
            </div>

            {/* Correct Answer */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">
                Correct Answer:
              </h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-medium">
                  {currentSubmission?.correct_answer}
                </p>
              </div>
            </div>

            {/* Points Earned */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Points Earned:</h3>
              <div className="flex items-center gap-4">
                <p className="font-bold">
                  {currentSubmission?.choosed_answer ===
                  currentSubmission?.correct_answer
                    ? currentQuestion.points
                    : 0}{" "}
                  / {currentQuestion.points}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

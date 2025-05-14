import { useState } from "react";
import { Plus } from "lucide-react";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import QuizDetailsForm from "./quiz/QuizDetailsForm";
import QuestionItem from "./quiz/QuestionItem";
import { useTeacherStore } from "../../store/TeacherStore";
import { useLocation, useParams } from "react-router-dom";

function TeacherAddQuiz() {
  const { course_id } = useParams();
  const { addQuiz, editQuiz } = useTeacherStore();
  const location = useLocation();
  const existingQuiz = location.state?.quiz;

  const [quizData, setQuizData] = useState(
    existingQuiz
      ? {
          quizTitle: existingQuiz.title,
          description: existingQuiz.description,
          startDate: existingQuiz.start_date.split("T")[0],
          startTime: existingQuiz.start_time,
          duration: existingQuiz.duration.toString(),
          totalPoints: existingQuiz.total_points.toString(),
          questions: existingQuiz.questions.map((q) => ({
            id: q._id,
            question: q.question_text,
            choices: q.options.map((opt) => opt.option_text),
            points: q.points,
            correctAnswerIndex: q.options.findIndex(
              (opt) => opt.isCorrectAnswer
            ),
          })),
          editingQuestionID: null,
        }
      : {
          quizTitle: "",
          description: "",
          startDate: "",
          startTime: "",
          duration: "",
          totalPoints: "",
          questions: [],
          editingQuestionID: null,
        }
  );

  const updateQuizDetails = (field, value) => {
    setQuizData({
      ...quizData,
      [field]: value,
    });
  };

  const addQuestion = () => {
    const newID = Date.now().toString();

    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          id: newID,
          question: "",
          choices: ["", "", "", ""],
          points: 5,
          correctAnswerIndex: 0,
        },
      ],
    });
  };

  const removeQuestion = (id) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.filter((question) => question.id !== id),
    });
  };

  const updateQuestion = (updatedQuestion) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingQuiz) {
        await editQuiz(existingQuiz._id, quizData);
      } else {
        await addQuiz(course_id, quizData);
      }
      window.history.back();
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <TeacherNavbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-base-100 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            Add New Quiz
          </h1>

          <form onSubmit={handleSubmit}>
            <QuizDetailsForm
              quizData={quizData}
              updateQuizDetails={updateQuizDetails}
            />

            {quizData.questions.length === 0 ? (
              <div className="py-8">
                <p className="text-gray-500 mb-4 text-center">
                  No questions added yet
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addQuestion}
                >
                  <Plus size={18} className="mr-1" /> Add First Question
                </button>
              </div>
            ) : (
              <>
                {quizData.questions.map((question, index) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    index={index}
                    updateQuestion={updateQuestion}
                    removeQuestion={removeQuestion}
                  />
                ))}
                <button
                  type="button"
                  className="btn btn-outline mb-6 w-full md:w-auto"
                  onClick={addQuestion}
                >
                  <Plus size={18} className="mr-1" /> Add Another Question
                </button>
              </>
            )}

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => {
                  window.history.back();
                }}
                type="button"
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherAddQuiz;

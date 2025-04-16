import { useState } from "react";
import { Plus } from "lucide-react";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import QuizDetailsForm from "./quiz/QuizDetailsForm";
import QuestionItem from "./quiz/QuestionItem";

function TeacherAddQuiz() {
  const [quizData, setQuizData] = useState({
    quizTitle: "",
    description: "",
    startDate: "2025-04-20",
    startTime: "14:30",
    duration: "15",
    totalPoints: "5",
    questions: [],
    editingQuestionID: null,
  });

  const updateQuizDetails = (field, value) => {
    setQuizData({
      ...quizData,
      [field]: value,
    });
  };

  const addQuestion = () => {
    const newID =
      quizData.questions.length > 0
        ? Math.max(...quizData.questions.map((q) => q.id)) + 1
        : 1;

    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          id: newID,
          question: "",
          choices: ["", "", "", ""],
          points: 5,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(quizData);
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

            {/* Questions */}
            {quizData.questions.length === 0 ? (
              <div className="py-8">
                <p className="text-gray-500 mb-4 text-center ">
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
              <button
                onClick={() => {
                  window.history.back();
                }}
                type="submit"
                className="btn btn-primary"
              >
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

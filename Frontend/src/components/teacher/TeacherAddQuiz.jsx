import { useState } from "react";
import { Plus } from "lucide-react";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import QuizDetailsForm from "./quiz/QuizDetailsForm";
import QuestionItem from "./quiz/QuestionItem";
import { useTeacherStore } from "../../store/TeacherStore";
import { useLocation, useParams } from "react-router-dom";
import SuccessModal from "../../components/shared/SuccessModal";
import ErrorModal from "../../components/shared/ErrorModal";
import ConfirmModal from "../../components/shared/ConfirmModal";

function TeacherAddQuiz() {
  const { course_id } = useParams();
  const { addQuiz, editQuiz } = useTeacherStore();
  const location = useLocation();
  const existingQuiz = location.state?.quiz;

  // Modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [actionCallback, setActionCallback] = useState(null);

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

  const confirmRemoveQuestion = (id) => {
    setModalMessage("Are you sure you want to delete this question?");
    setShowConfirmModal(true);
    setActionCallback(() => () => removeQuestion(id));
  };

  const removeQuestion = (id) => {
    try {
      setQuizData({
        ...quizData,
        questions: quizData.questions.filter((question) => question.id !== id),
      });
      setModalMessage("Question deleted successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      setModalMessage("Failed to delete question. Please try again.");
      setShowErrorModal(true);
    }
  };

  const updateQuestion = (updatedQuestion) => {
    try {
      setQuizData({
        ...quizData,
        questions: quizData.questions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        ),
      });
      setModalMessage("Question updated successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      setModalMessage("Failed to update question. Please try again.");
      setShowErrorModal(true);
    }
  };

  const validateQuiz = () => {
    if (!quizData.quizTitle.trim()) {
      setModalMessage("Quiz title is required");
      setShowErrorModal(true);
      return false;
    }

    if (!quizData.startDate || !quizData.startTime) {
      setModalMessage("Start date and time are required");
      setShowErrorModal(true);
      return false;
    }

    if (!quizData.duration || isNaN(quizData.duration)) {
      setModalMessage("Please enter a valid duration");
      setShowErrorModal(true);
      return false;
    }

    if (quizData.questions.length === 0) {
      setModalMessage("Please add at least one question");
      setShowErrorModal(true);
      return false;
    }

    for (const question of quizData.questions) {
      if (!question.question.trim()) {
        setModalMessage("All questions must have text");
        setShowErrorModal(true);
        return false;
      }

      if (question.choices.some(choice => !choice.trim())) {
        setModalMessage("All answer choices must be filled");
        setShowErrorModal(true);
        return false;
      }

      if (isNaN(question.points)) {
        setModalMessage("All questions must have valid points");
        setShowErrorModal(true);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateQuiz()) return;

    try {
      if (existingQuiz) {
        await editQuiz(existingQuiz._id, quizData);
        setModalMessage("Quiz updated successfully!");
      } else {
        await addQuiz(course_id, quizData);
        setModalMessage("Quiz created successfully!");
      }
      setShowSuccessModal(true);
      // Wait for modal to show before navigating back
      setTimeout(() => window.history.back(), 1500);
    } catch (error) {
      console.error("Error saving quiz:", error);
      setModalMessage(
        error.response?.data?.message || "Failed to save quiz. Please try again."
      );
      setShowErrorModal(true);
    }
  };

  const handleConfirmAction = () => {
    if (actionCallback) {
      actionCallback();
    }
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <TeacherNavbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-base-100 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            {existingQuiz ? "Edit Quiz" : "Add New Quiz"}
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
                    removeQuestion={confirmRemoveQuestion}
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

      {/* Modals */}
      <SuccessModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        successMessage={modalMessage}
      />
      <ErrorModal
        showErrorModal={showErrorModal}
        setShowErrorModal={setShowErrorModal}
        errorMessage={modalMessage}
      />
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        message={modalMessage}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

export default TeacherAddQuiz;
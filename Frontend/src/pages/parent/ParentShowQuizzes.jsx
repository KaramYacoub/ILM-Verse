import ParentNavBar from "../../components/parent/ParentNavBar";
import { useState } from "react";

function ParentShowQuizzes() {
  const [children] = useState([
    {
      id: 1,
      name: "Anas Ghnaim",
      quizzes: [
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
          status: "Completed",
          grad: "78%",
        },
      ],
    },
    {
      id: 2,
      name: "Hamzah Ghnaim",
      quizzes: [
        {
          id: 1,
          course: "Computer Science",
          title: "Loops & Conditions",
          totalQuestions: 12,
          points: 24,
          Date: "2025-04-18",
          startAt: "01:00 PM",
          endAt: "02:00 PM",
          status: "Completed",
          grad: "92%",
        },
        {
          id: 2,
          course: "Chemistry",
          title: "Periodic Table Quiz",
          totalQuestions: 15,
          points: 30,
          Date: "2025-04-20",
          startAt: "11:00 AM",
          endAt: "12:00 PM",
          status: "Not available",
          grad: "N/A",
        },
      ],
    },
    {
      id: 3,
      name: "Mohammad Ghnaim",
      quizzes: [
        {
          id: 1,
          course: "Biology",
          title: "Cell Structure Quiz",
          totalQuestions: 10,
          points: 20,
          Date: "2025-04-22",
          startAt: "10:30 AM",
          endAt: "11:15 AM",
          status: "Not Started",
        },
        {
          id: 2,
          course: "History",
          title: "World War II Quiz",
          totalQuestions: 8,
          points: 16,
          Date: "2025-04-15",
          startAt: "02:00 PM",
          endAt: "02:45 PM",
          status: "Completed",
          grad: "85%",
        },
      ],
    },
  ]);

  const [selectedChildId, setSelectedChildId] = useState(children[0].id);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedChild = children.find((child) => child.id === selectedChildId);

  const openQuizModal = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Not Started":
        return (
          <span className="badge badge-warning text-base-100">{status}</span>
        );
      case "Not available":
        return (
          <span className="badge badge-error text-base-100">{status}</span>
        );
      case "Completed":
        return (
          <span className="badge badge-success text-base-100">{status}</span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <ParentNavBar />

      <div className="w-full max-w-6xl px-5 mt-10">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-primary">Student Quizzes</h1>
          <select
            value={selectedChildId}
            onChange={(e) => setSelectedChildId(Number(e.target.value))}
            className="select select-bordered w-64 text-lg font-medium
                      border-2 rounded-xl shadow-sm
                      focus:outline-none focus:border-primary
                      bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')]
                      bg-no-repeat bg-[right_1rem_center] cursor-pointer"
          >
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-base-100 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            {selectedChild.name}'s Quizzes
          </h2>

          <div className="overflow-x-auto rounded-xl">
            <table className="table table-zebra w-full">
              <thead className="bg-primary text-base-100">
                <tr>
                  <th>Course</th>
                  <th>Quiz Title</th>
                  <th>Points</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Grade</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {selectedChild.quizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover">
                    <td>{quiz.course}</td>
                    <td>{quiz.title}</td>
                    <td>{quiz.points}</td>
                    <td>{quiz.Date}</td>
                    <td>
                      {quiz.startAt} - {quiz.endAt}
                    </td>
                    <td>{getStatusBadge(quiz.status)}</td>
                    <td>{quiz.grad || "N/A"}</td>
                    <td>
                      <button
                        onClick={() => openQuizModal(quiz)}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quiz Details Modal */}
      <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl">
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-2xl text-primary mb-2">
            {selectedQuiz?.title}
          </h3>
          <div className="divider my-1"></div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Course:</h4>
                <p>{selectedQuiz?.course}</p>
              </div>
              <div>
                <h4 className="font-semibold">Date:</h4>
                <p>{selectedQuiz?.Date}</p>
              </div>
              <div>
                <h4 className="font-semibold">Time:</h4>
                <p>
                  {selectedQuiz?.startAt} - {selectedQuiz?.endAt}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Total Points:</h4>
                <p>{selectedQuiz?.points}</p>
              </div>
              <div>
                <h4 className="font-semibold">Status:</h4>
                {getStatusBadge(selectedQuiz?.status)}
              </div>
              <div>
                <h4 className="font-semibold">Grade:</h4>
                <p>{selectedQuiz?.grad || "N/A"}</p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button onClick={closeModal} className="btn btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentShowQuizzes;

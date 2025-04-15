import { useLocation } from "react-router-dom";
import { Calendar, FileText, Trash2, Download, X } from "lucide-react";
import { useState } from "react";

export default function TeacherAssignmentsTab() {
  const location = useLocation();
  const unit = location.state?.unit;
  const [assignments, setAssignments] = useState(unit?.assignments || []);
  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: "",
  });

  const handleDownload = (title) => {
    // Replace with actual file download logic
    alert(`Downloading: ${title}`);
  };

  const handleDelete = (title) => {
    setAssignments((prev) => prev.filter((a) => a.title !== title));
  };

  const handleAddAssignment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAssignment({
      title: "",
      description: "",
      dueDate: "",
      points: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAssignment = () => {
    if (!newAssignment.title) {
      alert("Assignment title is required");
      return;
    }

    setAssignments((prev) => [
      ...prev,
      {
        title: newAssignment.title,
        description: newAssignment.description,
        dueDate: newAssignment.dueDate || "No due date",
        points: newAssignment.points || "0",
      },
    ]);

    handleCloseModal();
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      {assignments.length === 0 ? (
        <p className="text-primary font-bold text-2xl text-center">
          No assignments available.
        </p>
      ) : (
        <div className="grid gap-4 mb-6">
          <h2 className="text-3xl text-primary font-semibold">Assignments</h2>

          {assignments.map((assignment, idx) => (
            <div
              key={idx}
              className="border border-base-300 p-4 rounded-lg shadow-sm bg-base-100 flex justify-between items-start"
            >
              <div
                className="space-y-1 cursor-pointer"
                onClick={() => handleDownload(assignment.title)}
              >
                <h3 className="text-lg font-bold flex items-center gap-2 text-primary hover:underline">
                  <FileText className="w-5 h-5" />
                  {assignment.title}
                </h3>
                <p className="text-gray-700">
                  {assignment.description || "No description available."}
                </p>
                <div className="text-sm text-gray-500 flex items-center gap-6 mt-1">
                  <span>Total Marks: {assignment.points} points</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due: {assignment.dueDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => handleDownload(assignment.title)}
                  className="btn btn-sm btn-outline"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(assignment.title)}
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
        onClick={handleAddAssignment}
        className="mt-6 border-dashed border-2 border-red-400 text-center rounded-md py-4 cursor-pointer hover:bg-red-50 transition"
      >
        <button className="text-red-600 font-semibold">+ Add Assignment</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg text-primary font-semibold">
                Add New Assignment
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={newAssignment.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Enter assignment title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={newAssignment.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter description"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline:
                </label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  value={newAssignment.dueDate}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Points:
                </label>
                <input
                  type="number"
                  name="points"
                  value={newAssignment.points}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Enter maximum points"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Media:
                </label>
                <button className="btn btn-outline w-full">Choose File</button>
              </div>
            </div>

            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={handleCloseModal} className="btn btn-ghost">
                Cancel
              </button>
              <button
                onClick={handleSaveAssignment}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

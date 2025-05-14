import { useNavigate, useParams } from "react-router-dom";
import { Calendar, FileText, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTeacherStore } from "../../../store/TeacherStore";

export default function TeacherAssignmentsTab() {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const {
    assignments,
    TeacherGetAssignment,
    TeacherAddAssignment,
    TeacherDelteAssignment,
    downloadAssignments,
  } = useTeacherStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        await TeacherGetAssignment(course_id);
      } catch (error) {
        console.error("Failed to load assignments:", error);
      }
    };

    fetchAssignments();
  }, [course_id, TeacherGetAssignment]);

  const handleDeleteAssignment = async (assignment_id) => {
    try {
      if (window.confirm("are you sure you want to delete this assignment?")) {
        await TeacherDelteAssignment(course_id, assignment_id);
        await TeacherGetAssignment(course_id);
        alert("Assignment deleted successfully");
      }
    } catch (error) {
      alert("Failed to deleting assignment", error);
    }
  };

  const handleAddAssignment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAssignment({ title: "", description: "", dueDate: "" });
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSaveAssignment = async () => {
    if (!newAssignment.title || !selectedFile) {
      alert("Title and file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newAssignment.title);
    formData.append("description", newAssignment.description);
    formData.append("end_at", newAssignment.dueDate);
    formData.append("media", selectedFile);

    try {
      const response = await TeacherAddAssignment(course_id, formData);
      if (response.status === 200) {
        await TeacherGetAssignment(course_id);
        handleCloseModal();
      }
    } catch (error) {
      console.error(
        "Error adding assignment:",
        error.response?.data?.error || error.message
      );
      alert("Error saving assignment.");
    }
  };

  const getFileType = (mimeType) => {
    if (mimeType.includes("video")) return "Video";
    if (mimeType.includes("pdf")) return "PDF";
    if (mimeType.includes("word") || mimeType.includes("msword")) return "DOC";
    return mimeType.split("/")[1]?.toUpperCase() || "File";
  };

  const handleDownload = (assigment) => {
    downloadAssignments(
      assigment.path.split("/").pop(),
      `${assigment.title}.${getFileType(assigment.type).toLowerCase()}`
    );
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      {assignments.length === 0 ? (
        <p className="text-primary font-bold text-2xl text-center">
          No assignments available.
        </p>
      ) : (
        <div className="grid gap-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl text-primary font-semibold">Assignments</h2>
            <button onClick={handleAddAssignment} className="btn btn-primary">
              + Add Assignment
            </button>
          </div>
          {assignments.map((assignment, i) => (
            <div
              key={i}
              className="border border-base-300 p-4 rounded-lg shadow-sm bg-base-100 flex justify-between items-center"
            >
              <div className="space-y-1 cursor-pointer">
                <button
                  onClick={() => handleDownload(assignment)}
                  className="text-lg font-bold flex items-center gap-2 text-primary hover:underline"
                >
                  <FileText className="w-5 h-5" />
                  {assignment.title || `Untitled`}
                </button>
                <p className="text-gray-700">
                  {assignment.description || "No description available."}
                </p>
                <div className="text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due: {assignment.end_at || "No due date"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(
                      `/teacher-course-content/${course_id}/assignment-detail`,
                      {
                        state: { assignment },
                      }
                    )
                  }
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Show submission
                </button>
                <button
                  onClick={() => handleDeleteAssignment(assignment._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* add assignment modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                  type="date"
                  name="dueDate"
                  value={newAssignment.dueDate}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="form-control w-full">
                  <span className="label-text mb-1 font-medium">
                    Upload File
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="file-input file-input-bordered w-full"
                    onChange={handleFileChange}
                  />
                </label>
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

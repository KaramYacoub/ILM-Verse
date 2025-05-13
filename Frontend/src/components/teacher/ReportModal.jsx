import { useState } from "react";
import { useTeacherStore } from "../../store/TeacherStore";
import { useParams } from "react-router-dom";

function ReportModal({ isOpen, onClose, student }) {
  const { course_id } = useParams();
  const { addReport } = useTeacherStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAddReport = async (title, date, description) => {
    try {
      console.log(course_id, student.id, title, description, date);
      await addReport(course_id, student.id, title, description, date);
      setTitle("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
      alert("Report added successfully!");
    } catch (error) {
      console.log(
        "Error adding report from teacher in the modal: ",
        error.response?.data?.error || error.message
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl shadow-xl space-y-4">
        <h2 className="text-2xl text-primary font-bold mb-5">
          Student Report Form
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">title:</label>
            <input
              className="input input-bordered w-full"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">Student Name:</label>
            <div className="bg-gray-200 p-3 rounded-md text-center">
              {student.name}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Date (MM/DD/YYYY):</label>
            <input
              type="date"
              className="input input-bordered w-full text-center"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="font-medium">Description:</label>
          <textarea
            className="textarea textarea-bordered w-full h-32"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-10">
          <button
            className="btn flex-1 bg-gray-300 hover:bg-gray-400"
            onClick={() => {
              setDescription("");
              setDate(new Date().toISOString().split("T")[0]);
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              handleAddReport(title, date, description);
              onClose();
            }}
            className="btn flex-1 bg-primary text-white"
          >
            Generate
          </button>
        </div>

        <div className="text-right">
          <button className="text-md text-red-500 mt-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default ReportModal;

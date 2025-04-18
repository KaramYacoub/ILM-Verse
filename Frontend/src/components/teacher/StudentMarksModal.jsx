import { useState } from "react";

function StudentMarksModal({ isOpen, onClose, student, course }) {
  const [activeTerm, setActiveTerm] = useState("Term 1");
  const [marks, setMarks] = useState({
    "Term 1": [{ max: 40, obtained: 28 }],
    "Term 2": [{ max: 40, obtained: 0 }],
    "Term 3": [{ max: 40, obtained: 0 }],
    Final: [{ type: "Final Exam", max: 80, obtained: 0 }],
  });

  // Handle mark changes
  const handleMarkChange = (index, value) => {
    const updatedMarks = { ...marks };
    const currentTermData = [...updatedMarks[activeTerm]];

    // Update obtained marks
    currentTermData[index] = {
      ...currentTermData[index],
      obtained: value,
    };

    updatedMarks[activeTerm] = currentTermData;
    setMarks(updatedMarks);
  };

  const handleSave = () => {
    console.log("Saving marks:", { student, course, marks });
    onClose();
  };

  const handleReset = () => {
    const updatedMarks = { ...marks };
    const currentTermData = updatedMarks[activeTerm].map((item) => ({
      ...item,
      obtained: "",
    }));

    updatedMarks[activeTerm] = currentTermData;
    setMarks(updatedMarks);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Enter Marks: {student} - {course}
        </h2>

        {/* Term selector */}
        <div className="flex flex-1 items-center gap-2 mb-6 bg-gray-100 p-4 rounded-lg">
          {Object.keys(marks).map((term) => (
            <button
              key={term}
              className={`px-4 py-2 rounded-md flex flex-auto ${
                activeTerm === term
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setActiveTerm(term)}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Marks table */}
        <div className="overflow-x-auto">
          <table className="table w-full mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-center">Max Marks</th>
                <th className="text-center">Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {marks[activeTerm].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="text-center">{item.max}</td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="input input-bordered w-full max-w-xs"
                      value={item.obtained}
                      onChange={(e) => handleMarkChange(index, e.target.value)}
                      min="0"
                      max={item.max}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-outline" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentMarksModal;

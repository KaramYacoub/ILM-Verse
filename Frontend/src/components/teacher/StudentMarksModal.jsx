import { useState } from "react";
import { Edit } from "lucide-react";

function StudentMarksModal({ isOpen, onClose, student, course }) {
  const [activeTerm, setActiveTerm] = useState("Term 1");
  const [marks, setMarks] = useState({
    "Term 1": [
      { type: "Quizzes", max: 20, obtained: 18, grade: "A" },
      { type: "Assignments", max: 30, obtained: 25, grade: "B+" },
      { type: "Mid-Term Exam", max: 50, obtained: 42, grade: "B+" },
    ],
    "Term 2": [
      { type: "Quizzes", max: 20, obtained: "", grade: "" },
      { type: "Assignments", max: 30, obtained: "", grade: "" },
      { type: "Mid-Term Exam", max: 50, obtained: "", grade: "" },
    ],
    "Term 3": [
      { type: "Quizzes", max: 20, obtained: "", grade: "" },
      { type: "Assignments", max: 30, obtained: "", grade: "" },
      { type: "Mid-Term Exam", max: 50, obtained: "", grade: "" },
    ],
    Final: [{ type: "Final Exam", max: 100, obtained: "", grade: "" }],
  });
  const [comments, setComments] = useState("");

  // Calculate grade based on obtained marks
  const calculateGrade = (obtained, max) => {
    if (!obtained) return "";
    const percentage = (obtained / max) * 100;

    if (percentage >= 90) return "A";
    if (percentage >= 80) return "A-";
    if (percentage >= 75) return "B+";
    if (percentage >= 70) return "B";
    if (percentage >= 65) return "B-";
    if (percentage >= 60) return "C+";
    if (percentage >= 55) return "C";
    if (percentage >= 50) return "C-";
    if (percentage >= 45) return "D+";
    if (percentage >= 40) return "D";
    return "F";
  };

  // Calculate total for active term
  const calculateTotal = () => {
    const termData = marks[activeTerm];
    if (!termData) return { total: 0, max: 0, grade: "" };

    let totalObtained = 0;
    let totalMax = 0;

    termData.forEach((item) => {
      totalObtained += Number(item.obtained) || 0;
      totalMax += Number(item.max) || 0;
    });

    const grade = calculateGrade(totalObtained, totalMax);
    return { total: totalObtained, max: totalMax, grade };
  };

  // Handle mark changes
  const handleMarkChange = (index, value) => {
    const updatedMarks = { ...marks };
    const currentTermData = [...updatedMarks[activeTerm]];

    // Update obtained marks
    currentTermData[index] = {
      ...currentTermData[index],
      obtained: value,
      grade: calculateGrade(value, currentTermData[index].max),
    };

    updatedMarks[activeTerm] = currentTermData;
    setMarks(updatedMarks);
  };

  // Handle save
  const handleSave = () => {
    console.log("Saving marks:", { student, course, marks, comments });
    // Here you would typically call an API to save the data
    onClose();
  };

  // Reset form
  const handleReset = () => {
    // Reset current term's marks
    const updatedMarks = { ...marks };
    const currentTermData = updatedMarks[activeTerm].map((item) => ({
      ...item,
      obtained: "",
      grade: "",
    }));

    updatedMarks[activeTerm] = currentTermData;
    setMarks(updatedMarks);
    setComments("");
  };

  if (!isOpen) return null;

  const { total, max, grade } = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Enter Marks: {student} - {course}
        </h2>

        {/* Term selector */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-4 rounded-lg">
          {Object.keys(marks).map((term) => (
            <button
              key={term}
              className={`px-4 py-2 rounded-md ${
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
                <th className="text-left">Assessment Type</th>
                <th className="text-center">Max Marks</th>
                <th className="text-center">Obtained Marks</th>
                <th className="text-center">Grade</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {marks[activeTerm].map((item, index) => (
                <tr key={index} className="border-b">
                  <td>{item.type}</td>
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
                  <td className="text-center">{item.grade}</td>
                  {/* <td className="text-center">
                    <button className="btn btn-square btn-ghost">
                      <Edit size={16} />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td colSpan={4} className="text-right">
                  {activeTerm} Total: {total}/{max}
                </td>
                {/* <td className="text-center">Grade: {grade}</td> */}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label className="font-bold block mb-2">Comments:</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
          />
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

import { useState } from "react";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";

function TakeAbsence() {
  const [selectedDate, setSelectedDate] = useState("");
  const [absentStudents, setAbsentStudents] = useState([]);

  // Example: this data would usually come from API based on logged-in teacher
  const students = [
    { id: 1, name: "Omar Khalid" },
    { id: 2, name: "Lina Ahmed" },
    { id: 3, name: "Yousef Mansour" },
    { id: 4, name: "Sara Nabil" },
  ];

  const toggleAbsence = (studentId) => {
    setAbsentStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const data = {
      date: selectedDate,
      absentStudents,
    };

    console.log("Absence submitted:", data);
    alert("Absence has been recorded.");
  };

  return (
    <>
      <TeacherNavbar />

      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">Take Absence</h1>

        <div className="mb-6">
          <label className="font-medium mb-1 block">Select Date</label>
          <input
            type="date"
            className="input input-bordered w-full md:w-1/2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="bg-base-100 p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Mark Absence</h2>
          <ul className="space-y-2">
            {students.map((student) => (
              <li key={student.id} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={absentStudents.includes(student.id)}
                  onChange={() => toggleAbsence(student.id)}
                />
                <span>{student.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="btn btn-primary mt-6 w-full md:w-1/2"
          onClick={handleSubmit}
        >
          Submit Absence
        </button>
      </div>
    </>
  );
}

export default TakeAbsence;

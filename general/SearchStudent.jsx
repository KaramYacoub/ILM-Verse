import { useState } from "react";

function SearchStudent({ students, onEditGrades }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editingGrades, setEditingGrades] = useState(null);
  const [tempGrades, setTempGrades] = useState({
    exam1: "",
    exam2: "",
    exam3: "",
    final: "",
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = students.filter(
        (student) =>
          student.name.toLowerCase().includes(term.toLowerCase()) ||
          student.id.toString().includes(term)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const startEditing = (studentId, currentGrades) => {
    setEditingGrades(studentId);
    setTempGrades(currentGrades);
  };

  const cancelEditing = () => {
    setEditingGrades(null);
    setTempGrades({ exam1: "", exam2: "", exam3: "", final: "" });
  };

  const handleGradeChange = (e, exam) => {
    const value = e.target.value;
    const maxScore = exam === "final" ? 40 : 20;
    if (
      value === "" ||
      (/^\d+$/.test(value) && value >= 0 && value <= maxScore)
    ) {
      setTempGrades((prev) => ({ ...prev, [exam]: value }));
    }
  };

  const saveGrades = (studentId) => {
    const exam1 = parseInt(tempGrades.exam1) || 0;
    const exam2 = parseInt(tempGrades.exam2) || 0;
    const exam3 = parseInt(tempGrades.exam3) || 0;
    const final = parseInt(tempGrades.final) || 0;
    const total = exam1 + exam2 + exam3 + final;

    onEditGrades(studentId, { exam1, exam2, exam3, final }, total);
    setEditingGrades(null);
    setTempGrades({ exam1: "", exam2: "", exam3: "", final: "" });
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by student name or ID"
          className="input input-bordered w-full pl-10"
          value={searchTerm}
          onChange={handleSearch}
        />
        <svg
          className="absolute left-3 top-3 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Search Results Table */}
      {searchResults.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Student Search Results</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Section</th>
                  <th>Teacher</th>
                  <th>Course</th>
                  <th>Grades (20/20/20/40)</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((student) => (
                  <tr key={student.id} className="hover">
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.section}</td>
                    <td>{student.teacher}</td>
                    <td>{student.course}</td>
                    <td>
                      {editingGrades === student.id ? (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            className="input input-bordered input-sm w-12"
                            value={tempGrades.exam1}
                            onChange={(e) => handleGradeChange(e, "exam1")}
                            maxLength={2}
                          />
                          <span>/</span>
                          <input
                            type="text"
                            className="input input-bordered input-sm w-12"
                            value={tempGrades.exam2}
                            onChange={(e) => handleGradeChange(e, "exam2")}
                            maxLength={2}
                          />
                          <span>/</span>
                          <input
                            type="text"
                            className="input input-bordered input-sm w-12"
                            value={tempGrades.exam3}
                            onChange={(e) => handleGradeChange(e, "exam3")}
                            maxLength={2}
                          />
                          <span>/</span>
                          <input
                            type="text"
                            className="input input-bordered input-sm w-12"
                            value={tempGrades.final}
                            onChange={(e) => handleGradeChange(e, "final")}
                            maxLength={2}
                          />
                        </div>
                      ) : (
                        <span className="font-semibold">
                          {student.grades.exam1}/{student.grades.exam2}/
                          {student.grades.exam3}/{student.grades.final}
                        </span>
                      )}
                    </td>
                    <td className="font-bold">{student.total}/100</td>
                    <td>
                      {editingGrades === student.id ? (
                        <div className="flex space-x-2">
                          <button
                            className="btn btn-success btn-xs"
                            onClick={() => saveGrades(student.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() =>
                            startEditing(student.id, student.grades)
                          }
                        >
                          Edit Grades
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchStudent;

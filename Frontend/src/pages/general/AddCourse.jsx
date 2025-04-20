import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";

function AddCourse() {
  const grades = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];
  const sections = ["A", "B", "C"];

  const teachers = [
    {
      id: 1,
      name: "Sarah Johnson",
      subject: "Mathematics",
      grade: "Grade 10",
      section: "A",
    },
    {
      id: 2,
      name: "Michael Brown",
      subject: "Science",
      grade: "Grade 10",
      section: "B",
    },
    {
      id: 3,
      name: "Emily Davis",
      subject: "English",
      grade: "Grade 11",
      section: "A",
    },
  ];

  const allStudents = [
    { id: 1, name: "Ahmad Khalid", grade: "Grade 10", section: "A" },
    { id: 2, name: "Layla Hassan", grade: "Grade 11", section: "A" },
    { id: 3, name: "Omar Mahmoud", grade: "Grade 9", section: "B" },
    { id: 4, name: "Noor Al-Ahmad", grade: "Grade 10", section: "B" },
  ];

  // State management
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [courseName, setCourseName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  // Handle Grade selection
  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    setSelectedSection("");
    setSelectedTeacher("");
    setSelectedStudents([]);
    setFilteredStudents([]);
    setFilteredTeachers([]);
  };

  // Handle Section selection
  const handleSectionChange = (section) => {
    setSelectedSection(section);

    const filteredStud = allStudents.filter(
      (student) =>
        student.grade === selectedGrade && student.section === section
    );
    const filteredTeach = teachers.filter(
      (teacher) =>
        teacher.grade === selectedGrade && teacher.section === section
    );

    setFilteredStudents(filteredStud);
    setFilteredTeachers(filteredTeach);
    setSelectedStudents([]);
    setSelectedTeacher("");
  };

  // Toggle student selection
  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      courseName,
      grade: selectedGrade,
      section: selectedSection,
      teacher: selectedTeacher,
      students: selectedStudents,
    });
    alert("Course created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Course</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {/* Course Name */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Course Name*</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>

          {/* Grade Selection */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Grade*</label>
            <div className="flex flex-wrap gap-2">
              {grades.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => handleGradeChange(grade)}
                  className={`btn btn-sm ${
                    selectedGrade === grade ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Section Selection */}
          {selectedGrade && (
            <div className="mb-6">
              <label className="block font-medium mb-2">Section*</label>
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => handleSectionChange(section)}
                    className={`btn btn-sm ${
                      selectedSection === section ? "btn-primary" : "btn-ghost"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Teacher Selection */}
          {selectedSection && (
            <div className="mb-6">
              <label className="block font-medium mb-2">Teacher*</label>
              <select
                className="select select-bordered w-full"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select teacher
                </option>
                {filteredTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} ({teacher.subject})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Student Selection */}
          {selectedSection && filteredStudents.length > 0 && (
            <div className="mb-6">
              <label className="block font-medium mb-2">
                Students in {selectedGrade} {selectedSection}
              </label>
              <div className="border rounded-lg p-2 max-h-60 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center p-2 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      id={`student-${student.id}`}
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleStudentSelection(student.id)}
                      className="checkbox checkbox-sm mr-3"
                    />
                    <label
                      htmlFor={`student-${student.id}`}
                      className="flex-grow"
                    >
                      {student.name}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {selectedStudents.length} students selected
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                !courseName ||
                !selectedGrade ||
                !selectedSection ||
                !selectedTeacher
              }
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;

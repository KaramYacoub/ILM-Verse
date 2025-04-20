import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import SearchStudent from "../../components/general/SearchStudent";
import QuickActions from "../../components/general/QuickActions";

function GeneralDash() {
  const [activeActions, setActiveActions] = useState([]);

  // Mock student data with split grades
  const [students, setStudents] = useState([
    {
      id: 101,
      name: "Ahmed Omar",
      section: "A",
      teacher: "Mrs. Rodriguez",
      course: "Mathematics (Algebra II)",
      grades: { exam1: 20, exam2: 18, exam3: 20, final: 38 },
      total: 96,
    },
    {
      id: 102,
      name: "John Smith",
      section: "B",
      teacher: "Mr. Johnson",
      course: "Physics",
      grades: { exam1: 15, exam2: 20, exam3: 18, final: 35 },
      total: 88,
    },
  ]);

  // Quick Actions and Marks groups
  const actionGroups = [
    {
      title: "Quick Actions",
      actions: [
        { id: 1, label: "Addition", path: "/addition" },
        { id: 2, label: "Deletion", path: "/deletion" },
        { id: 3, label: "Reset Password", path: "/reset-password" },
      ],
    },
    {
      title: "Course Content Actions",
      actions: [
        { id: 4, label: "Add Course", path: "/addCourse" },
        //{ id: 5, label: "Delete content", path: "/delete-content" },
        { id: 5, label: "Courses", path: "/coursecontent" },
      ],
    },
  ];

  const toggleAction = (id) => {
    setActiveActions((prev) =>
      prev.includes(id)
        ? prev.filter((actionId) => actionId !== id)
        : [...prev, id]
    );
  };

  const handleEditGrades = (studentId, newGrades, newTotal) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, grades: newGrades, total: newTotal }
          : student
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-6xl mx-auto">
        {/* Search Student Component */}
        <SearchStudent students={students} onEditGrades={handleEditGrades} />

        {/* Quick Actions Component */}
        <QuickActions
          actionGroups={actionGroups}
          activeActions={activeActions}
          toggleAction={toggleAction}
        />
      </div>
    </div>
  );
}

export default GeneralDash;

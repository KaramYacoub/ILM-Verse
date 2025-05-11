import { Outlet } from "react-router-dom";
import StudentNavbar from "../../components/student/StudentNavbar";
import NavigationTabs from "../../components/student/StudentNavigationTabs";

// sample course data
const courseData = {
  name: "Course name",
  teacher: "teacher name",
  grade: "Grade 10",
  semester: "Fall Semester 2025",
  stats: {
    units: 3,
    lessons: 12,
    assignments: 8,
    quizzes: 5,
  },
  units: [
    {
      name: "Unit 1: Introduction to Programming",
      lessons: [
        { title: "What is Programming?", duration: 45 },
        { title: "Programming Languages Overview", duration: 30 },
        { title: "Writing Your First Program", duration: 50 },
        { title: "Debugging Basics", duration: 40 },
      ],
      assignments: [
        {
          title: "Assignment 1.1: Write Hello World",
          dueDate: "April 1, 2025",
          status: "Submitted",
          grade: "90%",
        },
        {
          title: "Assignment 1.2: Debugging Practice",
          dueDate: "April 3, 2025",
          status: "Not Submitted",
          grade: "0%",
        },
      ],
      quizzes: 1,
      resources: [
        { title: "Intro to Programming Handbook", type: "PDF" },
        { title: "Beginner Slides", type: "DOC" },
      ],
    },
    {
      name: "Unit 2: Variables and Data Types",
      lessons: [
        { title: "Variables in Programming", duration: 40 },
        { title: "Primitive Data Types", duration: 45 },
        { title: "Type Conversion", duration: 35 },
        { title: "Strings and Numbers", duration: 50 },
        { title: "Booleans and Comparisons", duration: 45 },
      ],
      assignments: [
        {
          title: "Assignment 2.1: Variables Practice",
          dueDate: "April 7, 2025",
          status: "Pending",
          grade: "submit",
        },
        {
          title: "Assignment 2.2: Data Types Quiz",
          dueDate: "April 9, 2025",
          status: "Pending",
          grade: "submit",
        },
        {
          title: "Assignment 2.3: String Challenges",
          dueDate: "April 11, 2025",
          status: "Submitted",
          grade: "85%",
        },
      ],
      quizzes: 1,
      resources: [
        { title: "Data Types Guide", type: "PDF" },
        { title: "Type Conversion Cheatsheet", type: "DOC" },
      ],
    },
    {
      name: "Unit 3: Control Structures",
      lessons: [
        { title: "If Statements", duration: 40 },
        { title: "Loops: For and While", duration: 45 },
        { title: "Nested Conditions", duration: 50 },
      ],
      assignments: [
        {
          title: "Assignment 3.1: Conditions Practice",
          dueDate: "April 14, 2025",
          status: "Pending",
          grade: "submit",
        },
        {
          title: "Assignment 3.2: Looping Tasks",
          dueDate: "April 16, 2025",
          status: "Submitted",
          grade: "100%",
        },
        {
          title: "Assignment 3.3: Control Structure Quiz",
          dueDate: "April 18, 2025",
          status: "Not Submitted",
          grade: "0%",
        },
      ],
      quizzes: 3,
      resources: [
        { title: "Control Structures Slides", type: "DOC" },
        { title: "Loop Examples PDF", type: "PDF" },
      ],
    },
  ],
};

function StudentCourseContent() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-start pb-5">
      <StudentNavbar />

      <div className="container mx-auto p-6 mt-16">
        {/* Course Header */}
        <div className="bg-primary flex flex-col items-center rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl text-accent font-bold mb-2">
            {courseData.name}
          </h1>
          <p className="text-base-100 mb-4">
            {courseData.teacher} • {courseData.grade} • {courseData.semester}
          </p>

          <p className="text-accent">
            • {courseData.stats.units} Units • {courseData.stats.lessons}{" "}
            Lessons • {courseData.stats.assignments} Assignments •{" "}
            {courseData.stats.quizzes} Quizzes
          </p>
        </div>

        {/* NavigationTabs */}
        <NavigationTabs />

        {/* Tab Content */}
        <Outlet context={{ courseData }} />
      </div>
    </div>
  );
}

export default StudentCourseContent;

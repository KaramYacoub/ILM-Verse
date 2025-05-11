import { Outlet, useLocation } from "react-router-dom";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import TeacherNavigationTabs from "../../components/teacher/TeacherNavigationTabs";
import { useEffect } from "react";
import { useTeacherStore } from "../../store/TeacherStore";
import { useState } from "react";

// sample course data
const courseContent = {
  name: "Introduction to Programming",
  teacher: "teacher name",
  grade: "Grade 10",
  semester: "Fall Semester 2025",
  stats: {
    units: 3,
    lessons: 12,
    assignments: 8,
    // numberOfQuizzes: 5,
  },
  students: [
    {
      name: "John Smith",
      email: "john.smith@email.com",
    },
    {
      name: "Jane Doe",
      email: "jane.doe@email.com",
    },
    {
      name: "Alice Johnson",
      email: "alice.j@email.com",
    },
    {
      name: "Van Whitlock",
      email: "vwhitlock0@umn.edu",
    },
    {
      name: "Devondra Botham",
      email: "dbotham1@google.ru",
    },
    {
      name: "Rozalie Buller",
      email: "rbuller3@simplemachines.org",
    },
    {
      name: "Annamaria Vose",
      email: "avose4@addtoany.com",
    },
    {
      name: "Leonardo Nelane",
      email: "lnelane5@shareasale.com",
    },
    {
      name: "Ignacio Cortin",
      email: "icortin6@prlog.org",
    },
    {
      name: "Leeanne MacTrustie",
      email: "lmactrustie7@samsung.com",
    },
    {
      name: "Virgie Oleshunin",
      email: "voleshunin8@fastcompany.com",
    },
  ],
  units: [
    {
      name: "Unit 1: Introduction to Programming",
      lessons: [
        {
          title: "What is Programming?",
          duration: 45,
          uploadedAt: "Apr 5, 2025",
        },
        {
          title: "Programming Languages Overview",
          duration: 30,
          uploadedAt: "Apr 5, 2025",
        },
        {
          title: "Writing Your First Program",
          duration: 50,
          uploadedAt: "Apr 5, 2025",
        },
        {
          title: "Debugging Basics",
          duration: 40,
          uploadedAt: "Apr 5, 2025",
        },
      ],
      assignments: [
        {
          title: "Assignment 1.1: Write Hello World",
          dueDate: "April 1, 2025",
          status: "Submitted",
          grade: "90%",
          description:
            "Write a basic Hello World program using your preferred language.",
          points: 10,
        },
        {
          title: "Assignment 1.2: Debugging Practice",
          dueDate: "April 3, 2025",
          status: "Not Submitted",
          grade: "0%",
          description:
            "Fix syntax and logical errors in a provided code snippet.",
          points: 15,
        },
      ],
      quizzes: [
        {
          title: "Intro to Programming Quiz",
          description: "Basic concepts of programming and algorithms",
          dueDate: "April 5, 2025",
          points: 20,
          startAt: "09:00 AM",
          endAt: "11:59 PM",
        },
      ],
      files: [
        {
          title: "Intro to Programming Handbook",
          type: "PDF",
          uploadedAt: "Apr 3, 2025",
          pages: 3,
        },
        {
          title: "Beginner Slides",
          type: "DOC",
          uploadedAt: "Apr 3, 2025",
          pages: 5,
        },
      ],
    },
    {
      name: "Unit 2: Variables and Data Types",
      lessons: [
        {
          title: "Variables in Programming",
          duration: 40,
          uploadedAt: "Apr 5, 2025",
        },
        {
          title: "Primitive Data Types",
          duration: 45,
          uploadedAt: "Apr 5, 2025",
        },
        { title: "Type Conversion", duration: 35, uploadedAt: "Apr 5, 2025" },
        {
          title: "Strings and Numbers",
          duration: 50,
          uploadedAt: "Apr 5, 2025",
        },
        {
          title: "Booleans and Comparisons",
          duration: 45,
          uploadedAt: "Apr 5, 2025",
        },
      ],
      assignments: [
        {
          title: "Assignment 2.1: Variables Practice",
          dueDate: "April 7, 2025",
          status: "Pending",
          grade: "submit",
          description:
            "Declare and initialize various types of variables with meaningful data.",
          points: 10,
        },
        {
          title: "Assignment 2.2: Data Types Quiz",
          dueDate: "April 9, 2025",
          status: "Pending",
          grade: "submit",
          description:
            "Answer multiple choice and short answer questions on data types.",
          points: 20,
        },
        {
          title: "Assignment 2.3: String Challenges",
          dueDate: "April 11, 2025",
          status: "Submitted",
          grade: "85%",
          description:
            "Solve string manipulation problems using basic functions.",
          points: 25,
        },
      ],
      quizzes: [
        {
          title: "Data Types Quiz",
          description: "Test your knowledge of variables and data types",
          dueDate: "April 10, 2025",
          points: 25,
          startAt: "09:00 AM",
          endAt: "11:59 PM",
        },
        {
          title: "Strings and Numbers Quiz",
          description: "Operations with strings and numeric data types",
          dueDate: "April 15, 2025",
          points: 30,
          startAt: "09:00 AM",
          endAt: "11:59 PM",
        },
      ],
      files: [
        {
          title: "Data Types Guide",
          type: "PDF",
          uploadedAt: "Apr 4, 2025",
          pages: 4,
        },
        {
          title: "Type Conversion Cheatsheet",
          type: "DOC",
          uploadedAt: "Apr 4, 2025",
          pages: 2,
        },
      ],
    },
    {
      name: "Unit 3: Control Structures",
      lessons: [
        { title: "If Statements", duration: 40, uploadedAt: "Apr 5, 2025" },
        {
          title: "Loops: For and While",
          duration: 45,
          uploadedAt: "Apr 5, 2025",
        },
        {
          title: "Nested Conditions",
          duration: 50,
          uploadedAt: "Apr 5, 2025",
        },
      ],
      assignments: [
        {
          title: "Assignment 3.1: Conditions Practice",
          dueDate: "April 14, 2025",
          status: "Pending",
          grade: "submit",
          description:
            "Write conditional statements to solve decision-making problems.",
          points: 15,
        },
        {
          title: "Assignment 3.2: Looping Tasks",
          dueDate: "April 16, 2025",
          status: "Submitted",
          grade: "100%",
          description: "Use loops to complete repetitive programming tasks.",
          points: 20,
        },
        {
          title: "Assignment 3.3: Control Structure Quiz",
          dueDate: "April 18, 2025",
          status: "Not Submitted",
          grade: "0%",
          description: "Quiz covering if-else, loops, and nested structures.",
          points: 30,
        },
      ],
      quizzes: [
        {
          title: "Conditionals Quiz",
          description: "If-else statements and logical operators",
          dueDate: "April 17, 2025",
          points: 20,
          startAt: "09:00 AM",
          endAt: "11:59 PM",
        },
        {
          title: "Loops Quiz",
          description: "For and while loops with different scenarios",
          dueDate: "April 20, 2025",
          points: 25,
          startAt: "09:00 AM",
          endAt: "11:59 PM",
        },
      ],
      files: [
        {
          title: "Control Structures Slides",
          type: "DOC",
          uploadedAt: "Apr 4, 2025",
          pages: 6,
        },
        {
          title: "Loop Examples PDF",
          type: "PDF",
          uploadedAt: "Apr 4, 2025",
          pages: 3,
        },
      ],
    },
  ],
};

function TeacherCourseContent() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const course_id = pathSegments[pathSegments.length - 2];
  const { getCourseByID } = useTeacherStore();

  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchCourseContent = async () => {
      const courseData = await getCourseByID(course_id);
      setCourse(courseData);
    };

    fetchCourseContent();
  }, [course_id, getCourseByID]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-start pb-5">
      <TeacherNavbar />
      <div className="container mx-auto p-6 mt-16">
        {/* Course Header */}
        <div className="bg-primary flex flex-col items-center rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl text-accent font-bold mb-2">
            {course.subject_name}
          </h1>
        </div>

        {/* NavigationTabs */}
        <TeacherNavigationTabs to="teacher-course-content" />

        {/* Tab Content */}
        <Outlet context={{ course }} />
      </div>
    </div>
  );
}

export default TeacherCourseContent;

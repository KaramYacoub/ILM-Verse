import { Routes, Route } from "react-router-dom";

import Home from "./pages/shared/Home";
import Footer from "./components/shared/Footer";
import StudentLogin from "./pages/shared/studentLogin";
import StaffLogin from "./pages/shared/StaffLogin";
import AboutUs from "./pages/shared/AboutUs";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentViewGrades from "./pages/student/StudentViewGrades";
import StudentEvents from "./pages/student/StudentEvents";
import StudentShowQuizzes from "./pages/student/StudentShowQuizzes";
import StudentQuizDetails from "./pages/student/StudentQuizDetails";
import StudentCourseContent from "./pages/student/StudentCourseContent";
import StudentOverviewTab from "./components/student/tabs/StudentOverviewTab";
import StudentLessonsTab from "./components/student/tabs/StudentLessonsTab";
import StudentAssignmentsTab from "./components/student/tabs/StudentAssignmentsTab";
import StudentResourcesTab from "./components/student/tabs/StudentResourcesTab";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherEvents from "./pages/teacher/teacherEvents";
import TeacherPosts from "./pages/teacher/teacherPosts";
import TeacherCourseContent from "./pages/teacher/teacherCourseContent";
import TeacherOverviewTab from "./components/teacher/tabs/TeacherOverviewTab";
import TeacherUnitContentTab from "./components/teacher/tabs/TeacherUnitContentTab";
import TeacherAssignmentsTab from "./components/teacher/tabs/TeacherAssignmentsTab";
import TeacherCoresStudentab from "./components/teacher/tabs/TeacherCourseStudentsTab";
import TeacherQuizzesTab from "./components/teacher/tabs/TeacherQuizzesTab";
import TeacherAddQuizzes from "./components/teacher/TeacherAddQuiz";

import ContactUs from "./pages/shared/ContactUs";
import GeneralDash from "./pages/general/GeneralDash";
import Addition from "./pages/general/Addition";
import Deletion from "./pages/general/Deletition";
import CourseContent from "./pages/general/CourseContent";
import GeneralPosts from "./pages/general/GeneralPosts";
import ResetPassword from "./pages/general/ResetPassword";
import DeleteContent from "./pages/general/DeleteContent";
import Settings from "./pages/general/Settings";
import GenralEvents from "./pages/general/GenralEvents";

import Posts from "./pages/shared/Posts";

function App() {
  return (
    <div data-theme="mytheme">
      <Routes>
        {/* Shared Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/events" element={<StudentEvents />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/staffLogin" element={<StaffLogin />} />

        {/* Student Routes*/}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-view-grades" element={<StudentViewGrades />} />
        <Route path="/student-show-quizzes" element={<StudentShowQuizzes />} />
        <Route path="/Student-Quiz-Details" element={<StudentQuizDetails />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/studentevents" element={<StudentEvents />} />
        <Route
          path="/student-course-content/"
          element={<StudentCourseContent />}
        >
          <Route index element={<StudentOverviewTab />} />
          <Route path="student-overview" element={<StudentOverviewTab />} />
          <Route path="student-lessons" element={<StudentLessonsTab />} />
          <Route path="student-resources" element={<StudentResourcesTab />} />
          <Route
            path="student-assignments"
            element={<StudentAssignmentsTab />}
          />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-events" element={<TeacherEvents />} />
        <Route path="/teacher-posts" element={<TeacherPosts />} />
        <Route
          path="/teacher-course-content/"
          element={<TeacherCourseContent />}
        >
          <Route index element={<TeacherOverviewTab />} />
          <Route path="teacher-overview" element={<TeacherOverviewTab />} />
          <Route
            path="teacher-unit-content"
            element={<TeacherUnitContentTab />}
          />
          <Route
            path="teacher-course-students"
            element={<TeacherCoresStudentab />}
          />
          <Route
            path="teacher-assignments"
            element={<TeacherAssignmentsTab />}
          />
          <Route path="teacher-quizzes" element={<TeacherQuizzesTab />} />
        </Route>
        <Route
          path="/teacher-course-content/teacher-quizzes/teacher-add-quiz"
          element={<TeacherAddQuizzes />}
        />

        {/* General Routes */}
        <Route path="/general-dashboard" element={<GeneralDash />} />
        <Route path="/addition" element={<Addition />} />
        <Route path="/deletion" element={<Deletion />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/general-posts" element={<GeneralPosts />} />
        <Route path="/delete-content" element={<DeleteContent />} />
        <Route path="/coursecontent" element={<CourseContent />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/general-event" element={<GenralEvents />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

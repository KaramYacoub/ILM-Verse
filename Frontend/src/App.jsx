import { Routes, Route } from "react-router-dom";
import Home from "./pages/shared/Home";
import Footer from "./components/shared/Footer";
import StudentLogin from "./pages/shared/studentLogin";
import StaffLogin from "./pages/shared/StaffLogin";
import AboutUs from "./pages/shared/AboutUs";
import StudentDashboard from "./pages/student/StudentDashboard";

import StudentCourseContent from "./pages/student/StudentCourseContent";
import OverviewTab from "./components/shared/OverviewTab";
import LessonsTab from "./components/shared/LessonsTab";
import AssignmentsTab from "./components/shared/AssignmentsTab";
import ResourcesTab from "./components/shared/ResourcesTab";

import ContactUs from "./pages/shared/ContactUs";
import Events from "./pages/shared/Events";
import GenralDash from "./pages/general/GeneralDash";
import Addition from "./pages/general/Addition";
import Deletion from "./pages/general/Deletition";
import CourseContent from "./pages/general/CourseContent";
import Posts from "./pages/general/Posts";
import ResetPassword from "./pages/general/ResetPassword";
import DeleteContent from "./pages/general/DeleteContent";
import Settings from "./pages/general/Settings";
import GenralEvents from "./pages/general/GenralEvents";
import StudentViewGrades from "./pages/student/StudentViewGrades";
import StudentShowQuizzes from "./pages/student/StudentShowQuizzes";
import StudentQuizDetails from "./pages/student/StudentQuizDetails";
function App() {
  return (
    <div data-theme="mytheme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/staffLogin" element={<StaffLogin />} />

        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/studentviewgrades" element={<StudentViewGrades />} />
        <Route path="/Studentshowquizzes" element={<StudentShowQuizzes />} />
        <Route path="/StudentQuizDetails" element={<StudentQuizDetails />} />
        <Route path="/studentcoursecontent/" element={<StudentCourseContent />}>
          <Route index element={<OverviewTab />} />
          <Route path="overview" element={<OverviewTab />} />
          <Route path="lessons" element={<LessonsTab />} />
          <Route path="assignments" element={<AssignmentsTab />} />
          <Route path="resources" element={<ResourcesTab />} />
        </Route>

        <Route path="/general-dashboard" element={<GenralDash />} />
        <Route path="/addition" element={<Addition />} />
        <Route path="/deletion" element={<Deletion />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/posts" element={<Posts />} />
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

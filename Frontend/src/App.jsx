import { Routes, Route } from "react-router-dom";
import Home from "./pages/shared/Home";
import Footer from "./components/shared/Footer";
import StudentLogin from "./pages/shared/studentLogin";
import StaffLogin from "./pages/shared/StaffLogin";
import AboutUs from "./pages/shared/AboutUs";
import StudentDashboard from "./pages/student/StudentDashboard";
import CourseContent from "./pages/student/CourseContent";
function App() {
  return (
    <div data-theme="mytheme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/staffLogin" element={<StaffLogin />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/coursecontent" element={<CourseContent />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

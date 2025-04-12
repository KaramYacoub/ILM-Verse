import { Routes, Route } from "react-router-dom";
import Home from "./pages/shared/Home";
import Footer from "./components/shared/Footer";
import StudentLogin from "./pages/shared/studentLogin";
import StaffLogin from "./pages/shared/StaffLogin";
import AboutUs from "./pages/shared/AboutUs";
import CourseCard from "./components/shared/CourseCard";
import StudentDashboard from "./pages/student/StudentDashboard";
function App() {
  return (
    <div data-theme="mytheme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/staffLogin" element={<StaffLogin />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/coursecard" element={<CourseCard />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

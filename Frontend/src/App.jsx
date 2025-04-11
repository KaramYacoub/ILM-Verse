import { Routes, Route } from "react-router-dom";
import Home from "./pages/shared/Home";
import Footer from "./components/shared/Footer";
import StudentLogin from "./pages/shared/studentLogin";
import StaffLogin from "./pages/shared/StaffLogin";
import AboutUs from "./pages/shared/AboutUs";
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
function App() {
  return (
    <div data-theme="mytheme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/staffLogin" element={<StaffLogin />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/general-dashboard" element={<GenralDash />} />
        <Route path="/addition" element={<Addition />} />
        <Route path="/deletion" element={<Deletion />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/delete-content" element={<DeleteContent />} />
        <Route path="/coursecontent" element={<CourseContent />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

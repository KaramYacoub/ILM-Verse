import {
  FaHome,
  FaCalendarAlt,
  FaComments,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

function TeacherNavbar() {
  const { isUserLoggingOut, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isUserLoggingOut) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-primary px-4 py-3 shadow-md w-full">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center">
        {/* Left: Profile */}
        <div className="flex flex-col items-center">
          <div className="avatar placeholder">
            <div className="bg-base-300 rounded-full w-10 h-10">
              <span className="text-2xl">👤</span>
            </div>
          </div>
          <span className="font-bold text-base-100">Teacher</span>
        </div>

        {/* Center: Nav Items */}
        <div className="flex gap-6 text-accent text-sm items-center">
          <Link
            to="/teacher-dashboard"
            className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
          >
            <FaHome color="#fff" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/teacher-events"
            className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
          >
            <FaCalendarAlt color="#fff" />
            <span>Events</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
          >
            <FaComments color="#fff" />
            <span>Chat</span>
          </Link>
        </div>

        {/* Right: Logout */}
        <Link
          to="/"
          onClick={handleLogout}
          className="flex items-center gap-2 text-accent font-bold cursor-pointer hover:text-yellow-500"
        >
          <FaSignOutAlt color="#fff" />
          <span>Logout</span>
        </Link>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center">
        {/* Profile - Left Side */}
        <div className="flex flex-col items-center">
          <div className="avatar placeholder">
            <div className="bg-base-300 rounded-full w-10 h-10">
              <span className="text-2xl">👤</span>
            </div>
          </div>
          <span className="font-bold text-base-100">Teacher</span>
        </div>

        {/* Hamburger Button - Right Side */}
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-primary z-50 py-4 px-6 shadow-lg">
            <div className="flex flex-col gap-4 text-accent">
              <Link
                to="/teacher-dashboard"
                className="flex items-center gap-3 py-2 cursor-pointer hover:text-yellow-500"
                onClick={toggleMenu}
              >
                <FaHome color="#fff" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/teacher-events"
                className="flex items-center gap-3 py-2 cursor-pointer hover:text-yellow-500"
                onClick={toggleMenu}
              >
                <FaCalendarAlt color="#fff" />
                <span>Events</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 py-2 cursor-pointer hover:text-yellow-500"
                onClick={toggleMenu}
              >
                <FaComments color="#fff" />
                <span>Chat</span>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 py-2 text-accent font-bold cursor-pointer hover:text-yellow-500"
                onClick={toggleMenu}
              >
                <FaSignOutAlt color="#fff" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherNavbar;

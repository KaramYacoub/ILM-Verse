import {
  FaHome,
  FaClipboardList,
  FaCalendarAlt,
  FaComments,
  FaSignOutAlt,
  FaNewspaper,
  FaCog,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function StudentNavbar() {
  return (
    <div className="bg-primary px-4 py-3 shadow-md w-full flex justify-between">
      {/* Left: Profile */}
      <div className="flex flex-col items-center">
        <div className="avatar placeholder">
          <div className="bg-base-300 rounded-full w-10 h-10">
            <span className="text-2xl">👤</span>
          </div>
        </div>
        <span className="font-bold text-base-100">Username</span>
      </div>

      {/* Center: Nav Items */}
      <div className="flex gap-6 text-accent text-sm items-center">
        {/* Dashboard */}
        <Link
          to="/teacher-dashboard"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaHome color="#fff" />
          <span>Dashboard</span>
        </Link>
        {/* Quizzes */}
        <Link
          to="/teacher-show-quizzes"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaClipboardList color="#fff" />
          <span>Quizzes</span>
        </Link>
        {/* Events */}
        <Link
          to="/events"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaCalendarAlt color="#fff" />
          <span>Events</span>
        </Link>
        {/* Posts */}
        <Link
          to="/posts"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaNewspaper color="#fff" />
          <span>Posts</span>
        </Link>
        {/* Settings */}
        <Link
          to="/settings"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaCog color="#fff" />
          <span>Settings</span>
        </Link>
        {/* Chat */}
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
        className="flex items-center gap-2 text-accent font-bold cursor-pointer hover:text-yellow-500"
      >
        <FaSignOutAlt color="#fff" />
        <span>Logout</span>
      </Link>
    </div>
  );
}

export default StudentNavbar;

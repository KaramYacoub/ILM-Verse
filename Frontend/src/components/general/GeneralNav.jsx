import {
  FaHome,
  FaCalendarAlt,
  FaNewspaper,
  FaSignOutAlt,
  FaComments,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function GeneralNav() {
  return (
    <div className="bg-primary px-4 py-3 shadow-md w-full flex justify-between items-center">
      {/* Left: Profile */}
      <div className="flex flex-col items-center">
        <div className="avatar placeholder">
          <div className="bg-base-300 rounded-full w-10 h-10">
            <span className="text-2xl">🧑‍💼</span>
          </div>
        </div>
        <span className="font-bold text-base-100">Manager</span>
      </div>

      {/* Center: Nav Items */}
      <div className="flex gap-6 text-accent text-sm items-center">
        {/* Dashboard/Home */}
        <Link
          to="/general-dashboard"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaHome color="#fff" />
          <span>Dashboard</span>
        </Link>

        {/* Posts */}
        <Link
          to="/general-posts"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaNewspaper color="#fff" />
          <span>Posts</span>
        </Link>

        {/* Events */}
        <Link
          to="/general-event"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaCalendarAlt color="#fff" />
          <span>Events</span>
        </Link>

        {/* Reports */}
        <Link
          to="/#"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaChartBar color="#fff" />
          <span>Reports</span>
        </Link>

        {/* Settings */}
        <Link
          to="/settings"
          className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
        >
          <FaCog color="#fff" />
          <span>Settings</span>
        </Link>

        {/* Chats */}
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

export default GeneralNav;
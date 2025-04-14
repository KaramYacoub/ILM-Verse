import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaInfoCircle,
  FaSignInAlt,
} from "react-icons/fa";

function HomeNav() {
  return (
    <div className="bg-primary px-4 py-3 shadow-md w-full flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/" className="btn btn-ghost px-0">
          <img
            src="/Logo-without-bg.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex gap-6 text-accent text-sm items-center">
        <Link to="/contact" className="flex items-center gap-2 hover:text-yellow-500">
          <FaEnvelope color="#fff" />
          <span>Contact Us</span>
        </Link>

        <Link to="/events" className="flex items-center gap-2 hover:text-yellow-500">
          <FaCalendarAlt color="#fff" />
          <span>Events</span>
        </Link>

        <Link to="/about us" className="flex items-center gap-2 hover:text-yellow-500">
          <FaInfoCircle color="#fff" />
          <span>About Us</span>
        </Link>
      </div>

      {/* Right: Login Dropdown */}
      <div className="text-accent font-bold">
        <details className="dropdown dropdown-end">
          <summary className="flex items-center gap-2 cursor-pointer hover:text-yellow-500">
            <FaSignInAlt color="#fff" />
            <span>Login</span>
          </summary>
          <ul className="p-2 mt-2 shadow menu dropdown-content z-[1] bg-base-100 text-neutral rounded-box w-52">
            <li>
              <Link to="/studentLogin">Login as student/parent</Link>
            </li>
            <div className="divider divider-primary my-0" />
            <li>
              <Link to="/staffLogin">Login as staff</Link>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
}

export default HomeNav;

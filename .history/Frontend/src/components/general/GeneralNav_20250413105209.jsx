import { Link } from "react-router-dom";

function GeneralNav() {
  return (
    <div className="navbar min-h-28 bg-primary">
      {/* Avatar & Admin Label */}
      <div className="flex-1 flex items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="avatar placeholder">
            <div className="bg-secondary text-neutral rounded-full w-12 h-12">
              <span className="text-xl">GA</span>
            </div>
          </div>
          <span className="text-secondary text-sm mt-1">General Admin</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center flex-1">
        <ul className="menu menu-horizontal gap-2 text-secondary">
          <li>
            <Link to="/general-dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>
            <Link to="/general-event"> events</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu button (commented out by default) */}
      {/* <div className="flex-none md:hidden">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div> */}
    </div>
  );
}

export default GeneralNav;

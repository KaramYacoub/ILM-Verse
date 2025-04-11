import { Link } from "react-router-dom";

function HomeNav() {
  return (
    <div className="navbar min-h-28 bg-primary">
      <div className="flex-1 ">
        <Link to="/">
          <img src="/Logo-without-bg.png"  className="btn btn-ghost h-fit text-xl"/>
        </Link>
      </div>

      <div className="flex justify-center flex-1">
        <ul className="menu menu-horizontal gap-2 text-secondary">
          <li>
            <Link to='/contact us'>Contact Us</Link>
          </li>
          <li>
            <Link to='/events'>Events</Link>
          </li>
          <li>
            <Link to='/about us'>About Us</Link>
          </li>
          <li>
            <details>
              <summary>Login</summary>
              <ul className="bg-base-100 z-10 text-neutral">
                <li>
                  <Link to='/studentLogin'>Login as student/parent</Link>
                </li>
                <div className="divider divider-primary m-0"></div>
                <li>
                  <Link to='/staffLogin'>Login as staff</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* Mobile menu button */}
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

export default HomeNav;

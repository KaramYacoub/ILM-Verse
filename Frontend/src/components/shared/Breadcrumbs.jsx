import { Link } from "react-router-dom";

function Breadcrumbs({ prevPages, currentPage, styles }) {
  return (
    <div className={`breadcrumbs text-md m-6 ${styles && styles}`}>
      <ul>
        {prevPages.map((page, index) => (
          <li key={index}>
            <Link to={page.path} className="font-semibold link-hover">
              {page.name}
            </Link>
          </li>
        ))}
        <li className="text-primary font-bold">{currentPage}</li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;

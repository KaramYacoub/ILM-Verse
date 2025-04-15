import { Link } from "react-router-dom";

function CourseCard({ to = "/student-course-content" }) {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-base-100 p-4 rounded-lg shadow-sm w-full">
      <div className="w-full sm:w-32 h-32 flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
        <img
          src="/Logo.png"
          alt="course name"
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-base-content mb-1">Title</h2>
        <p className="text-sm text-base-content/70 mb-3">
          Body text for whatever you'd like to say. Add main takeaway points,
          quotes, anecdotes, or even a very very short story.
        </p>
        <Link
          to={to}
          className="btn btn-sm bg-primary text-accent hover:bg-base-content rounded-md"
        >
          view course
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // add this

function SearchCourse({ courses }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate(); // initialize navigator

  const categories = [
    "All",
    "KG",
    "Primary",
    "Intermediate Male",
    "Intermediate Female",
  ];

  const filteredCourses = courses.filter(
    (course) =>
      (course.courseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.grade.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeCategory === "All" || course.grade === activeCategory)
  );

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mb-8">
      {/* ... other UI unchanged */}

      {/* Course Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course) => (
                  <tr key={course.courseId} className="hover">
                    <td>{course.courseId}</td>
                    <td>{course.name}</td>
                    <td>{course.grade}</td>
                    <td>
                      <span
                        className={`badge ${
                          course.status === "Active"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td>{course.lastUpdated}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() =>
                          navigate(`/delete-content/${course.courseId}`)
                        }
                      >
                        Show
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No courses found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination unchanged */}
      </div>
    </div>
  );
}

export default SearchCourse;

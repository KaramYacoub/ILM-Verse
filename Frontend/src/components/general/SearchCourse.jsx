import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchCourse({ courses }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

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

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // New function for "Check Course"
  const handleCheckCourse = (course) => {
    const confirmCheck = window.confirm(
      `Do you want to check the course: ${course.name}?`
    );
    if (confirmCheck) {
      console.log(`Checked course: ${course.courseId} - ${course.name}`);
      // You can add any logic here
    }
  };

  return (
    <div className="mb-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by course ID, name, or grade"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset pagination when typing
          }}
          className="input input-bordered w-full md:w-1/2"
        />

        {/* Category Filter */}
        <select
          value={activeCategory}
          onChange={(e) => {
            setActiveCategory(e.target.value);
            setCurrentPage(1); // reset pagination when switching category
          }}
          className="select select-bordered w-full md:w-48"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

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
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() =>
                          navigate(`/delete-content/${course.courseId}`)
                        }
                      >
                        Show
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleCheckCourse(course)}
                      >
                        Involve
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center p-4 space-x-2">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span className="px-2 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCourse;

import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";

function CourseContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("KG");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const courses = [
    {
      courseId: "CRS2025-001",
      grade: "KG",
      status: "Active",
      lastUpdated: "Apr 5, 2025",
    },
    {
      courseId: "CRS2025-002",
      grade: "Primary",
      status: "Active",
      lastUpdated: "Apr 4, 2025",
    },
    {
      courseId: "CRS2025-003",
      grade: "Intermediate Male",
      status: "Pending",
      lastUpdated: "Apr 3, 2025",
    },
    {
      courseId: "CRS2025-004",
      grade: "Intermediate Female",
      status: "Active",
      lastUpdated: "Apr 2, 2025",
    },
    {
      courseId: "CRS2025-005",
      grade: "Primary",
      status: "Active",
      lastUpdated: "Apr 1, 2025",
    },
    {
      courseId: "CRS2025-006",
      grade: "KG",
      status: "Active",
      lastUpdated: "Mar 30, 2025",
    },
    {
      courseId: "CRS2025-007",
      grade: "Intermediate Male",
      status: "Active",
      lastUpdated: "Mar 28, 2025",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      (course.courseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.grade.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeCategory === "All" || course.grade === activeCategory)
  );

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [
    "All",
    "KG",
    "Primary",
    "Intermediate Male",
    "Intermediate Female",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">General Administrator</h1>
        <h2 className="text-2xl font-semibold mb-6">Edit Content</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for course name or ID..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-sm ${
                activeCategory === category ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left">Course ID</th>
                  <th className="text-left">Grade</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Last Updated</th>
                  <th className="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCourses.map((course) => (
                  <tr key={course.courseId}>
                    <td className="font-medium">{course.courseId}</td>
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
                      <button className="btn btn-sm btn-ghost">Show</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t">
            <div>
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredCourses.length
              )}{" "}
              to {Math.min(currentPage * itemsPerPage, filteredCourses.length)}{" "}
              of {filteredCourses.length} courses
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage * itemsPerPage >= filteredCourses.length}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GeneralNav from "../../components/general/GeneralNav";

function CourseContent() {
  const [courses] = useState([
    {
      courseId: "CRS-001",
      name: "Mathematics Fundamentals",
      grade: "KG",
      section: "Section A",
      teacher: "John Smith",
      studentsEnrolled: 24,
      department: "Math",
    },
    {
      courseId: "CRS-002",
      name: "Science Explorers",
      grade: "Primary",
      section: "Section B",
      teacher: "Sarah Johnson",
      studentsEnrolled: 18,
      department: "Science",
    },
    {
      courseId: "CRS-003",
      name: "English Literature",
      grade: "Primary",
      section: "Section C",
      teacher: "Michael Brown",
      studentsEnrolled: 0,
      department: "English",
    },
  ]);

  // Mock data for teachers by department
  const teachersByDepartment = {
    Math: ["John Smith", "Emma Watson", "Robert Johnson"],
    Science: ["Sarah Johnson", "David Miller", "Lisa Ray"],
    English: ["Michael Brown", "Jennifer Lee", "Thomas Wilson"],
  };

  const [filters, setFilters] = useState({
    section: "",
    grade: "",
  });
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesSection = filters.section
        ? course.section.toLowerCase().includes(filters.section.toLowerCase())
        : true;

      const matchesGrade = filters.grade
        ? course.grade.toLowerCase() === filters.grade.toLowerCase()
        : true;

      const matchesSearch = searchTerm
        ? course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesSection && matchesGrade && matchesSearch;
    });

    setFilteredCourses(filtered);
  }, [filters, searchTerm, courses]);

  const handleShowCourse = (courseId) => {
    navigate(`/admin-course-overview/${courseId}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeTeacherClick = (course) => {
    setCurrentCourse(course);
    setSelectedTeacher(course.teacher);
    setShowTeacherModal(true);
  };

  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleSaveTeacher = () => {
    // In a real app, you would update the course's teacher in your database here
    const updatedCourses = courses.map((course) =>
      course.courseId === currentCourse.courseId
        ? { ...course, teacher: selectedTeacher }
        : course
    );

    // Update state to reflect the change
    setFilteredCourses(updatedCourses);
    setShowTeacherModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Course Management
          </h1>
          <p className="text-gray-600">Manage all courses and their content</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search Courses</span>
              </label>
              <input
                type="text"
                placeholder="Search by name or teacher..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Filter by Section</span>
              </label>
              <input
                type="text"
                placeholder="Section..."
                className="input input-bordered w-full"
                name="section"
                value={filters.section}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Filter by Grade</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="grade"
                value={filters.grade}
                onChange={handleFilterChange}
              >
                <option value="">All Grades</option>
                <option value="KG">KG</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button
              onClick={() => {
                setFilters({ section: "", grade: "" });
                setSearchTerm("");
              }}
              className="btn btn-ghost btn-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.courseId}
                className="p-4 bg-base-100 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold">{course.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="badge badge-primary">
                        {course.grade}
                      </span>
                      <span className="badge badge-secondary">
                        {course.section}
                      </span>
                    </div>
                    <p className="mt-2">
                      <span className="font-medium">Teacher:</span>{" "}
                      {course.teacher}
                    </p>
                    <p className="">
                      <span className="font-medium">Students:</span>{" "}
                      {course.studentsEnrolled}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:space-x-2 md:flex-row">
                    <button className="btn btn-primary btn-sm">
                      Involve Students
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleChangeTeacherClick(course)}
                    >
                      Change Teacher
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleShowCourse(course.courseId)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700">
                No courses found
              </h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setFilters({ section: "", grade: "" });
                  setSearchTerm("");
                }}
                className="btn btn-ghost btn-sm mt-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Selection Modal */}
      {showTeacherModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Change Teacher for {currentCourse?.name}
            </h3>
            <p className="py-2">Current teacher: {currentCourse?.teacher}</p>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select New Teacher</span>
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {teachersByDepartment[currentCourse?.department]?.map(
                  (teacher) => (
                    <div
                      key={teacher}
                      className={`p-2 rounded cursor-pointer ${
                        selectedTeacher === teacher
                          ? "bg-primary text-primary-content"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleTeacherSelect(teacher)}
                    >
                      {teacher}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowTeacherModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveTeacher}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseContent;

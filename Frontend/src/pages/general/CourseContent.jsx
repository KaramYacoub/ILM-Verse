import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GeneralNav from "../../components/general/GeneralNav";

function CourseContent() {
  const [courses] = useState([
    {
      courseId: "CRS-001",
      name: "Mathematics Fundamentals",
      grade: "KG",
      status: "Active",
      section: "Section A",
      units: [{ name: "Numbers", lessons: [], assignments: [], quizzes: [] }],
    },
    {
      courseId: "CRS-002",
      name: "Science Explorers",
      grade: "Primary",
      status: "Active",
      section: "Section B",
      units: [{ name: "Nature", lessons: [], assignments: [], quizzes: [] }],
    },
    {
      courseId: "CRS-003",
      name: "English Literature",
      grade: "Primary",
      status: "Active",
      section: "Section C",
      units: [],
    },
    // Add more courses...
  ]);

  const [sectionFilter, setSectionFilter] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const navigate = useNavigate();

  useEffect(() => {
    // Filter courses based on section filter
    const filtered = courses.filter((course) => {
      const matchesSection = sectionFilter
        ? course.section.toLowerCase().includes(sectionFilter.toLowerCase())
        : true;

      return matchesSection;
    });
    setFilteredCourses(filtered);
  }, [sectionFilter, courses]);

  const handleShowCourse = (courseId) => {
    navigate(`/admin-course-overview/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Administrator</h1>
        <h2 className="text-2xl font-semibold mb-6">Edit Content</h2>

        {/* Section Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Filter by Section"
            className="input input-bordered w-full mb-4"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
          />
        </div>

        {/* Display Filtered Courses */}
        <div className="grid gap-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.courseId}
                className="p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold">{course.name}</h3>
                  <p className="text-gray-600">{course.grade}</p>
                  <p className="text-sm text-gray-400">
                    Section: {course.section}
                  </p>
                </div>
                <button
                  onClick={() => handleShowCourse(course.courseId)}
                  className="btn btn-primary"
                >
                  Show
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseContent;

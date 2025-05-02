import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GeneralNav from "../../components/general/GeneralNav";
import { useCourseStore } from "../../store/CourseStore";

function CourseContent() {
  const navigate = useNavigate();

  const {
    courses,
    getALlCourses,
    getTeacherBySection,
    teachersBySection,
    getStudentsInCourse,
    involveStudents,
  } = useCourseStore();

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [studentCounts, setStudentCounts] = useState({});

  // fetch all courses
  useEffect(() => {
    getALlCourses();
  }, [getALlCourses]);

  // fetch students in each course
  useEffect(() => {
    const getStudents = async (course_id) => {
      try {
        const response = await getStudentsInCourse(course_id);
        setStudentCounts((prev) => ({
          ...prev,
          [course_id]: response?.count ?? 0,
        }));
      } catch (error) {
        setStudentCounts((prev) => ({
          ...prev,
          [course_id]: error.response?.data?.error,
        }));
      }
    };
    if (courses.length > 0) {
      courses.forEach((course) => {
        getStudents(course.course_id);
      });
    }
  }, [courses, getStudentsInCourse]);

  // invovle students in a course
  const handleInvolveStudents = async (course_id) => {
    try {
      const response = await involveStudents(course_id);
      if (response.status === "success") {
        alert(response.message); // optional: show actual response message
        // Re-fetch student count after involving them
        const updated = await getStudentsInCourse(course_id);
        setStudentCounts((prev) => ({
          ...prev,
          [course_id]: updated?.count ?? 0,
        }));
      } else {
        alert("Failed to involve students.");
      }
    } catch (error) {
      console.error("Error involving students:", error);
    }
  };

  // filter courses
  useEffect(() => {
    const filtered = courses.filter((course) => {
      return searchTerm
        ? course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.teacher_name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
    });

    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  // handle change teacher
  const handleChangeTeacher = async (course) => {
    setCurrentCourse(course);
    setSelectedTeacher(course.teacher_name);
    await getTeacherBySection(course.grade_name, course.section_name);
    setShowTeacherModal(true);
  };

  const handleSaveTeacher = () => {
    // Ideally call an API to update teacher here
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

        {/* Search Bar Only */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Search Courses</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search by name or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setSearchTerm("")}
              className="btn btn-ghost btn-sm"
            >
              Clear Search
            </button>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.course_id}
                className="p-4 bg-base-100 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold">{course.course_name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="badge badge-primary">
                        {course.grade_name}
                      </span>
                      <span className="badge badge-secondary">
                        {course.section_name}
                      </span>
                    </div>
                    <p className="mt-2">
                      <span className="font-medium">Teacher:</span>{" "}
                      {course.teacher_name}
                    </p>
                    <p>
                      <span className="font-medium">Students:</span>{" "}
                      {studentCounts[course.course_id] ?? "Loading..."}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:space-x-2 md:flex-row">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleInvolveStudents(course.course_id)}
                    >
                      Involve Students
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleChangeTeacher(course)}
                    >
                      Change Teacher
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        navigate(`/admin-course-overview/${course.course_id}`)
                      }
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
              <button
                onClick={() => setSearchTerm("")}
                className="btn btn-ghost btn-sm mt-4"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Modal */}
      {showTeacherModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Change Teacher for {currentCourse?.course_id}
            </h3>
            <p className="py-2">
              Current teacher: {currentCourse?.teacher_name}
            </p>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select New Teacher</span>
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {teachersBySection?.map((teacher) => (
                  <div
                    key={teacher.teacher_id}
                    className={`p-2 rounded cursor-pointer ${
                      selectedTeacher ===
                      teacher.first_name + " " + teacher.last_name
                        ? "bg-primary text-primary-content"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      setSelectedTeacher(
                        teacher.first_name + " " + teacher.last_name
                      )
                    }
                  >
                    {teacher.first_name + " " + teacher.last_name}
                  </div>
                ))}
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

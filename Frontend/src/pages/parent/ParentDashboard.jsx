import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ParentNavBar from "../../components/parent/ParentNavBar";
import CourseCard from "../../components/shared/CourseCard";
import useParentsStore from "../../store/ParentStore";

function ParentDashboard() {
  const {
    students,
    fetchStudents,
    getCoursesForStudent,
    courses,
    loading,
    error,
  } = useParentsStore();

  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudents();
    };
    fetchData();
  }, [fetchStudents]);

  useEffect(() => {
    if (selectedStudent) {
      const fetchCourses = async () => {
        await getCoursesForStudent(selectedStudent.student_id);
      };
      fetchCourses();
    }
  }, [selectedStudent, getCoursesForStudent]);

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    const foundStudent = students.find(
      (student) => student.student_id === studentId
    );
    if (foundStudent) {
      setSelectedStudent({
        student_id: foundStudent.student_id,
        section_id: foundStudent.section_id,
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <ParentNavBar />

      <div className="flex flex-col items-start justify-center mt-10 px-4 md:px-8 w-full">
        {/* Student Selector and Navigation */}
        <div className="w-full flex flex-col items-center gap-4 mb-8">
          <div className="relative w-full max-w-md">
            <select
              value={selectedStudent?.student_id || ""}
              onChange={handleStudentChange}
              className="w-full px-6 py-3 text-lg font-medium text-gray-700 bg-white border-2 border-primary/20 rounded-xl shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 appearance-none bg-[url('data:image/svg+xml;base64,...')] bg-no-repeat bg-[right_1rem_center] cursor-pointer transition-all duration-200"
            >
              <option disabled value="" className="text-gray-400">
                Choose a Student
              </option>
              {students.map((student, idx) => (
                <option key={idx} value={student.student_id}>
                  {student.full_name} ({student.section.grade.grade_name} -{" "}
                  {student.section.section_name})
                </option>
              ))}
            </select>
          </div>

          {selectedStudent && (
            <div className="flex flex-wrap justify-center items-center gap-2 w-full max-w-5xl mt-2">
              <Link
                to={`/parent-view-grades?student_id=${selectedStudent.student_id}`}
                className="btn btn-primary rounded-md text-sm font-medium w-[20%] min-w-[120px]"
              >
                Show Grades
              </Link>

              <Link
                to={`/parent-show-absences?student_id=${selectedStudent.student_id}&section_id=${selectedStudent.section_id}`}
                className="btn btn-primary rounded-md text-sm font-medium w-[20%] min-w-[120px]"
              >
                Show Absences
              </Link>

              <Link
                to={`/parent-show-reports/${selectedStudent.student_id}`}
                className="btn btn-primary rounded-md text-sm font-medium w-[20%] min-w-[120px]"
              >
                Show Reports
              </Link>
            </div>
          )}
        </div>

        {/* Courses Header */}
        <div className="w-full">
          <h1 className="text-6xl font-bold text-primary">My Courses</h1>
          <p className="mt-2 text-3xl text-primary">Course overview</p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
          {!loading && courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.course.subject_name}
                to="/parent-course-content"
              />
            ))
          ) : (
            <p className="text-lg text-gray-500 mt-4">
              {loading ? "Loading courses..." : "No courses available."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;

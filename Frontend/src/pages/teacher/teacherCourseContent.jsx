import { Outlet, useLocation } from "react-router-dom";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import TeacherNavigationTabs from "../../components/teacher/TeacherNavigationTabs";
import { useEffect } from "react";
import { useTeacherStore } from "../../store/TeacherStore";
import { useState } from "react";
import { Loader2 } from "lucide-react"; // Import the loading spinner

function TeacherCourseContent() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const course_id = pathSegments[pathSegments.length - 2];
  const { getCourseByID } = useTeacherStore();

  const [course, setCourse] = useState(null); // Changed to null for better loading state handling
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchCourseContent = async () => {
      setIsLoading(true);
      try {
        const courseData = await getCourseByID(course_id);
        setCourse(courseData);
        setError(null);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseContent();
  }, [course_id, getCourseByID]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-start pb-5">
      <TeacherNavbar />
      <div className="container mx-auto p-6 mt-16">
        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : error ? (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        ) : (
          <>
            {/* Course Header */}
            <div className="bg-primary flex flex-col items-center rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl text-accent font-bold mb-2">
                {course?.subject_name || "Untitled Course"}
              </h1>
            </div>

            {/* NavigationTabs */}
            <TeacherNavigationTabs to="teacher-course-content" />

            {/* Tab Content */}
            <Outlet context={{ course }} />
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherCourseContent;

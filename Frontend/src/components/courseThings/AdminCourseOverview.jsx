import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GeneralNav from "../general/GeneralNav";

function AdminCourseOverview() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const found = storedCourses.find((c) => c.courseId === courseId);
    setCourseData(found);
  }, [courseId]);

  if (!courseData || !courseData.units) {
    return (
      <>
        <GeneralNav />
        <div className="p-6 text-red-600">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p>
            No course data available for ID: <strong>{courseId}</strong>
          </p>
          <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <GeneralNav />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          {courseData.name} ({courseId})
        </h2>

        <div className="space-y-4">
          {courseData.units.map((unit, index) => (
            <div key={index} className="card bg-base-200 shadow-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{unit.name}</h3>
                  <p className="text-gray-600">
                    {unit.lessons.length} Lessons • {unit.assignments.length}{" "}
                    Assignments • {unit.quizzes.length}{" "}
                    {unit.quizzes.length === 1 ? "Quiz" : "Quizzes"}
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/admin-unit-content/:courseId", {
                      state: { unit },
                    })
                  }
                >
                  View Unit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminCourseOverview;

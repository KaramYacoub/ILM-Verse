import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

function TeacherOverviewTab() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const courseID = pathSegments[pathSegments.length - 2];
  const { courseData } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-3xl text-primary font-bold mb-6">Course Units</h2>

      <div className="space-y-4">
        {courseData.units.map((unit, index) => (
          <div key={index} className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-center sm:flex-row flex-col">
                <div>
                  <h3 className="card-title text-xl">{unit.name}</h3>
                  <p className="text-lg text-gray-500">
                    {unit.lessons.length} Lessons • {unit.assignments.length}{" "}
                    Assignments • {unit.quizzes.length}{" "}
                    {unit.quizzes > 1 ? "Quizzes" : "Quiz"}
                  </p>
                </div>
                <div className="flex items-end">
                  <button className="btn btn-secondary btn-md mr-2">
                    Delete
                  </button>
                  <button
                    className="btn btn-primary text-lg btn-md"
                    onClick={() =>
                      navigate(
                        `/teacher-course-content/${courseID}/teacher-unit-content`,
                        {
                          state: { unit: unit },
                        }
                      )
                    }
                  >
                    View unit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Unit Button */}
        <div>
          <div className="mt-6 border-dashed border-2 border-red-400 text-center rounded-md py-4 cursor-pointer hover:bg-red-50 transition">
            <button className="text-red-600 font-semibold">
              + Add New Unit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherOverviewTab;

import { useOutletContext, useNavigate } from "react-router-dom";

export default function OverviewTab() {
  const { courseData } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-3xl text-primary font-bold mb-6">Course Units</h2>

      <div className="space-y-4">
        {courseData.units.map((unit, index) => (
          <div key={index} className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="card-title text-xl">{unit.name}</h3>
                  <p className="text-lg text-gray-500">
                    {unit.lessons.length} Lessons • {unit.assignments.length}{" "}
                    Assignments • {unit.quizzes}{" "}
                    {unit.quizzes > 1 ? "Quizzes" : "Quiz"}
                  </p>
                </div>
                <button
                  className="btn btn-primary text-lg btn-md"
                  onClick={() =>
                    navigate("/studentcoursecontent/lessons", {
                      state: { unit: unit },
                    })
                  }
                >
                  View unit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useOutletContext } from "react-router-dom";
export default function OverviewTab() {
  const { courseData } = useOutletContext();

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Course Units</h2>

      <div className="space-y-4">
        {courseData.units.map((unit, index) => (
          <div key={index} className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="card-title text-lg">{unit.name}</h3>
                  <p className="text-sm text-gray-500">
                    {unit.lessons} Lessons • {unit.assignments} Assignments •{" "}
                    {unit.quizzes} Quiz
                  </p>
                </div>
                <button className="btn btn-primary btn-sm">View unit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

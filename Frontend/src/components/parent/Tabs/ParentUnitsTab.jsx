import { useOutletContext } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

function ParentUnitsTab() {
  const { courseData } = useOutletContext();
  const location = useLocation();

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Course Units</h2>

      {courseData.units?.length > 0 ? (
        <div className="space-y-4">
          {courseData.units.map((unit, index) => (
            <div key={index} className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg">{unit.name}</h3>
                <div className="flex flex-wrap gap-2 my-2">
                  <div className="badge badge-info">
                    {unit.lessons?.length || 0} Lessons
                  </div>
                  <div className="badge badge-warning">
                    {unit.assignments?.length || 0} Assignments
                  </div>
                  <div className="badge badge-success">
                    {unit.quizzes || 0} Quizzes
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <Link
                    to={`units/${index}`}
                    state={{ unit }}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No units available for this course.</p>
      )}
    </div>
  );
}

export default ParentUnitsTab;

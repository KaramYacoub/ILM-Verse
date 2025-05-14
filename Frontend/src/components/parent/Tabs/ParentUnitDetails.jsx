import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useParentsStore from "../../store/ParentsStore";

function ParentUnitDetails() {
  const { course_id, unit_id } = useParams();
  const { state } = useLocation();
  const { unitContent, loading, error, fetchUnitContent } = useParentsStore();

  useEffect(() => {
    if (course_id && unit_id) {
      fetchUnitContent(course_id, unit_id);
    }
  }, [course_id, unit_id, fetchUnitContent]);

  const unit = state?.unit || unitContent;

  if (loading) return <div>Loading unit details...</div>;
  if (error) return <div className="text-error">{error}</div>;
  if (!unit) return <div className="p-4 text-error">Unit not found</div>;

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">{unit.name}</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p>{unit.description || "No description available."}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Lessons</h3>
        {unit.lessons?.length > 0 ? (
          <div className="space-y-4">
            {unit.lessons.map((lesson, index) => (
              <div key={index} className="bg-base-200 p-4 rounded-lg">
                <h4 className="font-medium">{lesson.title}</h4>
                <p className="text-sm text-gray-600">
                  Duration: {lesson.duration} minutes
                </p>
                <p className="mt-2">{lesson.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No lessons available for this unit.</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Assignments</h3>
        {unit.assignments?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {unit.assignments.map((assignment, index) => (
                  <tr key={index}>
                    <td>{assignment.title}</td>
                    <td>{assignment.due_date}</td>
                    <td>
                      <span
                        className={`badge ${
                          assignment.status === "Submitted"
                            ? "badge-success"
                            : assignment.status === "Not Submitted"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </td>
                    <td>{assignment.grade || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            No assignments available for this unit.
          </p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Resources</h3>
        {unit.resources?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unit.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.path}
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-200 hover:bg-base-300 transition-colors"
              >
                <div className="card-body">
                  <h4 className="card-title">{resource.title}</h4>
                  <p>Type: {resource.type}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No resources available for this unit.</p>
        )}
      </div>
    </div>
  );
}

export default ParentUnitDetails;

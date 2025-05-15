import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useParentsStore from "../../../store/parentsStore";
import { Loader2 } from "lucide-react";

function ParentUnitsTab() {
  const { course_id, unit_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchCourseUnits, fetchUnitContent, courseContent, unitContent } =
    useParentsStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (unit_id) {
          // View specific unit content
          await fetchUnitContent(course_id, unit_id);
        } else {
          // View all units for the course
          await fetchCourseUnits(course_id);
        }
      } catch (error) {
        console.error("Error fetching parent data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [course_id, unit_id, fetchCourseUnits, fetchUnitContent]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      {unit_id ? (
        // Display specific unit content
        <div>
          <h2 className="text-3xl text-primary font-bold mb-6">
            {location.state?.unit?.unit_name || "Unit Content"}
          </h2>
          <div className="prose max-w-none">
            {unitContent?.content ? (
              <div dangerouslySetInnerHTML={{ __html: unitContent.content }} />
            ) : (
              <p className="text-gray-500">
                No content available for this unit.
              </p>
            )}
          </div>
        </div>
      ) : (
        // Display list of units
        <div>
          <h2 className="text-3xl text-primary font-bold mb-6">Course Units</h2>
          {courseContent.length > 0 ? (
            <div className="space-y-4">
              {courseContent.map((unit) => (
                <div key={unit.unit_id} className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <div className="flex justify-between items-center sm:flex-row flex-col">
                      <div>
                        <h3 className="card-title text-xl">{unit.unit_name}</h3>
                        <div className="flex gap-2 mt-2 flex-wrap">
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
                      </div>
                      <button
                        className="btn btn-primary text-lg btn-md mt-4 sm:mt-0"
                        onClick={() =>
                          navigate(
                            `/parent-course-content/${course_id}/units/${unit.unit_id}`,
                            { state: { unit } }
                          )
                        }
                      >
                        View Unit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No units available for this course.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ParentUnitsTab;

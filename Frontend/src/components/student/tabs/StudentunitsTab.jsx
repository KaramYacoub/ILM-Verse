import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useStudentStore from "../../../store/StudentStore";

function StudentUnitsTab() {
  const { course_id, unit_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchCourseUnits, fetchUnitContent, courseContent, unitContent } =
    useStudentStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (unit_id) {
          // We're viewing a specific unit
          await fetchUnitContent(course_id, unit_id);
        } else {
          // We're viewing the units list
          await fetchCourseUnits(course_id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [course_id, unit_id, fetchCourseUnits, fetchUnitContent]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      {unit_id ? (
        // Display single unit content
        <div>
          <h2 className="text-3xl text-primary font-bold mb-6">
            {location.state?.unit?.unit_name || "Unit Content"}
          </h2>
          <div className="prose max-w-none">
            {unitContent?.content && (
              <div dangerouslySetInnerHTML={{ __html: unitContent.content }} />
            )}
          </div>
        </div>
      ) : (
        // Display list of units
        <div>
          <h2 className="text-3xl text-primary font-bold mb-6">Course Units</h2>
          <div className="space-y-4">
            {courseContent.map((unit) => (
              <div key={unit.unit_id} className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <div className="flex justify-between items-center sm:flex-row flex-col">
                    <div>
                      <h3 className="card-title text-xl">{unit.unit_name}</h3>
                    </div>
                    <button
                      className="btn btn-primary text-lg btn-md"
                      onClick={() =>
                        navigate(
                          `/student-course-content/${course_id}/student-units/${unit.unit_id}`,
                          {
                            state: { unit },
                          }
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
        </div>
      )}
    </div>
  );
}

export default StudentUnitsTab;

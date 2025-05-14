import { useNavigate, useParams } from "react-router-dom";
import useParentsStore from "../../../store/ParentStore";
import { useEffect, useState } from "react";

function ParentOverview() {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const { fetchCourseAllUnits, courseContent } = useParentsStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const shouldFetch = !courseContent || courseContent.length === 0;

    if (shouldFetch && course_id) {
      const fetcheUnits = async () => {
        try {
          setLoading(true);
          await fetchCourseAllUnits(course_id);
        } catch (error) {
          console.error("Failed to load unit content:", error);
        } finally {
          setLoading(false);
        }
      };
      fetcheUnits();
    }
  }, [course_id, fetchCourseAllUnits]);

  if (!courseContent) {
    return <div className="text-error">No units available.</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-3xl text-primary font-bold mb-6">Course Units</h2>

      <div className="space-y-4">
        {courseContent.map((unit) => (
          <div key={unit.unit_id} className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="card-title text-xl">{unit.unit_name}</h3>
                  <p className="text-lg text-gray-500">
                    {unit.unit_description}
                  </p>
                </div>
                <button
                  className="btn btn-primary text-lg btn-md"
                  onClick={() =>
                    navigate("/parent-course-content/parent-lessons", {
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

export default ParentOverview;

import { useNavigate, useParams } from "react-router-dom";
import useParentsStore from "../../../store/ParentStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

function ParentOverview() {
  const { course_id, student_id } = useParams();
  const navigate = useNavigate();

const { fetchCourseAllUnits, courseContent, loading } = useParentsStore();


  useEffect(() => {
    const shouldFetch = !courseContent;

    if (shouldFetch && course_id) {
      const fetcheUnits = async () => {
        try {
          await fetchCourseAllUnits(course_id);
        } catch (error) {
          console.error("Failed to load unit content:", error);
        }
      };
      fetcheUnits();
    }
  }, [courseContent, course_id, fetchCourseAllUnits]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-3xl text-primary font-bold mb-6">Course Units</h2>
      {Array.isArray(courseContent) && courseContent.length === 0 && (
        <div className="py-8 text-center text-gray-500">No units available.</div>
      )}

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
                    navigate(
                      `/parent-course-content/${course_id}/${student_id}/${unit.unit_id}/content`,
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
        ))}
      </div>
    </div>
  );
}

export default ParentOverview;

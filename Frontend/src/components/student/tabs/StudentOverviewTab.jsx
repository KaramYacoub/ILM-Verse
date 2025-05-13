import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import useStudentStore from "../../../store/StudentStore";

function StudentOverviewTab() {
  const { courseData } = useOutletContext();
  const navigate = useNavigate();
  const { course_id, unit_id } = useParams();

  const { fetchCourseUnits, courseContent } = useStudentStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcheUnits = async () => {
      try {
        setLoading(true);
        await fetchCourseUnits(course_id);
      } catch (error) {
        console.error("Failed to load unit content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetcheUnits();
  }, [course_id, fetchCourseUnits]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-3xl text-primary font-bold mb-6">Course Units</h2>

      <div className="space-y-4">
        {courseContent.map((unit) => (
          <div key={unit.unit_id} className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-center sm:flex-row flex-col">
                <div>
                  <h3 className="card-title text-xl">{unit.unit_name}</h3>
                  <p>{unit.unit_description}</p>
                </div>
                <button
                  className="btn btn-primary text-lg btn-md"
                  onClick={() => {
                    // console.log("unit: ", unit);
                    navigate(
                      `/student-course-content/${course_id}/units/${unit.unit_id}/`,
                      { state: { unit } }
                    );
                  }}
                >
                  View Unit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentOverviewTab;

// import { useEffect, useState } from "react";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import useStudentStore from "../../../store/StudentStore";

// function StudentOverviewTab() {
//   const { courseData } = useOutletContext();
//   const navigate = useNavigate();

//   const { fetchCourseUnits, courseContent } = useStudentStore();
//   const [loading, setLoading] = useState(false);
//   const course_id = location.pathname.split("/")[2];
//   useEffect(() => {
//     const fetcheUnits = async () => {
//       try {
//         console.log("courseId", course_id);

//         setLoading(true);
//         await fetchCourseUnits(course_id);
//       } catch (error) {
//         setError("Failed to load unit content");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetcheUnits();
//   }, [course_id, fetchCourseUnits]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="bg-base-100 rounded-lg shadow-md p-6">
//       <h2 className="text-3xl text-primary font-bold mb-6">Course Units</h2>

//       <div className="space-y-4">
//         {courseContent.map((unit) => (
//           <div key={unit.unit_id} className="card bg-base-200 shadow-md">
//             <div className="card-body">
//               <div className="flex justify-between items-center sm:flex-row flex-col">
//                 <div>
//                   <h3 className="card-title text-xl">{unit.unit_name}</h3>
//                 </div>
//                 <button
//                   className="btn btn-primary text-lg btn-md"
//                   onClick={() =>
//                     navigate(
//                       `/student-course-content/${course_id}/student-units`,
//                       { state: { unit } },
//                       {
//                         state: { unit },
//                       }
//                     )
//                   }
//                 >
//                   View Unit
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StudentOverviewTab;

import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useStudentStore from "../../../store/StudentStore";

function StudentUnitsTab() {
  const { course_id, unit_id } = useParams();
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

// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import useStudentStore from "../../../store/StudentStore";

// function StudentUnitsTab() {
//   const { course_id, unit_id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { fetchUnitContent, unitContent } = useStudentStore();
//   const [loading, setLoading] = useState(false);

//   // Get unit data either from location state or fetch it
//   const unit = location.state?.unit;

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         setLoading(true);
//         await fetchUnitContent(course_id, unit_id);
//       } catch (error) {
//         console.error("Failed to load unit content:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (unit_id) {
//       fetchContent();
//     }
//   }, [course_id, unit_id, fetchUnitContent]);

//   if (loading) return <div>Loading unit content...</div>;

//   return (
//     <div className="bg-base-100 rounded-lg shadow-md p-6">
//       <button onClick={() => navigate(-1)} className="btn btn-ghost mb-4">
//         ← Back to Units
//       </button>

//       <h2 className="text-3xl text-primary font-bold mb-6">
//         {unit?.unit_name || "Unit Content"}
//       </h2>

//       <div className="prose max-w-none">
//         {unitContent?.content && (
//           <div dangerouslySetInnerHTML={{ __html: unitContent.content }} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentUnitsTab;

// // import { useNavigate, useLocation } from "react-router-dom";
// // import { useState } from "react";

// // function StudentUnitsTab() {
// //   const location = useLocation();
// //   const unit = location.state?.unit;
// //   const [selectedLesson, setSelectedLesson] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const navigate = useNavigate();

// //   if (!unit) {
// //     return (
// //       <div className="text-center text-error text-2xl mt-16 font-bold">
// //         No unit selected
// //       </div>
// //     );
// //   }

// //   const openModal = (lesson) => {
// //     setSelectedLesson(lesson);
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setSelectedLesson(null);
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div className="bg-base-100 rounded-lg shadow-md p-6">
// //       <h2 className="text-2xl text-primary font-bold mb-6">
// //         Lessons for {unit.name}
// //       </h2>

// //       <div className="space-y-3">
// //         {unit.lessons.map((lesson, index) => (
// //           <div key={index} className="card bg-base-200 shadow-sm">
// //             <div className="card-body">
// //               <div className="flex justify-between items-center sm:flex-row flex-col ">
// //                 <div>
// //                   <h4 className="card-title text-md">
// //                     Lesson {index + 1}: {lesson.title}
// //                   </h4>
// //                   <p className="text-sm text-gray-500">
// //                     Duration: {lesson.duration} minutes
// //                   </p>
// //                 </div>
// //                 <div className="flex gap-2">
// //                   <button
// //                     className="btn btn-primary btn-sm"
// //                     onClick={() => openModal(lesson)}
// //                   >
// //                     Review
// //                   </button>
// //                   <button
// //                     className="btn btn-secondary btn-sm"
// //                     onClick={() =>
// //                       navigate("/student-course-content/student-resources", {
// //                         state: { unit: unit },
// //                       })
// //                     }
// //                   >
// //                     See Resources
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Modal */}
// //       {isModalOpen && selectedLesson && (
// //         <dialog id="reviewModal" className="modal modal-open">
// //           <div className="modal-box w-11/12 max-w-3xl">
// //             <h3 className="font-bold text-xl mb-2">{selectedLesson.title}</h3>
// //             <p className="text-sm text-gray-500 mb-4">
// //               Duration: {selectedLesson.duration} minutes
// //             </p>

// //             {/* Replace this with real video player later */}
// //             <div className="w-full aspect-video bg-black flex items-center justify-center text-white text-lg">
// //               <video controls className="w-full rounded">
// //                 <source src="" type="video/mp4" />
// //                 Your browser does not support the video tag.
// //               </video>
// //             </div>

// //             <div className="modal-action">
// //               <button className="btn" onClick={closeModal}>
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </dialog>
// //       )}
// //     </div>
// //   );
// // }

// // export default StudentUnitsTab;

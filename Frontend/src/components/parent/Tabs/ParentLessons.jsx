import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function ParentLessons() {
  const location = useLocation();
  const unit = location.state?.unit;
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!unit) {
    return <div className="text-center text-error text-2xl mt-16 font-bold">No unit selected</div>;
  }

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLesson(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl text-primary font-bold mb-6">Lessons for {unit.name}</h2>

      <div className="space-y-3">
        {unit.lessons.map((lesson, index) => (
          <div key={index} className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="card-title text-md">
                    Lesson {index + 1}: {lesson.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Duration: {lesson.duration} minutes
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openModal(lesson)}
                  >
                    Review
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() =>
                      navigate("/parent-course-content/parent-resources", {
                        state: { unit: unit },
                      })
                    }
                  >
                    See Resources
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedLesson && (
        <dialog id="reviewModal" className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-xl mb-2">{selectedLesson.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Duration: {selectedLesson.duration} minutes
            </p>

            {/* Replace this with real video player later */}
            <div className="w-full aspect-video bg-black flex items-center justify-center text-white text-lg">
              <video controls className="w-full rounded">
                <source src='' type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default ParentLessons;

import { useLocation } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

function TeacherUnitContentTab() {
  const location = useLocation();
  const unit = location.state?.unit;
  // console.log("Unit:", unit);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLesson(null);
    setIsModalOpen(false);
  };

  if (!unit) {
    return (
      <div className="text-center text-error text-2xl mt-16 font-bold">
        No unit selected
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6">Course Content</h2>

      {/* Unit Header */}
      <div className="bg-base-200 rounded-md px-4 py-2 flex justify-between items-center font-semibold text-lg mb-4">
        <span>{unit.name}</span>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-ghost">
            <Pencil />
          </button>
          <button className="btn btn-sm btn-ghost text-error">
            <Trash2 />
          </button>
        </div>
      </div>

      {/* Lessons */}
      {(unit.lessons || []).map((lesson, i) => (
        <div
          key={i}
          className="bg-base-100 border rounded-md mt-2 px-4 py-2 flex justify-between items-center"
        >
          <div>
            <p
              className="font-medium cursor-pointer"
              onClick={() => openModal(lesson)}
            >
              🎥 Lecture: {lesson.title}
            </p>
            <p className="text-sm text-gray-500">
              MP4 • {lesson.duration} mins • Uploaded on April 5, 2025
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost">
              <Pencil />
            </button>
            <button className="btn btn-sm btn-ghost text-error">
              <Trash2 />
            </button>
          </div>
        </div>
      ))}

      {/* files */}
      {(unit.files || []).map((file, i) => (
        <div
          key={i}
          className="bg-base-100 border rounded-md mt-2 px-4 py-2 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">📄 File: {file.title}</p>
            <p className="text-sm text-gray-500">
              {file.type} • 3 pages • Uploaded on April 3, 2025
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost">
              <Pencil />
            </button>
            <button className="btn btn-sm btn-ghost text-error">
              <Trash2 />
            </button>
          </div>
        </div>
      ))}

      {/* Video Modal */}
      {isModalOpen && selectedLesson && (
        <dialog id="reviewModal" className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-xl mb-2">{selectedLesson.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Duration: {selectedLesson.duration} minutes
            </p>

            <div className="w-full aspect-video bg-black flex items-center justify-center text-white text-lg">
              <video controls className="w-full rounded">
                <source src="" type="video/mp4" />
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

export default TeacherUnitContentTab;

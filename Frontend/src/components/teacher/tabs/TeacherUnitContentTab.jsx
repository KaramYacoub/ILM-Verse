import { useLocation } from "react-router-dom";
import { Pencil, Trash2, File, Video } from "lucide-react";
import { useState } from "react";

function TeacherUnitContentTab() {
  const location = useLocation();
  const unit = location.state?.unit;
  // console.log("Unit:", unit);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

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
          <button className="btn btn-sm btn-ghost" onClick={openUploadModal}>
            <Pencil />
          </button>
          <button className="btn btn-sm btn-ghost text-error">
            <Trash2 />
          </button>
        </div>
      </div>

      {/* Lessons */}
      {unit.lessons &&
        unit.lessons.map((lesson, i) => (
          <div
            key={i}
            className="bg-base-100 border rounded-md mt-2 px-4 py-2 flex justify-between items-center"
          >
            <div>
              <p
                className="font-medium cursor-pointer flex items-center gap-2 link-hover"
                onClick={() => openModal(lesson)}
              >
                <span>
                  <Video />
                </span>{" "}
                Lecture: {lesson.title}
              </p>
              <p className="text-sm text-gray-500">
                MP4 • {lesson.duration} mins • Uploaded on April 5, 2025
              </p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-ghost text-error">
                <Trash2 />
              </button>
            </div>
          </div>
        ))}

      {/* files */}
      {unit.files &&
        unit.files.map((file, i) => (
          <div
            key={i}
            className="bg-base-100 border rounded-md mt-2 px-4 py-2 flex justify-between items-center"
          >
            <div>
              <a
                href={`/assignments/${file.title}.${file.type}`}
                download={`${file.title}.${file.type}`}
                className="link-hover font-medium flex items-center gap-2"
              >
                <File />
                File: {file.title}
              </a>
              <p className="text-sm text-gray-500">
                {file.type} • 3 pages • Uploaded on April 3, 2025
              </p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-ghost text-error">
                <Trash2 />
              </button>
            </div>
          </div>
        ))}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Upload Content</h3>
            <p className="mb-4 text-sm text-gray-500">
              Choose a file or a video to upload for this unit.
            </p>

            <div className="flex flex-col gap-4">
              <label className="form-control w-full">
                <span className="label-text mb-1 font-medium  flex items-center gap-2">
                  <span><File /></span> Upload File
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log("Selected file:", file);
                    // handle file upload logic here
                  }}
                />
              </label>

              {/* Upload Video (e.g. MP4) */}
              <label className="form-control w-full">
                <span className="label-text mb-1 font-medium flex items-center gap-2">
                  <span>
                    <Video />
                  </span>{" "}
                  Upload Video
                </span>
                <input
                  type="file"
                  accept="video/mp4"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => {
                    const video = e.target.files[0];
                    console.log("Selected video:", video);
                    // handle video upload logic here
                  }}
                />
              </label>
            </div>

            <div className="modal-action mt-6 flex gap-2">
              <button className="btn" onClick={closeUploadModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary font-bold text-base w-1/3"
                onClick={closeUploadModal}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}

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

import { useParams } from "react-router-dom";
import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";

function DeleteContent() {
  const { courseId } = useParams();

  const [units, setUnits] = useState([
    { name: "Unit 1: Introduction", lessons: [] },
    { name: "Unit 2: Advanced Topics", lessons: [] },
  ]);

  const [students] = useState([
    { id: 1, name: "Omar Al-Tamimi", parent: "Fadi Al-Tamimi" },
    { id: 2, name: "Lina Haddad", parent: "Samir Haddad" },
    { id: 3, name: "Yousef Salameh", parent: "Mona Salameh" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpenModal = (unitIndex) => {
    setSelectedUnit(unitIndex);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setSelectedVideo(null);
  };

  const handleAddContent = () => {
    if (!selectedUnit) return;

    const updatedUnits = [...units];
    const newId =
      Math.max(
        ...updatedUnits.flatMap((unit) => unit.lessons.map((l) => l.id)),
        0
      ) + 1;

    if (selectedFile) {
      updatedUnits[selectedUnit].lessons.push({
        id: newId,
        name: selectedFile.name,
        type: "File",
        duration: "-",
        uploadedOn: new Date().toLocaleDateString(),
      });
    }

    if (selectedVideo) {
      updatedUnits[selectedUnit].lessons.push({
        id: newId + 1,
        name: selectedVideo.name,
        type: "Video",
        duration: "00:00",
        uploadedOn: new Date().toLocaleDateString(),
      });
    }

    setUnits(updatedUnits);
    handleCloseModal();
  };

  const handleRemoveUnitContent = (unitIndex) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].lessons = [];
    setUnits(updatedUnits);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Course: {courseId}
          </h1>
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Course Content
          </h2>

          <div className="space-y-6">
            {units.map((unit, unitIndex) => (
              <div key={unitIndex} className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h3 className="card-title text-xl">{unit.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(unitIndex)}
                        className="btn bg-primary hover:bg-primary-dark text-white"
                      >
                        + Add Sound/File
                      </button>
                      <button
                        onClick={() => handleRemoveUnitContent(unitIndex)}
                        className="btn bg-error hover:bg-error-dark text-white"
                      >
                        Remove Content
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    {unit.lessons.length > 0 ? (
                      unit.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="p-3 rounded-lg bg-base-100"
                        >
                          <p className="font-medium">
                            {lesson.type}: {lesson.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {lesson.duration} • Uploaded on {lesson.uploadedOn}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No content available.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Enrolled Students
          </h2>
          <div className="bg-base-200 rounded-lg p-4 shadow">
            {students.length > 0 ? (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Parent Name</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.parent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No students enrolled yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Upload Content</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Upload File</label>
              <label className="btn bg-primary hover:bg-primary-dark text-white cursor-pointer">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.docx,.xlsx"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {selectedFile && (
                <span className="ml-2">{selectedFile.name}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Upload Video</label>
              <label className="btn bg-primary hover:bg-primary-dark text-white cursor-pointer">
                Choose File
                <input
                  type="file"
                  accept="video/mp4,video/mov"
                  onChange={(e) => setSelectedVideo(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {selectedVideo && (
                <span className="ml-2">{selectedVideo.name}</span>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="btn btn-ghost hover:bg-secondary hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContent}
                className="btn bg-primary hover:bg-primary-dark text-white disabled:opacity-50"
                disabled={!selectedFile && !selectedVideo}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteContent;

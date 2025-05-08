import { useLocation } from "react-router-dom";
import { Trash2, File, Video, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import { useCourseStore } from "../../store/CourseStore";

function AdminUnitContent() {
  const location = useLocation();
  const unit = location.state?.unit;
  const {
    unitContent,
    getUnitContent,
    addUnitContent,
    downloadResource,
    deleteUnitContent,
  } = useCourseStore();

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingMediaId, setDeletingMediaId] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadState, setUploadState] = useState({
    file: null,
    title: "",
    isUploading: false,
    uploadProgress: 0,
  });

  useEffect(() => {
    if (unit?.unit_id) {
      getUnitContent(unit.unit_id);
    }
  }, [getUnitContent, unit?.unit_id]);

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
    setUploadState({
      file: null,
      title: "",
      isUploading: false,
      uploadProgress: 0,
    });
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleFileChange = (e) => {
    setUploadState({
      ...uploadState,
      file: e.target.files[0],
      title: e.target.files[0]?.name.split(".")[0] || "",
    });
  };

  const handleUpload = async () => {
    if (!uploadState.file || !uploadState.title) {
      alert("Please provide both a file and a title");
      return;
    }

    setUploadState({ ...uploadState, isUploading: true });

    try {
      const formData = new FormData();
      formData.append("media", uploadState.file);
      formData.append("title", uploadState.title);

      const interval = setInterval(() => {
        setUploadState((prev) => {
          const newProgress = prev.uploadProgress + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...prev, uploadProgress: 100, isUploading: false };
          }
          return { ...prev, uploadProgress: newProgress };
        });
      }, 300);

      await addUnitContent(unit.unit_id, formData);
      await getUnitContent(unit.unit_id);

      clearInterval(interval);
      closeUploadModal();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploadState((prev) => ({ ...prev, isUploading: false }));
    }
  };

  const openMediaModal = (media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFileType = (mimeType) => {
    if (mimeType.includes("video")) return "Video";
    if (mimeType.includes("pdf")) return "PDF";
    if (mimeType.includes("word") || mimeType.includes("msword")) return "DOC";
    return mimeType.split("/")[1]?.toUpperCase() || "File";
  };

  const handleDownload = (media) => {
    downloadResource(
      media.path.split("/").pop(),
      `${media.title}.${getFileType(media.type).toLowerCase()}`
    );
  };

  const handleDeleteMedia = async (unit_id, media_id) => {
    try {
      setDeletingMediaId(media_id);
      await deleteUnitContent(unit_id, media_id);
      // Refresh the content
      await getUnitContent(unit_id);
    } catch (error) {
      console.log(
        "Error deleting media from a unit (from the page): ",
        error.response?.data?.error || error.message
      );
    } finally {
      setDeletingMediaId(null);
    }
  };

  if (!unit) {
    return (
      <div className="text-center text-error text-2xl mt-16 font-bold">
        No unit selected
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <GeneralNav />

      <div className="bg-base-100 p-6 pb-0 max-w-6xl w-full mx-auto rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold text-primary mb-6">Unit Content</h2>

        <div className="bg-base-200 rounded-md px-4 py-2 flex justify-between items-center font-semibold text-lg mb-4">
          <span>{unit.unit_name}</span>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost" onClick={openUploadModal}>
              <Plus /> Add
            </button>
          </div>
        </div>

        {unitContent?.length > 0 ? (
          unitContent.map((media, i) => (
            <div
              key={i}
              className="bg-base-100 border rounded-md mt-2 px-4 py-3 mb-3 flex justify-between items-center"
            >
              <div>
                <div
                  className="font-medium cursor-pointer flex items-center gap-2 link-hover"
                  onClick={() =>
                    media.type.includes("video")
                      ? openMediaModal(media)
                      : handleDownload(media)
                  }
                >
                  {media.type.includes("video") ? <Video /> : <File />}
                  {media.title}
                </div>
                <p className="text-sm text-gray-500">
                  {getFileType(media.type)} • Uploaded on{" "}
                  {formatDate(media.date)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleDeleteMedia(unit.unit_id, media._id);
                  }}
                  className="btn btn-sm btn-ghost text-error"
                  disabled={deletingMediaId === media._id}
                >
                  {deletingMediaId === media._id ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <Trash2 />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No content available for this unit
          </div>
        )}

        {/* Upload Modal */}
        <dialog className={`modal ${isUploadModalOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Upload Content</h3>
              <button
                onClick={closeUploadModal}
                className="btn btn-ghost btn-sm"
              >
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter content title"
                  className="input input-bordered w-full"
                  value={uploadState.title}
                  onChange={(e) =>
                    setUploadState({
                      ...uploadState,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">
                    Select File (PDF, DOC, DOCX, MP4)
                  </span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,video/mp4"
                  className="file-input file-input-bordered w-full"
                  onChange={handleFileChange}
                />
                {uploadState.file && (
                  <div className="mt-2 text-sm text-gray-500">
                    Selected: {uploadState.file.name}
                  </div>
                )}
              </label>

              {uploadState.isUploading && (
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span>Uploading...</span>
                    <span>{uploadState.uploadProgress}%</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={uploadState.uploadProgress}
                    max="100"
                  ></progress>
                </div>
              )}
            </div>

            <div className="modal-action mt-6">
              <button
                className="btn"
                onClick={closeUploadModal}
                disabled={uploadState.isUploading}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={
                  uploadState.isUploading ||
                  !uploadState.file ||
                  !uploadState.title
                }
              >
                {uploadState.isUploading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </dialog>

        {/* Media Preview Modal */}
        {isModalOpen && selectedMedia && (
          <dialog className="modal modal-open">
            <div className="modal-box w-11/12 max-w-3xl">
              <h3 className="font-bold text-xl mb-2">{selectedMedia.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Uploaded on {formatDate(selectedMedia.date)}
              </p>

              <div className="w-full flex items-center justify-center">
                {selectedMedia.type.includes("video") ? (
                  <div className="w-full aspect-video bg-black">
                    <video
                      controls
                      controlsList="nodownload"
                      disablePictureInPicture
                      className="w-full rounded"
                    >
                      <source
                        src={`http://localhost:8001/resources/${selectedMedia.path
                          .split("/")
                          .pop()}`}
                        type={selectedMedia.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <File className="h-16 w-16 mx-auto text-gray-400" />
                      <p className="mt-4">
                        Preview not available for this file type
                      </p>
                      <button
                        onClick={() => handleDownload(selectedMedia)}
                        className="btn btn-primary mt-4"
                      >
                        Download File
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-action">
                <button className="btn" onClick={closeMediaModal}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}

export default AdminUnitContent;

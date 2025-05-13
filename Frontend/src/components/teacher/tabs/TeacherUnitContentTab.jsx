import { useLocation, useParams } from "react-router-dom";
import { Trash2, File, Video, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTeacherStore } from "../../../store/TeacherStore";
import { useCourseStore } from "../../../store/CourseStore";
import UploadModal from "../../course/UploadModal";
import MediaPreviewModal from "../../course/MediaPreviewModal";

function TeacherUnitContentTab() {
  const location = useLocation();
  const unit = location.state?.unit;

  const { unit_id } = useParams();

  const { getUnitContent, unitContent, addUnitContent, deleteUnitContent } =
    useTeacherStore();
  const { downloadResource } = useCourseStore();

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
    const fetcheContents = async () => {
      try {
        await getUnitContent(unit_id);
      } catch (error) {
        console.error("Failed to load unit content:", error);
      }
    };

    fetcheContents();
  }, [unit_id, getUnitContent]);

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

      await addUnitContent(unit_id, formData);
      await getUnitContent(unit_id);

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
  if (!unitContent) {
    return (
      <div className="text-center text-error text-2xl mt-16 font-bold">
        No unit selected
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-md">
      {/* Unit Header */}
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
                {getFileType(media.type)} • Uploaded on {formatDate(media.date)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleDeleteMedia(unit_id, media._id);
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
      <UploadModal
        isOpen={isUploadModalOpen}
        closeUploadModal={closeUploadModal}
        uploadState={uploadState}
        setUploadState={setUploadState}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
      />

      <MediaPreviewModal
        isOpen={isModalOpen}
        selectedMedia={selectedMedia}
        closeModal={closeMediaModal}
        handleDownload={handleDownload}
        formatDate={formatDate}
      />
    </div>
  );
}

export default TeacherUnitContentTab;

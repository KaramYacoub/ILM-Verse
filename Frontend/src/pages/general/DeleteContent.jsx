import { useParams } from "react-router-dom";
import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";

function DeleteContent() {
  const { courseId } = useParams();

  // Dummy data to simulate course units and lessons
  const [units, setUnits] = useState([
    {
      name: "Unit 1: Introduction",
      lessons: [
        {
          id: 1,
          name: "Lecture: Welcome to the Course",
          duration: "38:45",
          uploadedOn: "Apr 5, 2025",
        },
        {
          id: 2,
          name: "Lecture: Course Overview",
          duration: "25:20",
          uploadedOn: "Apr 6, 2025",
        },
      ],
    },
    {
      name: "Unit 2: Advanced Topics",
      lessons: [
        {
          id: 3,
          name: "Lecture: Deep Dive",
          duration: "45:10",
          uploadedOn: "Apr 10, 2025",
        },
      ],
    },
  ]);

  // Handle deleting a lesson by id
  const handleDeleteLesson = (unitIndex, lessonId) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].lessons = updatedUnits[unitIndex].lessons.filter(
      (lesson) => lesson.id !== lessonId
    );
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

        {/* Units Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Course Content
          </h2>

          <div className="space-y-6">
            {units.map((unit, unitIndex) => (
              <div key={unitIndex} className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title text-xl">{unit.name}</h3>

                  <div className="space-y-3 mt-4">
                    {unit.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex justify-between items-center p-3 rounded-lg bg-base-100 hover:bg-base-300"
                      >
                        <div>
                          <p className="font-medium">{lesson.name}</p>
                          <p className="text-sm text-gray-500">
                            MP4 • {lesson.duration} • Uploaded on{" "}
                            {lesson.uploadedOn}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleDeleteLesson(unitIndex, lesson.id)
                          }
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteContent;

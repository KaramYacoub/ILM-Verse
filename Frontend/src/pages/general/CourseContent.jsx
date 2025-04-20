import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import SearchCourse from "../../components/general/SearchCourse";

function CourseContent() {
  const [courses] = useState([
    {
      courseId: "CRS-001",
      name: "Mathematics Fundamentals",
      grade: "KG",
      status: "Active",
      lastUpdated: "Apr 5, 2025",
    },
    {
      courseId: "CRS-002",
      name: "Science Explorers",
      grade: "Primary",
      status: "Active",
      lastUpdated: "Apr 4, 2025",
    },
    {
      courseId: "CRS-003",
      name: "Advanced Physics",
      grade: "Intermediate Male",
      status: "Pending",
      lastUpdated: "Apr 3, 2025",
    },
    {
      courseId: "CRS-004",
      name: "Biology for Girls",
      grade: "Intermediate Female",
      status: "Active",
      lastUpdated: "Apr 2, 2025",
    },
    {
      courseId: "CRS-005",
      name: "English Literature",
      grade: "Primary",
      status: "Active",
      lastUpdated: "Apr 1, 2025",
    },
    {
      courseId: "CRS-006",
      name: "Creative Arts",
      grade: "KG",
      status: "Active",
      lastUpdated: "Mar 30, 2025",
    },
    {
      courseId: "CRS-007",
      name: "Computer Science",
      grade: "Intermediate Male",
      status: "Active",
      lastUpdated: "Mar 28, 2025",
    },
  ]);

  const handleShowCourse = (courseId) => {
    // Handle showing course details
    console.log("Showing course:", courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">General Administrator</h1>
        <h2 className="text-2xl font-semibold mb-6">Edit Content</h2>

        {/* Search Course Component */}
        <SearchCourse courses={courses} onShowCourse={handleShowCourse} />
      </div>
    </div>
  );
}

export default CourseContent;

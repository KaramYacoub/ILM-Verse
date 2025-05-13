import ParentNavBar from "../../components/parent/ParentNavBar";
import CourseCard from "../../components/shared/CourseCard";
import { Link } from "react-router-dom";
import { useState } from "react";

function ParentDashboard() {
  const [children] = useState([
    { id: 1, name: "Anas Ghnaim" },
    { id: 2, name: "Hamzah Ghnaim" },
    { id: 3, name: "Mohammad Ghnaim" },
  ]);
  const [selectedChild, setSelectedChild] = useState(children[0].id);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <ParentNavBar />

      <div className="flex flex-col items-start justify-center mt-10 px-4 md:px-8">
        {/* Dropdown and Grades Button Container */}
        <div className="w-full flex justify-center mb-8 gap-4">
          <div className="relative w-full max-w-md">
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full px-6 py-3 text-lg font-medium text-gray-700 bg-white border-2 border-primary/20 rounded-xl shadow-sm 
                       focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30
                       appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')] 
                       bg-no-repeat bg-[right_1rem_center] cursor-pointer transition-all duration-200"
            >
              <option disabled value="" className="text-gray-400">
                Choose a Student
              </option>
              {children.map((child) => (
                <option
                  key={child.id}
                  value={child.id}
                  className="text-gray-700 py-2"
                >
                  {child.name}
                </option>
              ))}
            </select>
          </div>
          <Link
            to={`/parent-view-grades`}
            className="btn btn-active btn-primary rounded-full h-16 w-48 font-semibold text-xl text-base-100"
          >
            Show Grades
          </Link>

          <Link
            to="/parent-show-absences"
            className="btn btn-active btn-primary rounded-full h-16 w-48 font-semibold text-xl text-base-100"
          >
            Show Absences
          </Link>
          <Link
            to="/parent-show-reports"
            className="btn btn-active btn-primary rounded-full h-16 w-48 font-semibold text-xl text-base-100"
          >
            Show Reports
          </Link>
        </div>

        {/* Course Header Section */}
        <div className="w-full">
          <div>
            <h1 className="text-6xl font-bold text-primary">My Courses</h1>
            <p className="mt-2 text-3xl text-primary">Course overview</p>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
          {Array.from({ length: 6 }, (_, index) => (
            <CourseCard key={index} to="/parent-course-content" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;

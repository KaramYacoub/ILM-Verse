import ParentNavBar from "../../components/parent/ParentNavBar";
import { Link } from "react-router-dom";
import { useState } from "react";

function ParentViewGrades() {
  const [children] = useState([
    {
      id: 1,
      name: "Anas Ghnaim",
      gpa: 91.3,
      classRank: { rank: 3, total: 28 },
      grade: 9,
      courses: [
        {
          name: "Mathematics (Algebra II)",
          teacher: "Mrs. Rodriguez",
          term1: 37,
          term2: 38,
          term3: 39,
          final: 76,
          grade: 94,
          classAvg: 85,
        },
        {
          name: "Physics",
          teacher: "Mr. Johnson",
          term1: 36,
          term2: 37,
          term3: 38,
          final: 75,
          grade: 92,
          classAvg: 83,
        },
        {
          name: "English Literature",
          teacher: "Ms. Williams",
          term1: 35,
          term2: 36,
          term3: 37,
          final: 74,
          grade: 90,
          classAvg: 82,
        },
        {
          name: "World History",
          teacher: "Mr. Patel",
          term1: 34,
          term2: 35,
          term3: 36,
          final: 72,
          grade: 88,
          classAvg: 81,
        },
        {
          name: "Computer Science",
          teacher: "Mrs. Kim",
          term1: 38,
          term2: 39,
          term3: 40,
          final: 78,
          grade: 95,
          classAvg: 79,
        },
        {
          name: "Physical Education",
          teacher: "Coach Garcia",
          term1: 35,
          term2: 36,
          term3: 37,
          final: 71,
          grade: 89,
          classAvg: 86,
        }
      ]
    },
    {
      id: 2,
      name: "Hamzah Ghnaim",
      gpa: 88.5,
      classRank: { rank: 5, total: 30 },
      grade: 7,
      courses: [
        {
          name: "Basic Mathematics",
          teacher: "Mr. Smith",
          term1: 35,
          term2: 36,
          term3: 37,
          final: 72,
          grade: 89,
          classAvg: 80,
        },
        {
          name: "General Science",
          teacher: "Ms. Thompson",
          term1: 33,
          term2: 34,
          term3: 35,
          final: 70,
          grade: 85,
          classAvg: 78,
        },
        {
          name: "English Language",
          teacher: "Mrs. Wilson",
          term1: 34,
          term2: 35,
          term3: 36,
          final: 71,
          grade: 87,
          classAvg: 82,
        },
        {
          name: "Social Studies",
          teacher: "Mr. Davis",
          term1: 32,
          term2: 33,
          term3: 34,
          final: 68,
          grade: 83,
          classAvg: 75,
        },
        {
          name: "Art & Design",
          teacher: "Ms. Roberts",
          term1: 38,
          term2: 39,
          term3: 40,
          final: 79,
          grade: 93,
          classAvg: 85,
        },
        {
          name: "Physical Education",
          teacher: "Coach Miller",
          term1: 36,
          term2: 37,
          term3: 38,
          final: 73,
          grade: 91,
          classAvg: 88,
        }
      ]
    },
    {
      id: 3,
      name: "Mohammad Ghnaim",
      gpa: 95.0,
      classRank: { rank: 1, total: 25 },
      grade: 11,
      courses: [
        {
          name: "Advanced Chemistry",
          teacher: "Dr. Brown",
          term1: 39,
          term2: 40,
          term3: 40,
          final: 80,
          grade: 98,
          classAvg: 88,
        },
        {
          name: "Advanced Physics",
          teacher: "Dr. Wilson",
          term1: 38,
          term2: 39,
          term3: 40,
          final: 79,
          grade: 97,
          classAvg: 85,
        },
        {
          name: "Calculus BC",
          teacher: "Mr. Taylor",
          term1: 37,
          term2: 38,
          term3: 39,
          final: 77,
          grade: 96,
          classAvg: 82,
        },
        {
          name: "World Literature",
          teacher: "Ms. Anderson",
          term1: 36,
          term2: 37,
          term3: 38,
          final: 75,
          grade: 94,
          classAvg: 80,
        },
        {
          name: "Modern History",
          teacher: "Mr. Clark",
          term1: 35,
          term2: 36,
          term3: 37,
          final: 74,
          grade: 93,
          classAvg: 78,
        },
        {
          name: "Programming & CS",
          teacher: "Mrs. White",
          term1: 40,
          term2: 40,
          term3: 40,
          final: 80,
          grade: 99,
          classAvg: 84,
        }
      ]
    }
  ]);

  const [selectedChildId, setSelectedChildId] = useState(children[0].id);
  const selectedChild = children.find(child => child.id === selectedChildId);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <ParentNavBar />
      
      <div className="w-full flex justify-between items-center mt-10 px-5">
        <div className="flex items-center gap-6 ml-5">
          <h1 className="text-4xl font-bold text-primary">My Grades</h1>
          <select 
            value={selectedChildId}
            onChange={(e) => setSelectedChildId(Number(e.target.value))}
            className="select select-bordered w-64 max-w-xs text-lg font-medium
                      border-2 border-primary/20 rounded-xl shadow-sm
                      focus:outline-none focus:border-primary
                      bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')]
                      bg-no-repeat bg-[right_1rem_center] cursor-pointer"
          >
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 mr-5">
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
      </div>

      <div className="p-6 space-y-8 w-full max-w-4xl bg-base-100 rounded-lg shadow-md mt-5">
        <h2 className="text-lg font-semibold bg-primary text-base-100 px-4 py-2 rounded-md w-fit">
          Course Grades - {selectedChild.name} (Grade {selectedChild.grade})
        </h2>
        
        <div className="bg-base-100 rounded-lg shadow-sm p-6 flex justify-between gap-4">
          <div className="flex-1 bg-base-200 p-4 rounded-lg text-center">
            <p className="font-semibold text-gray-600">Current GPA</p>
            <p className="text-2xl font-bold text-primary">{selectedChild.gpa}/100</p>
          </div>
          <div className="flex-1 bg-base-200 p-4 rounded-lg text-center">
            <p className="font-semibold text-gray-600">Class Rank</p>
            <p className="text-2xl font-bold text-primary">
              {selectedChild.classRank.rank}
              <span className="text-sm text-gray-600">
                {" "}of {selectedChild.classRank.total}
              </span>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md shadow-md bg-base-300">
          <table className="table w-full text-center">
            <thead className="bg-primary text-base-100 text-base">
              <tr>
                <th>Course</th>
                <th>Teacher</th>
                <th>Term 1</th>
                <th>Term 2</th>
                <th>Term 3</th>
                <th>Final</th>
                <th>Grade</th>
                <th>Class Avg</th>
              </tr>
            </thead>
            <tbody>
              {selectedChild.courses.map((course, i) => (
                <tr key={i} className="hover">
                  <td>{course.name}</td>
                  <td>{course.teacher}</td>
                  <td>{course.term1}/40</td>
                  <td>{course.term2}/40</td>
                  <td>{course.term3}/40</td>
                  <td>{course.final}/80</td>
                  <td className="text-primary font-bold">{course.grade}</td>
                  <td>{course.classAvg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ParentViewGrades;
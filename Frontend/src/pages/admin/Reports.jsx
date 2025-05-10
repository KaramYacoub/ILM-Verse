import AdminNavbar from "../../components/admin/adminNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Reports() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Mock student data with reports
  const studentsWithReports = [
    {
      id: 101,
      name: "Amina Khalid",
      grade: "Grade 9",
      reports: [
        {
          type: "Mid-Term Progress Report",
          date: "Feb 10, 2025",
          teacher: "Multiple Teachers",
          status: "Published",
        },
        // ... other reports
      ],
    },
    // ... other students
  ];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = studentsWithReports.filter(
        (student) =>
          student.name.toLowerCase().includes(term.toLowerCase()) ||
          student.id.toString().includes(term)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Display either search results or all reports
  const displayData =
    searchTerm.length > 0 ? searchResults : studentsWithReports;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Student Reports Management</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate("/generate-report")}
            >
              Add New Report
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by student name or ID"
                className="border px-4 py-2 rounded w-64 pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex space-x-4">
            <select className="border px-4 py-2 rounded">
              <option>Grade</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>

            <select className="border px-4 py-2 rounded">
              <option>Course</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>Language Arts</option>
            </select>
          </div>
        </div>

        <hr className="my-4" />

        <h2 className="text-xl font-semibold mb-4">
          {searchTerm.length > 0
            ? "Search Results"
            : "Student Progress Reports"}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border text-left">Student Name</th>
                <th className="py-3 px-4 border text-left">Grade</th>
                <th className="py-3 px-4 border text-left">Report Type</th>
                <th className="py-3 px-4 border text-left">Date</th>
                <th className="py-3 px-4 border text-left">Teacher</th>
                <th className="py-3 px-4 border text-left">Status</th>
                <th className="py-3 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayData.flatMap((student) =>
                student.reports.map((report, index) => (
                  <tr key={`${student.id}-${index}`}>
                    <td className="py-3 px-4 border">{student.name}</td>
                    <td className="py-3 px-4 border">{student.grade}</td>
                    <td className="py-3 px-4 border">{report.type}</td>
                    <td className="py-3 px-4 border">{report.date}</td>
                    <td className="py-3 px-4 border">{report.teacher}</td>
                    <td
                      className={`py-3 px-4 border ${
                        report.status === "Published"
                          ? "text-green-600"
                          : report.status === "Pending Review"
                          ? "text-yellow-600"
                          : ""
                      }`}
                    >
                      {report.status}
                    </td>
                    <td className="py-3 px-4 border">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() =>
                          navigate(`/report/${student.id}/${index}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {displayData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reports found matching your search
          </div>
        )}

        <footer className="mt-8 text-center text-gray-500 text-sm"></footer>
      </div>
    </div>
  );
}

export default Reports;

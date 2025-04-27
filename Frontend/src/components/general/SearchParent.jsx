import { useState } from "react";

function SearchParent({ parents, students }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = parents.filter((parent) => {
        // Search by parent name or ID
        const parentMatch =
          parent.name.toLowerCase().includes(term.toLowerCase()) ||
          parent.id.toLowerCase().includes(term.toLowerCase());

        // Search by student name or ID through parent's studentId
        const student = students.find((s) => s.id === parent.studentId);
        const studentMatch =
          student &&
          (student.name.toLowerCase().includes(term.toLowerCase()) ||
            student.id.toLowerCase().includes(term.toLowerCase()));

        return parentMatch || studentMatch;
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by parent name, ID, or student name/ID"
          className="input input-bordered w-full pl-10"
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

      {/* Search Results Table */}
      {searchResults.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Parent Search Results</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th>Parent ID</th>
                  <th>Parent Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((parent) => {
                  const student = students.find(
                    (s) => s.id === parent.studentId
                  );
                  return (
                    <tr key={parent.id} className="hover">
                      <td>{parent.id}</td>
                      <td>{parent.name}</td>
                      <td>{parent.email}</td>
                      <td>{parent.phone}</td>
                      <td>{student ? student.name : "N/A"}</td>
                      <td>{student ? student.id : "N/A"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchParent;

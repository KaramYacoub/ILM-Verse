import { useState } from "react";
import { X, Search } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Exam Week Notice",
    content: "Exam week starts next Monday.",
    sender: "Principal",
    date: "2025-05-10",
    sections: ["All"],
  },
  {
    id: 2,
    title: "Science Homework",
    content: "Don't forget to submit your lab report.",
    sender: "Science Teacher",
    date: "2025-05-12",
    sections: ["Intermediate Male"],
  },
  // ...add more announcements as needed
];

const studentSection = "Intermediate Male";

export default function StudentChatPanel({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  // Filter announcements for student section OR for "All"
  const filteredAnnouncements = announcements.filter(
    (a) => a.sections.includes("All") || a.sections.includes(studentSection)
  );

  const searchedAnnouncements = filteredAnnouncements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-lg z-50 border-l border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center bg-primary text-white px-4 py-3">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <button onClick={onClose}>
          <X className="text-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="p-4 overflow-y-auto h-[calc(100%-104px)]">
        {searchedAnnouncements.length > 0 ? (
          searchedAnnouncements.map((a) => (
            <div
              key={a.id}
              className="p-3 border rounded-md mb-3 hover:bg-gray-50"
            >
              <div className="flex justify-between">
                <h3 className="font-medium text-primary">{a.title}</h3>
                <span className="text-xs text-gray-500">{a.date}</span>
              </div>
              <p className="text-sm mt-1">{a.content}</p>
              <div className="text-xs text-gray-500 mt-2">
                From: {a.sender} • Sections: {a.sections.join(", ")}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No announcements found.
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { X, Search } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "New Exam Schedule",
    content: "Exams will start next week.",
    sender: "School Principal",
    date: "2025-05-10",
    sections: ["All"],
  },
  {
    id: 2,
    title: "Homework Reminder",
    content: "Please complete the assignment by Friday.",
    sender: "Math Teacher",
    date: "2025-05-11",
    sections: ["Intermediate Male"],
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    content: "Meeting scheduled next Thursday.",
    sender: "Vice Principal",
    date: "2025-05-09",
    sections: ["Primary", "Intermediate Female"],
  },
];

// Example sections of parent's children (could come from props or API)
const parentSections = ["Intermediate Male", "Primary", "Intermediate Female"];

export default function ParentChatPanel({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState(parentSections[0]);

  if (!isOpen) return null;

  // Filter announcements by selected section or "All"
  const filteredAnnouncements = announcements.filter(
    (a) => a.sections.includes("All") || a.sections.includes(selectedSection)
  );

  const searchedAnnouncements = filteredAnnouncements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg border-l border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-primary text-white px-4 py-3">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <button onClick={onClose}>
          <X className="text-white" />
        </button>
      </div>

      {/* Section Selector */}
      <div className="p-3 border-b border-gray-200">
        <label htmlFor="section-select" className="block mb-1 font-medium">
          Select Section
        </label>
        <select
          id="section-select"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          {parentSections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
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
      <div className="p-4 overflow-y-auto flex-1">
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

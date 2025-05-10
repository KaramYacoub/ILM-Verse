import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const users = [
  {
    id: "0211765",
    name: "Anas Ghnaim",
  },
  {
    id: "0211766",
    name: "Talal Majed",
  },
  {
    id: "0211767",
    name: "Ali Alsharif",
  },
];

function ChatPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("starred");
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredUsers = users.filter((user) => {
    const nameParts = user.name.split(" ");
    return nameParts.some((part) =>
      part.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-lg z-50 border-l border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center bg-primary text-white px-4 py-3">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button onClick={onClose}>
          <FaTimes className="text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b">
        {["starred", "private"].map((tab) => (
          <button
            key={tab}
            className={`w-full py-2 font-semibold capitalize ${
              activeTab === tab
                ? "border-b-4 border-secondary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      {activeTab === "starred" && (
        <div className="p-3">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
        {activeTab === "starred" && (
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <div className="font-medium text-primary">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.id}</div>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="text-gray-500 text-sm">No matches found.</div>
            )}
          </div>
        )}
        {activeTab === "private" && <div>No private messages yet.</div>}
      </div>
    </div>
  );
}

export default ChatPanel;

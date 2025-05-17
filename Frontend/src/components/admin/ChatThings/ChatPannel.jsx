import { useState } from "react";
import { X } from "lucide-react";

const announcementGroups = [
  "General",
  "KG",
  "Primary",
  "Intermediate Male",
  "Intermediate Female",
];

function AnnouncementPanel({ isOpen, onClose }) {
  const [announcementText, setAnnouncementText] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [announcementViewTab, setAnnouncementViewTab] = useState("send");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnnouncement = {
      id: Date.now(),
      text: announcementText,
      group: selectedGroup,
      timestamp: new Date().toLocaleString(),
    };

    setAnnouncements((prev) => [...prev, newAnnouncement]);
    setAnnouncementText("");
    setSelectedGroup("");

    console.log("Announcement submitted:", newAnnouncement);
  };

  return (
    <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg border-l border-gray-200 z-40">
      {/* Header */}
      <div className="flex justify-between items-center bg-primary text-white px-4 py-3">
        <h2 className="text-lg font-semibold">
          {announcementViewTab === "send"
            ? "Send Announcement"
            : "View Announcements"}
        </h2>
        <button onClick={onClose}>
          <X className="text-white w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b">
        {["send", "view"].map((tab) => (
          <button
            key={tab}
            className={`w-full py-2 font-semibold capitalize ${
              announcementViewTab === tab
                ? "border-b-4 border-secondary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setAnnouncementViewTab(tab)}
          >
            {tab === "send" ? "Send Announcement" : "View Announcements"}
          </button>
        ))}
      </div>

      {announcementViewTab === "send" ? (
        <form
          onSubmit={handleSubmit}
          className="p-4 overflow-y-auto h-[calc(100%-200px)]"
        >
          <textarea
            placeholder="Type your announcement here..."
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
            required
          />

          <h3 className="font-medium mt-4 mb-2">Select Group:</h3>
          <div className="space-y-2 mb-4">
            {announcementGroups.map((group) => (
              <label
                key={group}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="announcementGroup"
                  value={group}
                  checked={selectedGroup === group}
                  onChange={() => setSelectedGroup(group)}
                  className="form-radio text-primary"
                  required
                />
                <span
                  className={`text-sm ${
                    selectedGroup === group
                      ? "text-primary font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {group}
                </span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={!announcementText || !selectedGroup}
            className={`w-full py-2 px-4 rounded-md text-white ${
              !announcementText || !selectedGroup
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            Submit Announcement
          </button>
        </form>
      ) : (
        <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
          <h3 className="font-medium mb-2">Filter by Group:</h3>
          <div className="space-y-2 mb-4">
            {announcementGroups.map((group) => (
              <label
                key={group}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="viewGroup"
                  value={group}
                  checked={selectedGroup === group}
                  onChange={() => setSelectedGroup(group)}
                  className="form-radio text-primary"
                />
                <span
                  className={`text-sm ${
                    selectedGroup === group
                      ? "text-primary font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {group}
                </span>
              </label>
            ))}
          </div>

          {announcements
            .filter((a) =>
              selectedGroup === "General" || selectedGroup === ""
                ? true
                : a.group === selectedGroup
            )
            .map((a) => (
              <div
                key={a.id}
                className="mb-3 p-3 bg-gray-100 rounded-md border"
              >
                <div className="text-sm">{a.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Group: {a.group}
                </div>
                <div className="text-[10px] text-gray-400">{a.timestamp}</div>
              </div>
            ))}

          {announcements.length === 0 && (
            <div className="text-center text-gray-500 mt-6">
              No announcements yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AnnouncementPanel;

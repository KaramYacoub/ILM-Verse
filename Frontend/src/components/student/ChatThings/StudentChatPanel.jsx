import { useState } from "react";
import { X, Search, Send } from "lucide-react";

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
];

const users = {
  Admin: [
    { id: "A001", name: "Principal" },
    { id: "A002", name: "Vice Principal" },
  ],
  Teacher: [
    { id: "T001", name: "Math Teacher", section: "Intermediate Male" },
    { id: "T002", name: "Science Teacher", section: "Primary" },
  ],
};

const studentSection = "Intermediate Male";

export default function StudentChatPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("announcements");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Admin");
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  if (!isOpen) return null;

  const filteredAnnouncements = announcements.filter(
    (a) => a.sections.includes("All") || a.sections.includes(studentSection)
  );

  const searchedAnnouncements = filteredAnnouncements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users[selectedType].filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedUser) return;

    const key = `${selectedType}-${selectedUser.id}`;
    const newMsg = {
      id: Date.now(),
      content: message,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
      isOwn: true,
    };

    setConversations((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newMsg],
    }));

    setMessage("");

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        content: "Thanks for reaching out!",
        sender: selectedUser.name,
        timestamp: new Date().toLocaleTimeString(),
        isOwn: false,
      };
      setConversations((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), reply],
      }));
    }, 1000);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-lg z-50 border-l border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center bg-primary text-white px-4 py-3">
        <h2 className="text-lg font-semibold">Student Chat</h2>
        <button onClick={onClose}>
          <X className="text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b">
        {["announcements", "messages"].map((tab) => (
          <button
            key={tab}
            className={`w-full py-2 font-semibold capitalize ${
              activeTab === tab
                ? "border-b-4 border-secondary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setSearchTerm("");
              setSelectedUser(null);
              setShowPopup(false);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={
              activeTab === "announcements"
                ? "Search announcements..."
                : `Search ${selectedType}s...`
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
        {activeTab === "announcements" &&
          (searchedAnnouncements.length > 0 ? (
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
          ))}

        {activeTab === "messages" && (
          <>
            <div className="flex gap-2 mb-4">
              {Object.keys(users).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setSelectedUser(null);
                    setShowPopup(false);
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedType === type
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {type}s
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleUserClick(user)}
                  >
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.id}</div>
                    {user.section && (
                      <div className="text-xs text-gray-400">
                        Section: {user.section}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  No users found
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Message Popup */}
      {showPopup && selectedUser && (
        <div className="fixed bottom-4 right-4 md:right-[420px] w-[320px] h-[450px] bg-white shadow-lg border rounded-lg flex flex-col z-50">
          <div className="flex justify-between items-center bg-primary text-white px-4 py-2 rounded-t-md">
            <h3 className="text-sm font-semibold">
              Chat with {selectedUser.name}
            </h3>
            <button onClick={() => setShowPopup(false)}>
              <X className="text-white w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {(conversations[`${selectedType}-${selectedUser.id}`] || []).map(
              (msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[75%] p-2 rounded-md text-sm ${
                    msg.isOwn
                      ? "ml-auto bg-primary text-white"
                      : "mr-auto bg-gray-200"
                  }`}
                >
                  {msg.content}
                  <div className="text-[10px] opacity-60 text-right mt-1">
                    {msg.timestamp}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex border-t p-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`px-4 py-2 rounded-r-md ${
                !message.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary text-white"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

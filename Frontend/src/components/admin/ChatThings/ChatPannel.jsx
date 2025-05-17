import { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

const users = {
  parent: [
    { id: "0211765", name: "Anas Ghnaim" },
    { id: "0211766", name: "Talal Majed" },
    { id: "0211767", name: "Ali Alsharif" },
  ],
  teacher: [
    { id: "0311765", name: "Mohammed Ahmed" },
    { id: "0311766", name: "Sarah Johnson" },
    { id: "0311767", name: "David Wilson" },
  ],
  student: [
    { id: "0411765", name: "Omar Khalid" },
    { id: "0411766", name: "Layla Mohammed" },
    { id: "0411767", name: "Fatima Ali" },
  ],
};

const announcementGroups = [
  "KG",
  "Primary",
  "Intermediate Male",
  "Intermediate Female",
];

function ChatPanel({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState("chat");
  const [activeTab, setActiveTab] = useState("parent");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [announcementText, setAnnouncementText] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementViewTab, setAnnouncementViewTab] = useState("send");

  if (!isOpen) return null;

  const filteredUsers = users[activeTab].filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setActiveChatUser(user);
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !activeChatUser) return;

    const key = `${activeTab}-${activeChatUser.id}`;
    const newMessage = {
      id: Date.now(),
      content: messageInput,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
      isOwn: true,
    };

    setMessages((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newMessage],
    }));
    setMessageInput("");

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        content: "Auto-reply to: " + messageInput,
        sender: activeChatUser.name,
        timestamp: new Date().toLocaleTimeString(),
        isOwn: false,
      };

      setMessages((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), reply],
      }));
    }, 1000);
  };

  const closeChatPopup = () => {
    setActiveChatUser(null);
    setMessageInput("");
  };

  const toggleGroupSelection = (group) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const handleSendAnnouncement = () => {
    const newAnnouncement = {
      id: Date.now(),
      text: announcementText,
      groups: [...selectedGroups],
      timestamp: new Date().toLocaleString(),
    };

    setAnnouncements((prev) => [...prev, newAnnouncement]);
    setAnnouncementText("");
    setSelectedGroups([]);
    alert("Announcement sent successfully!");
  };

  return (
    <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg border-l border-gray-200 z-40">
      {/* Header */}
      <div className="flex justify-between items-center bg-primary text-white px-4 py-3">
        <h2 className="text-lg font-semibold">
          {activeSection === "chat" ? "Chat" : "Announcements"}
        </h2>
        <button onClick={onClose}>
          <FaTimes className="text-white" />
        </button>
      </div>

      {/* Section Switch */}
      <div className="flex justify-around border-b">
        <button
          className={`w-full py-2 font-semibold ${
            activeSection === "chat"
              ? "border-b-4 border-secondary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveSection("chat")}
        >
          Chat
        </button>
        <button
          className={`w-full py-2 font-semibold ${
            activeSection === "announcement"
              ? "border-b-4 border-secondary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => {
            setActiveSection("announcement");
            setActiveChatUser(null);
          }}
        >
          Announcements
        </button>
      </div>

      {/* Chat Section */}
      {activeSection === "chat" && (
        <>
          <div className="flex justify-around border-b">
            {["parent", "teacher", "student"].map((tab) => (
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
                  setActiveChatUser(null);
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-3">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="px-4 overflow-y-auto h-[calc(100%-180px)]">
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <div className="font-medium text-primary">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Announcement Section */}
      {activeSection === "announcement" && (
        <>
          {/* Toggle between send and view */}
          <div className="flex justify-around border-b">
            <button
              className={`w-full py-2 font-semibold ${
                announcementViewTab === "send"
                  ? "border-b-4 border-secondary text-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setAnnouncementViewTab("send")}
            >
              Send
            </button>
            <button
              className={`w-full py-2 font-semibold ${
                announcementViewTab === "view"
                  ? "border-b-4 border-secondary text-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setAnnouncementViewTab("view")}
            >
              View
            </button>
          </div>

          {announcementViewTab === "send" && (
            <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
              <textarea
                placeholder="Type your announcement here..."
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
              />

              <h3 className="font-medium mt-4 mb-2">Select Groups:</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {announcementGroups.map((group) => (
                  <button
                    key={group}
                    className={`py-2 px-3 rounded-md border ${
                      selectedGroups.includes(group)
                        ? "bg-secondary text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => toggleGroupSelection(group)}
                  >
                    {group}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSendAnnouncement}
                disabled={!announcementText || selectedGroups.length === 0}
                className={`w-full py-2 px-4 rounded-md text-white ${
                  !announcementText || selectedGroups.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark"
                }`}
              >
                Send Announcement
              </button>
            </div>
          )}

          {announcementViewTab === "view" && (
            <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
              <h3 className="font-medium mb-2">Filter by Group:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {announcementGroups.map((group) => (
                  <button
                    key={group}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      selectedGroups.includes(group)
                        ? "bg-secondary text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => toggleGroupSelection(group)}
                  >
                    {group}
                  </button>
                ))}
              </div>

              {announcements
                .filter((a) =>
                  selectedGroups.length > 0
                    ? a.groups.some((g) => selectedGroups.includes(g))
                    : true
                )
                .map((a) => (
                  <div
                    key={a.id}
                    className="mb-3 p-3 bg-gray-100 rounded-md border"
                  >
                    <div className="text-sm">{a.text}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Groups: {a.groups.join(", ")}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {a.timestamp}
                    </div>
                  </div>
                ))}

              {announcements.length === 0 && (
                <div className="text-center text-gray-500 mt-6">
                  No announcements yet.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Chat Popup */}
      {activeChatUser && (
        <div className="fixed bottom-4 right-4 md:right-[420px] w-[320px] h-[450px] bg-white shadow-lg border rounded-lg flex flex-col z-50">
          <div className="flex justify-between items-center bg-primary text-white px-4 py-2 rounded-t-md">
            <h3 className="text-sm font-semibold">
              Conversation with {activeChatUser.name}
            </h3>
            <button onClick={closeChatPopup}>
              <FaTimes className="text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {(messages[`${activeTab}-${activeChatUser.id}`] || []).map(
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
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
            />
            <button
              onClick={sendMessage}
              disabled={!messageInput.trim()}
              className={`px-4 py-2 rounded-r-md ${
                !messageInput.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary text-white"
              }`}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPanel;

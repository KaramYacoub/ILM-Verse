import { useEffect, useState } from "react";
import { X, Send, List, Filter } from "lucide-react";
import { useAdminStore } from "../../store/AdminStore";

function AnnouncementPanel({ isOpen, onClose }) {
  const { getAllDepartments } = useAdminStore();

  const [announcementText, setAnnouncementText] = useState("");
  const [depts, setDepts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState("send");

  useEffect(() => {
    const fetchDepts = async () => {
      const allDepts = await getAllDepartments();
      const departmentsWithGeneral = [
        { department_id: "General", name: "General" },
        ...allDepts.data,
      ];
      setDepts(departmentsWithGeneral);
    };
    fetchDepts();
  }, [getAllDepartments]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnnouncement = {
      id: Date.now(),
      text: announcementText,
      group: selectedGroup, // always a string
      timestamp: new Date().toLocaleString(),
    };

    setAnnouncements((prev) => [...prev, newAnnouncement]);
    setAnnouncementText("");
    setSelectedGroup("");
    setActiveTab("view");
  };

  const filteredAnnouncements =
    selectedGroup === "" || selectedGroup === "General"
      ? announcements
      : announcements.filter((a) => a.group === selectedGroup);

  return (
    <div className="fixed inset-0 md:left-auto md:right-0 w-full md:w-1/2 md:border-base-200 h-full bg-base-100 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-primary text-base-100 px-6 py-4">
        <h2 className="text-xl font-bold">
          {activeTab === "send" ? "New Announcement" : "Announcements"}
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-primary/80 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 font-medium flex items-center justify-center gap-2 ${
            activeTab === "send"
              ? "text-primary border-b-2"
              : "text-neutral hover:text-primary"
          }`}
          onClick={() => setActiveTab("send")}
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
        <button
          className={`flex-1 py-3 font-medium flex items-center justify-center gap-2 ${
            activeTab === "view"
              ? "text-primary border-b-2"
              : "text-neutral hover:text-primary"
          }`}
          onClick={() => setActiveTab("view")}
        >
          <List className="w-4 h-4" />
          <span>View</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "send" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral mb-1">
                Announcement Message
              </label>
              <textarea
                placeholder="Type your announcement here..."
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                rows={5}
                required
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral mb-2">
                Target Group
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {/* All Departments (General) */}
                <button
                  type="button"
                  onClick={() => setSelectedGroup("General")}
                  className={`px-3 py-2 text-sm rounded-md border ${
                    selectedGroup === "General"
                      ? "bg-secondary text-primary"
                      : "hover:bg-neutral/10"
                  }`}
                >
                  General
                </button>

                {/* Individual Departments */}
                {depts.map((department) => (
                  <button
                    key={department.department_id}
                    type="button"
                    onClick={() => setSelectedGroup(department.department_id)}
                    className={`px-3 py-2 text-sm rounded-md border ${
                      selectedGroup === department.department_id
                        ? "bg-secondary text-primary"
                        : "hover:bg-neutral/10"
                    }`}
                  >
                    {department.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!announcementText || !selectedGroup}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                !announcementText || !selectedGroup
                  ? "bg-gray-500 text-base-300 cursor-not-allowed"
                  : "bg-primary text-base-100 hover:bg-primary/90"
              }`}
            >
              Send Announcement
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-neutral mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Group
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGroup("")}
                  className={`px-3 py-1 text-xs rounded-full border ${
                    selectedGroup === ""
                      ? "bg-secondary text-primary"
                      : "hover:bg-neutral/10"
                  }`}
                >
                  All
                </button>
                {depts.map((department) => (
                  <button
                    key={department.department_id}
                    onClick={() => setSelectedGroup(department.department_id)}
                    className={`px-3 py-1 text-xs rounded-full border ${
                      selectedGroup === department.department_id
                        ? "bg-secondary text-primary"
                        : "hover:bg-neutral/10"
                    }`}
                  >
                    {department.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 bg-base-100 rounded-lg border shadow-sm"
                  >
                    <p className="text-neutral">{a.text}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary text-primary rounded-full">
                        {depts.find((d) => d.department_id === a.group)?.name ||
                          a.group}
                      </span>
                      <span className="text-xs text-neutral/60">
                        {a.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-neutral/50 mb-2">
                    No announcements found
                  </div>
                  {selectedGroup && (
                    <button
                      onClick={() => {
                        setSelectedGroup("");
                        setActiveTab("send");
                      }}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Create one now
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementPanel;

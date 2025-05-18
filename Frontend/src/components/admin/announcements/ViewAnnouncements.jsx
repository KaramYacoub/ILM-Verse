import { Filter } from "lucide-react";

function ViewAnnouncements({
  announcements,
  depts,
  selectedGroup,
  setSelectedGroup,
  setActiveTab,
}) {
  const filtered =
    selectedGroup === "" || selectedGroup === "general"
      ? announcements
      : announcements.filter((a) => a.group === selectedGroup);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-neutral mb-2 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter by Group
        </h3>
        <div className="flex flex-wrap gap-2">
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
        {filtered.length > 0 ? (
          filtered.map((a) => {
            const formattedTime = new Date(
              `${a.date}T${a.time}`
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={a.id}
                className="p-4 bg-base-100 rounded-lg border shadow-sm"
              >
                {/* Sender shown at the top */}
                {a.sender && (
                  <div className="mb-1 text-xs text-neutral/60">
                    Sent by: {a.sender}
                  </div>
                )}

                <p className="text-neutral">{a.text}</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary text-primary rounded-full">
                      {depts.find((d) => d.department_id === a.group)?.name ||
                        "General"}
                    </span>
                    {a.group === "general" && a.department_id && (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-accent text-primary rounded-full">
                        {depts.find((d) => d.department_id === a.department_id)
                          ?.name || a.department_id}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral/60">
                    <span>{a.date}</span> at <span>{formattedTime}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <div className="text-neutral/50 mb-2">No announcements found</div>
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
  );
}

export default ViewAnnouncements;

import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import { Link } from "react-router-dom";

function GeneralDash() {
  const [activeActions, setActiveActions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const actionGroups = [
    {
      title: "Quick Actions",
      actions: [
        { id: 1, label: "Addition", path: "/addition" },
        { id: 2, label: "Deletion", path: "/deletion" },
        { id: 3, label: "Reset Password", path: "/reset-password" },
        { id: 4, label: "Posts", path: "/posts" },
        { id: 5, label: "Delete content", path: "/delete-content" },
      ],
    },
    {
      title: "Marks",
      actions: [{ id: 6, label: "Courses", path: "/coursecontent" }],
    },
  ];

  const toggleAction = (id) => {
    setActiveActions((prev) =>
      prev.includes(id)
        ? prev.filter((actionId) => actionId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="search for students"
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Combined Actions Container */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {actionGroups.map((group) => (
            <div key={group.title} className="mb-8 last:mb-0">
              <h2 className="text-xl font-bold mb-4">{group.title}</h2>
              <div className="flex flex-wrap gap-3">
                {group.actions.map((action) => (
                  <Link
                    to={action.path}
                    key={action.id}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeActions.includes(action.id)
                        ? "bg-primary text-white"
                        : "bg-gray-100 hover:bg-primary hover:text-white text-gray-800"
                    }`}
                    onClick={() => toggleAction(action.id)}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GeneralDash;

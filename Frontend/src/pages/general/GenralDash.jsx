import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import { Link } from "react-router-dom";

function GeneralDash() {
  const [activeActions, setActiveActions] = useState([]);

  const actionGroups = [
    {
      title: "Quick Actions",
      actions: [
        { id: 1, label: "Addition", path: "/addition" },
        { id: 2, label: "Deletion", path: "/deletion" },
        { id: 3, label: "Forget Password", path: "/forget-password" },
        { id: 4, label: "Reset Password", path: "/reset-password" },
        { id: 5, label: "Posts", path: "/posts" },
        { id: 6, label: "Delete content", path: "/delete-content" },
      ],
    },
    {
      title: "Marks",
      actions: [{ id: 7, label: "Courses", path: "/courses" }],
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
    <div>
      <GeneralNav />

      <div className="p-6">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="search for students"
          />
        </label>
      </div>

      {/* Combined Actions Container */}
      <div className="px-6 pb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {actionGroups.map((group) => (
            <div key={group.title} className="mb-6 last:mb-0">
              <h2 className="text-xl font-semibold mb-4">{group.title}</h2>
              <div className="flex flex-wrap gap-2">
                {group.actions.map((action) => (
                  <Link
                    to={action.path}
                    key={action.id}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      activeActions.includes(action.id)
                        ? "bg-primary text-white" // Active state
                        : "bg-gray-100 hover:bg-primary hover:text-white text-gray-800" // Inactive + hover
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

import { Link } from "react-router-dom";

function QuickActions({ actionGroups, activeActions, toggleAction }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
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
  );
}

export default QuickActions;

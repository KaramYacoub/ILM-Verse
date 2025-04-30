import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import SearchStudent from "../../components/general/SearchStudent";
import SearchParent from "../../components/general/SearchParent";
import QuickActions from "../../components/general/QuickActions";

function GeneralDash() {
  const [activeActions, setActiveActions] = useState([]);
  const [activeTab, setActiveTab] = useState("students");

  // Quick Actions and Marks groups
  const actionGroups = [
    {
      title: "Quick Actions",
      actions: [
        { id: 1, label: "Addition", path: "/addition" },
        { id: 2, label: "Deletion", path: "/deletion" },
        { id: 3, label: "Reset Password", path: "/reset-password" },
      ],
    },
    {
      title: "Course Content Actions",
      actions: [
        { id: 4, label: "Add Course", path: "/addCourse" },
        { id: 5, label: "Courses", path: "/coursecontent" },
      ],
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

      <div className="p-8 max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="tabs tabs-boxed bg-gray-100 p-1 rounded-lg mb-8">
          <button
            className={`tab ${
              activeTab === "students" ? "tab-active bg-primary text-white" : ""
            }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`tab ${
              activeTab === "parents" ? "tab-active bg-primary text-white" : ""
            }`}
            onClick={() => setActiveTab("parents")}
          >
            Parents
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "students" ? <SearchStudent /> : <SearchParent />}

        {/* Quick Actions Component */}
        <QuickActions
          actionGroups={actionGroups}
          activeActions={activeActions}
          toggleAction={toggleAction}
        />
      </div>
    </div>
  );
}

export default GeneralDash;

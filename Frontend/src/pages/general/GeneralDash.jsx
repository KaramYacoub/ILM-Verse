import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import SearchStudent from "../../components/general/SearchStudent";
import SearchParent from "../../components/general/SearchParent";
import QuickActions from "../../components/general/QuickActions";

function GeneralDash() {
  const [activeTab, setActiveTab] = useState("students");

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
        <QuickActions />
      </div>
    </div>
  );
}

export default GeneralDash;

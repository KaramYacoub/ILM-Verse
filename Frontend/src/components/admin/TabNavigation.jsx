function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="tabs tabs-boxed bg-gray-100 p-1 rounded-lg mb-8">
      {["students", "parents", "teachers", "admins"].map((tab) => (
        <button
          key={tab}
          className={`tab ${
            activeTab === tab ? "tab-active bg-primary text-white" : ""
          }`}
          onClick={() => setActiveTab(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;

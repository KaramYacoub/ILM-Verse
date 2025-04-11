import GeneralNav from "../../components/general/GeneralNav";
import { useState } from "react";

function Addition() {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">General Administrator</h1>
          <h2 className="text-2xl font-semibold">Add New User</h2>
        </div>

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
          <button
            className={`tab ${
              activeTab === "teachers" ? "tab-active bg-primary text-white" : ""
            }`}
            onClick={() => setActiveTab("teachers")}
          >
            Teachers
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {activeTab === "students" && (
            <>
              <h3 className="text-xl font-bold mb-4">Add New Student</h3>
              <div className="space-y-4">
                {/* Student ID */}
                <div>
                  <label className="block font-medium mb-1">Student ID</label>
                  <div className="bg-gray-100 p-2 rounded">Auto-generated</div>
                </div>

                {/* First Name */}
                <div>
                  <label className="block font-medium mb-1">First Name*</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="block font-medium mb-1">Grade*</label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>
                      Select Grade
                    </option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block font-medium mb-1">
                    Date of Birth*
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="MM/DD/YYYY"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block font-medium mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Enter any additional notes"
                  ></textarea>
                </div>
              </div>
            </>
          )}

          {activeTab === "parents" && (
            <>
              <h3 className="text-xl font-bold mb-4">Add New Parent</h3>
              <div className="space-y-4">
                {/* Parent ID */}
                <div>
                  <label className="block font-medium mb-1">Parent ID</label>
                  <div className="bg-gray-100 p-2 rounded">Auto-generated</div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block font-medium mb-1">Full Name*</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-medium mb-1">Email*</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Enter email"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block font-medium mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    className="input input-bordered w-full"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "teachers" && (
            <>
              <h3 className="text-xl font-bold mb-4">Add New Teacher</h3>
              <div className="space-y-4">
                {/* Teacher ID */}
                <div>
                  <label className="block font-medium mb-1">Teacher ID</label>
                  <div className="bg-gray-100 p-2 rounded">Auto-generated</div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block font-medium mb-1">Full Name*</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block font-medium mb-1">Subject*</label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>
                      Select Subject
                    </option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-medium mb-1">Email*</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button className="btn btn-primary">
              {activeTab === "students" && "Add Student"}
              {activeTab === "parents" && "Add Parent"}
              {activeTab === "teachers" && "Add Teacher"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Copyright © 2025 – All right reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default Addition;

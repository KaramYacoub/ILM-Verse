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
          <button
            className={`tab ${
              activeTab === "admins" ? "tab-active bg-primary text-white" : ""
            }`}
            onClick={() => setActiveTab("admins")}
          >
            Admins
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

                {/* Last Name */}
                <div>
                  <label className="block font-medium mb-1">Last Name*</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter last name"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-medium mb-1">Password*</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="block font-medium mb-1">Grade*</label>
                  <select className="select select-bordered w-full" required>
                    <option disabled selected value="">
                      Select Grade
                    </option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                    <option value="5">Grade 5</option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                  </select>
                </div>

                {/* Section */}
                <div>
                  <label className="block font-medium mb-1">Section*</label>
                  <select className="select select-bordered w-full" required>
                    <option disabled selected value="">
                      Select Section
                    </option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block font-medium mb-1">
                    Date of Birth*
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    required
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

                {/* Last Name */}
                <div>
                  <label className="block font-medium mb-1">Last Name*</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter last name"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-medium mb-1">Password*</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Enter password"
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
                    required
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

                {/* Last Name */}
                <div>
                  <label className="block font-medium mb-1">Last Name*</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter last name"
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

                {/* Password */}
                <div>
                  <label className="block font-medium mb-1">Password*</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block font-medium mb-1">Department*</label>
                  <select className="select select-bordered w-full" required>
                    <option disabled selected value="">
                      Select Department
                    </option>
                    <option value="1">Mathematics</option>
                    <option value="2">Science</option>
                    <option value="3">English</option>
                    <option value="4">History</option>
                  </select>
                </div>

                {/* Section */}
                <div>
                  <label className="block font-medium mb-1">Section*</label>
                  <select className="select select-bordered w-full" required>
                    <option disabled selected value="">
                      Select Section
                    </option>
                    <option value="1">Section A</option>
                    <option value="2">Section B</option>
                    <option value="3">Section C</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === "admins" && (
            <>
              <h3 className="text-xl font-bold mb-4">Add New Admin</h3>
              <div className="space-y-4">
                {/* Admin ID */}
                <div>
                  <label className="block font-medium mb-1">Admin ID</label>
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

                {/* Last Name */}
                <div>
                  <label className="block font-medium mb-1">Last Name*</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter last name"
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

                {/* Password */}
                <div>
                  <label className="block font-medium mb-1">Password*</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {/* Admin Role */}
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button className="btn btn-primary">
              {activeTab === "students" && "Add Student"}
              {activeTab === "parents" && "Add Parent"}
              {activeTab === "teachers" && "Add Teacher"}
              {activeTab === "admins" && "Add Admin"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500"></footer>
      </div>
    </div>
  );
}

export default Addition;

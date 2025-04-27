import GeneralNav from "../../components/general/GeneralNav";
function ResetPassword() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">General Administrator</h1>
        <h2 className="text-2xl font-semibold mb-6">Change User Password</h2>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for users..."
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="btn btn-sm btn-primary">Students</button>
          <button className="btn btn-sm btn-ghost">Teachers</button>
          <button className="btn btn-sm btn-ghost">Parents</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">User Type</label>
            <select className="select select-bordered w-full">
              <option disabled selected>
                Select user type
              </option>

              <option>Student</option>
              <option>Teacher</option>
              <option>Parent</option>
            </select>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">
              Selected User
              <span className="font-normal">Samira Ahmed (MGR2025-004)</span>
            </p>
            <p className="font-medium">
              User Type: <span className="font-normal">Department Manager</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {/* Password Reset Header */}
          <h2 className="text-2xl font-bold mb-6 text-center">
            Password Reset
          </h2>

          {/* Password Form */}
          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block font-medium mb-1">New Password*</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter new password"
              />
              <p className="text-sm text-gray-500 mt-1">
                Password must be at least 8 characters and include letters,
                numbers, and special characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-medium mb-1">
                Confirm Password*
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="btn btn-ghost">Cancel</button>
            <button className="btn btn-primary">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

import GeneralNav from "../../components/general/GeneralNav";

function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Administrator</h1>
          <h2 className="text-2xl font-semibold">Settings</h2>
        </div>

        {/* Settings Content */}
        <div className="space-y-8">
          {/* Change Password Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex justify-end">
                <button className="btn btn-primary">Update Password</button>
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex justify-end">
                <button className="btn btn-primary">Update Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

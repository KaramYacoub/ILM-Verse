import { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import { useAdminStore } from "../../store/AdminStore";

function Settings() {
  // Local state for form fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { changeAdminPassword, isChangingPassword } = useAdminStore();

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate if new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      await changeAdminPassword(oldPassword, newPassword);
      alert("Password changed successfully.");
    } catch (error) {
      console.log("error is:", error);
      alert(
        "Error changing password: " + error?.response?.data?.error ||
          error.message
      );
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Profile update submitted");
  };

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
          {/* Change Password Form */}
          <form
            onSubmit={handlePasswordChange}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  className="input input-bordered w-full"
                  placeholder="Enter current password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="input input-bordered w-full"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  className="input input-bordered w-full"
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  value={confirmNewPassword}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </form>

          {/* Profile Info Form */}
          <form
            onSubmit={handleProfileUpdate}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="input input-bordered w-full"
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="input input-bordered w-full"
                  placeholder="Enter Last Name"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="profilePassword"
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;

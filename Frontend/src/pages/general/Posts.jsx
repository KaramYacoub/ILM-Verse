import GeneralNav from "../../components/general/GeneralNav";
function Posts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-3xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl font-bold mb-6">Posts</h1>

        {/* Posts List - Static Design Only */}
        <div className="space-y-6 mb-8">
          {/* Post 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">First Day of School</h2>
            <p className="text-gray-700 mb-4">
              Welcome back students for the new academic year...
            </p>
            <div className="flex justify-end space-x-2">
              <button className="btn btn-sm btn-outline btn-primary">
                Edit
              </button>
              <button className="btn btn-sm btn-outline btn-error">
                Delete
              </button>
            </div>
          </div>

          {/* Post 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">
              Science Fair Announcement
            </h2>
            <p className="text-gray-700 mb-4">
              Our annual science fair will be held on...
            </p>
            <div className="flex justify-end space-x-2">
              <button className="btn btn-sm btn-outline btn-primary">
                Edit
              </button>
              <button className="btn btn-sm btn-outline btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Add New Post Form - Static Design Only */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter post title"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Body</label>
            <textarea
              className="textarea textarea-bordered w-full h-64"
              placeholder="Body text for whatever you'd like to say..."
            ></textarea>
          </div>

          <div className="divider my-8"></div>

          <div className="flex justify-end">
            <button className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add a New Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;

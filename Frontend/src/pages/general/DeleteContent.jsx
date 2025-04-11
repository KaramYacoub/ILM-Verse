import GeneralNav from "../../components/general/GeneralNav";
function DeleteContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Course name</h1>
          <p className="text-gray-600">Fall Semester 2025 • 32 Students</p>
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        {/* Course Content Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Course Content
          </h2>

          {/* Unit 1 */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-700">
              Unit 1: unit name
            </h3>

            {/* Lecture Item */}
            <div className="flex items-start mb-4 p-3 hover:bg-gray-50 rounded-lg group">
              <input type="checkbox" className="mt-1 mr-3 h-4 w-4" />
              <div className="flex-grow">
                <p className="font-medium">Lecture: lecture name</p>
                <p className="text-sm text-gray-500">
                  MP4 • 38:45 • Uploaded on Apr 5, 2025
                </p>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 text-gray-500 hover:text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </button>
                <button className="p-1 text-gray-500 hover:text-red-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* File Item */}
            <div className="flex items-start mb-4 p-3 hover:bg-gray-50 rounded-lg group">
              <input type="checkbox" className="mt-1 mr-3 h-4 w-4" />
              <div className="flex-grow">
                <p className="font-medium">File: file name</p>
                <p className="text-sm text-gray-500">
                  PDF • 3 pages • Uploaded on Apr 3, 2025
                </p>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 text-gray-500 hover:text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </button>
                <button className="p-1 text-gray-500 hover:text-red-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-6"></div>

          {/* Unit 2 */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-700">
              Unit 2: unit name
            </h3>

            {/* Lecture Item */}
            <div className="flex items-start mb-4 p-3 hover:bg-gray-50 rounded-lg group">
              <input type="checkbox" className="mt-1 mr-3 h-4 w-4" />
              <div className="flex-grow">
                <p className="font-medium">Lecture: lecture name</p>
                <p className="text-sm text-gray-500">
                  MP4 • 38:45 • Uploaded on Apr 5, 2025
                </p>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 text-gray-500 hover:text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </button>
                <button className="p-1 text-gray-500 hover:text-red-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Unit Button */}
        <button className="flex items-center text-primary hover:text-primary-dark mt-4">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add New Unit
        </button>
      </div>
    </div>
  );
}

export default DeleteContent;

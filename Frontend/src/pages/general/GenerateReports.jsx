import GeneralNav from "../../components/general/GeneralNav";
import { useNavigate } from "react-router-dom";

function GenerateReport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Generate Report</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Student Report Form</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Course Name:</h3>
              <select className="border px-4 py-2 rounded w-full">
                <option>Mathematics - Grade 9</option>
                <option>Science - Grade 9</option>
                <option>Language Arts - Grade 9</option>
              </select>
            </div>

            <div>
              <h3 className="font-medium mb-2">Date (YYYY/MM/DD):</h3>
              <input
                type="text"
                value="2025/04/08"
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Description:</h3>
              <textarea
                className="border px-4 py-2 rounded w-full h-32"
                placeholder="Enter report description..."
              ></textarea>
            </div>

            <div>
              <h3 className="font-medium mb-2">Student Name:</h3>
              <input
                type="text"
                value="Zaid Khouri"
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Student Details:</h3>
              <input
                type="text"
                value="Intermediate Male"
                className="border px-4 py-2 rounded w-full"
              />
            </div>
          </div>

          <hr className="my-6" />

          <div className="flex justify-between">
            <button
              className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
              onClick={() => navigate(-1)}
            >
              Clear
            </button>
            <div className="space-x-4">
              <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded hover:bg-blue-200">
                Preview Report
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Generate
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm"></footer>
      </div>
    </div>
  );
}

export default GenerateReport;

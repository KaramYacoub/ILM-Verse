import { useOutletContext } from "react-router-dom";

function ResourcesTab() {
  const { courseData } = useOutletContext();

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Course Resources</h2>

      {courseData.units.map((unit, unitIndex) => (
        <div key={unitIndex} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{unit.name}</h3>

          <div className="space-y-4">
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="card-title text-md">{unit.name} Handbook</h4>
                    <p className="text-sm text-gray-500">
                      Complete reference guide for unit {unitIndex + 1}
                    </p>
                  </div>
                  <button className="btn btn-primary btn-sm">Download</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="card-title text-md">Additional slides</h4>
                    <p className="text-sm text-gray-500">
                      To help you understand better
                    </p>
                  </div>
                  <button className="btn btn-primary btn-sm">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResourcesTab;

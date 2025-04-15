import { useLocation } from "react-router-dom";

function StudentResourcesTab() {
  const location = useLocation();
  const unit = location.state?.unit;

  if (!unit) {
    return (
      <div className="text-center text-2xl mt-16 text-error font-bold">
        No lesson selected
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl text-primary font-bold mb-6">Resources for {unit.name}</h2>

      <div className="space-y-4">
        {unit.resources.map((res, index) => (
          <div key={index} className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="card-title text-md">{res.title}</h4>
                  <p className="text-sm text-gray-500">{res.type} File</p>
                </div>
                <button className="btn btn-primary btn-sm">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentResourcesTab;

import { useOutletContext } from "react-router-dom";

function LessonsTab() {
  const { courseData } = useOutletContext();
  
  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>
      
      {courseData.units.map((unit, unitIndex) => (
        <div key={unitIndex} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{unit.name}</h3>
          
          <div className="space-y-3">
            {Array.from({ length: unit.lessons }).map((_, lessonIndex) => (
              <div key={lessonIndex} className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="card-title text-md">
                        Lesson {unitIndex + 1}.{lessonIndex + 1}: Lesson name
                      </h4>
                      <p className="text-sm text-gray-500">
                        Duration {[45, 30, 50][lessonIndex % 3]} minutes
                      </p>
                    </div>
                    <button className="btn btn-primary btn-sm">Review</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LessonsTab;
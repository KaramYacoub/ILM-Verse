import { useNavigate, useParams } from "react-router-dom";
import { useTeacherStore } from "../../../store/TeacherStore";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

function TeacherOverviewTab() {
  const { course_id } = useParams();
  const navigate = useNavigate();
  const { getCourseUnits, units, addCourseUnit } = useTeacherStore();

  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUnit, setNewUnit] = useState({
    unit_name: "",
    unit_description: "",
  });

  useEffect(() => {
    const fetcheUnits = async () => {
      try {
        setLoading(true);
        await getCourseUnits(course_id);
      } catch (error) {
        console.error("Failed to load unit content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetcheUnits();
  }, [course_id, getCourseUnits]);

  const handleAddUnit = async () => {
    try {
      setIsAdding(true);
      await addCourseUnit(course_id, newUnit);
      // Refresh the units list
      await getCourseUnits(course_id);
      setShowAddModal(false);
      setNewUnit({ unit_name: "", unit_description: "" });
    } catch (error) {
      console.log("Error adding unit:", error);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      {/* Header with Add Unit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-primary font-bold">Course Units</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-outline btn-primary"
        >
          + Add New Unit
        </button>
      </div>

      <div className="space-y-4">
        {units.map((unit) => (
          <div key={unit.unit_id} className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-center sm:flex-row flex-col">
                <div>
                  <h3 className="card-title text-xl">{unit.unit_name}</h3>
                  <p>{unit.unit_description}</p>
                </div>
                <button
                  className="btn btn-primary text-lg btn-md"
                  onClick={() =>
                    navigate(
                      `/teacher-course-content/${course_id}/teacher-unit-content/${unit.unit_id}`,
                      {
                        state: { unit: unit },
                      }
                    )
                  }
                >
                  View Unit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Unit Modal */}
      <div className={`modal ${showAddModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Unit</h3>
          <div className="py-4 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Unit Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter unit name"
                className="input input-bordered w-full"
                value={newUnit.unit_name}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, unit_name: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Unit Description</span>
              </label>
              <textarea
                placeholder="Enter unit description"
                className="textarea textarea-bordered w-full"
                rows={3}
                value={newUnit.unit_description}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, unit_description: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => {
                setShowAddModal(false);
                setNewUnit({ unit_name: "", unit_description: "" });
              }}
              disabled={isAdding}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddUnit}
              disabled={!newUnit.unit_name.trim() || isAdding}
            >
              {isAdding ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Adding...
                </>
              ) : (
                "Add Unit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherOverviewTab;

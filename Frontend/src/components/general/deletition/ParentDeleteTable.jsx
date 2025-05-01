import { useEffect, useState } from "react";
import { useAdminStore } from "../../../store/AdminStore";
import { Loader2 } from "lucide-react";

function ParentDeleteTable({ searchTerm }) {
  const [parents, setParents] = useState([]);
  const [filteredParents, setFilteredParents] = useState([]);
  const { isFetchingParents, getAllParents, deleteParent } = useAdminStore();

  const [deletingIds, setDeletingIds] = useState([]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await getAllParents();
        if (response?.data) {
          setParents(response.data);
          setFilteredParents(response.data);
        }
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };
    fetchParents();
  }, [getAllParents]);

  useEffect(() => {
    if (searchTerm) {
      const results = parents.filter(
        (parent) =>
          `${parent.first_name} ${parent.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          parent.parent_id.toString().includes(searchTerm) ||
          parent.phone?.includes(searchTerm)
      );
      setFilteredParents(results);
    } else {
      setFilteredParents(parents);
    }
  }, [searchTerm, parents]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this parent?")) return;

    try {
      setDeletingIds((prev) => [...prev, id]);
      await deleteParent(id);

      setParents(parents.filter((parent) => parent.parent_id !== id));
      setFilteredParents(
        filteredParents.filter((parent) => parent.parent_id !== id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    } finally {
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id));
    }
  };

  if (isFetchingParents) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  return (
    <table className="table w-full text-center">
      <thead className="bg-primary text-white">
        <tr>
          <th>ID</th>
          <th>Details</th>
          <th>Confirm Deletion</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredParents.length > 0 ? (
          filteredParents.map((parent) => (
            <tr key={parent.parent_id}>
              <td className="font-medium">{parent.parent_id}</td>
              <td className="font-medium">
                {parent.first_name} {parent.last_name}
              </td>
              <td className="text-red-600">
                Are you sure you want to delete?
                <div className="text-sm">This action cannot be undone.</div>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(parent.parent_id)}
                  className="btn btn-error btn-sm text-white"
                >
                  {deletingIds.includes(parent.parent_id) ? (
                    <Loader2 className="animate-spin h-4 w-4 mx-auto" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center p-8 text-gray-500">
              No parents found{searchTerm ? " matching your search" : ""}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ParentDeleteTable;

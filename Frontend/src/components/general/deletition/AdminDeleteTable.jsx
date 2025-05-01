import { useEffect, useState } from "react";
import { useAdminStore } from "../../../store/AdminStore";
import { Loader2 } from "lucide-react";

function AdminDeleteTable({ searchTerm }) {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const { isFetchingAdmins, getAllAdmins, deleteAdmin } = useAdminStore();

  const [deletingIds, setDeletingIds] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getAllAdmins();
        if (response?.data) {
          setAdmins(response.data);
          setFilteredAdmins(response.data);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, [getAllAdmins]);

  useEffect(() => {
    if (searchTerm) {
      const results = admins.filter(
        (admin) =>
          `${admin.first_name} ${admin.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          admin.gm_id.toString().includes(searchTerm) ||
          admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAdmins(results);
    } else {
      setFilteredAdmins(admins);
    }
  }, [searchTerm, admins]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      setDeletingIds((prev) => [...prev, id]);
      await deleteAdmin(id);

      setAdmins(admins.filter((admin) => admin.admin_id !== id));
      setFilteredAdmins(
        filteredAdmins.filter((admin) => admin.admin_id !== id)
      );
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Failed to delete admin");
    } finally {
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id));
    }
  };

  if (isFetchingAdmins) {
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
        {filteredAdmins.length > 0 ? (
          filteredAdmins.map((admin) => (
            <tr key={admin.gm_id}>
              <td className="font-medium">{admin.gm_id}</td>
              <td>
                <div className="font-medium">
                  {admin.first_name} {admin.last_name}
                </div>
                <div className="text-sm text-gray-500">{admin.email}</div>
              </td>
              <td className="text-red-600">
                Are you sure you want to delete?
                <div className="text-sm">This action cannot be undone.</div>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(admin.gm_id)}
                  className="btn btn-error btn-sm text-white"
                  disabled={deletingIds.includes(admin.gm_id)}
                >
                  {deletingIds.includes(admin.gm_id) ? (
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
              No admins found{searchTerm ? " matching your search" : ""}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AdminDeleteTable;

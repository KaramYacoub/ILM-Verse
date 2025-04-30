import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { useAdminStore } from "../../store/AdminStore";

function SearchParent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allParents, setAllParents] = useState([]);
  const [filteredParents, setFilteredParents] = useState([]);

  const { isFetchingParents, getAllParents } = useAdminStore();

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await getAllParents();

        if (response?.data) {
          setAllParents(response.data);
          setFilteredParents(response.data);
        }
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };
    fetchParents();
  }, [getAllParents]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const results = allParents.filter(
      (parent) =>
        `${parent.first_name} ${parent.last_name}`
          .toLowerCase()
          .includes(term.toLowerCase()) ||
        parent.parent_id.toString().includes(term) ||
        parent.phone?.includes(term) ||
        parent.email?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredParents(term.length > 0 ? results : allParents);
  };

  if (isFetchingParents) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by parent name, ID, phone, or email"
          className="input input-bordered w-full pl-10"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Search
          className="absolute left-3 top-[0.9rem] text-gray-500"
          size={20}
        />
      </div>

      {filteredParents.length > 0 ? (
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Parent Search Results</h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="table w-full text-center">
              <thead>
                <tr className="bg-primary text-white">
                  <th>Parent ID</th>
                  <th>Parent Name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.map((parent) => (
                  <tr key={parent.parent_id} className="hover">
                    <td>{parent.parent_id}</td>
                    <td>
                      {parent.first_name} {parent.last_name}
                    </td>
                    <td>{parent.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        searchTerm && (
          <div className="text-center py-8 text-gray-500">
            No parents found matching your search
          </div>
        )
      )}
    </div>
  );
}

export default SearchParent;

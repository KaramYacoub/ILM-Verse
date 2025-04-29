function ParentDeleteTable({ data, onDelete }) {
  return (
    <table className="table w-full">
      <thead className="bg-gray-100">
        <tr>
          <th>ID</th>
          <th>Details</th>
          <th>Confirm Deletion</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((parent) => (
          <tr key={parent.id}>
            <td className="font-medium">{parent.id}</td>
            <td className="font-medium">{parent.name}</td>
            <td className="text-red-600">
              Are you sure you want to delete?
              <div className="text-sm">This action cannot be undone.</div>
            </td>
            <td>
              <button
                onClick={() => onDelete(parent.id)}
                className="btn btn-error btn-sm text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ParentDeleteTable;

function StudentDeleteTable({ data, onDelete }) {
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
        {data.map((student) => (
          <tr key={student.id}>
            <td className="font-medium">{student.id}</td>
            <td>
              <div className="font-medium">{student.name}</div>
              <div className="text-sm text-gray-500">{student.grade}</div>
            </td>
            <td className="text-red-600">
              Are you sure you want to delete?
              <div className="text-sm">This action cannot be undone.</div>
            </td>
            <td>
              <button
                onClick={() => onDelete(student.id)}
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

export default StudentDeleteTable;
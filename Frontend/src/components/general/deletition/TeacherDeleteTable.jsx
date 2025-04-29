function TeacherDeleteTable({ data, onDelete }) {
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
        {data.map((teacher) => (
          <tr key={teacher.id}>
            <td className="font-medium">{teacher.id}</td>
            <td>
              <div className="font-medium">{teacher.name}</div>
              <div className="text-sm text-gray-500">{teacher.subject}</div>
            </td>
            <td className="text-red-600">
              Are you sure you want to delete?
              <div className="text-sm">This action cannot be undone.</div>
            </td>
            <td>
              <button
                onClick={() => onDelete(teacher.id)}
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

export default TeacherDeleteTable;

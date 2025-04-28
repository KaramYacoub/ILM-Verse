export default function TeacherForm({ formData, handleChange }) {
  return (
    <>
      <h3 className="text-xl font-bold mb-4">Add New Teacher</h3>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Teacher ID</label>
          <div className="bg-gray-100 p-2 rounded">Auto-generated</div>
        </div>
        <div>
          <label className="block font-medium mb-1">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter first name"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter last name"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter password"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Department*</label>
          <select
            name="dept_id"
            value={formData.dept_id || ""}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option disabled value="">
              Select Department
            </option>
            <option value="Department-001">KG</option>
            <option value="Department-002">Primary</option>
            <option value="Department-003">Intermediate Males</option>
            <option value="Department-004">Intermediate Females</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Section*</label>
          <select
            name="section_id"
            value={formData.section_id || ""}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option disabled value="">
              Select Section
            </option>
            <option value="Section-001">A</option>
            <option value="Section-002">B</option>
          </select>
        </div>
      </div>
    </>
  );
}

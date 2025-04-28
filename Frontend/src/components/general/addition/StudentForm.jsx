export default function StudentForm({ formData, handleChange }) {
  return (
    <>
      <h3 className="text-xl font-bold mb-4">Add New Student</h3>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Student ID</label>
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
          <label className="block font-medium mb-1">Parent*</label>
          <select
            name="parent_id"
            value={formData.parent_id || ""}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option disabled value="">
              Select Parent
            </option>
            <option value="Parent-001">Parent 1</option>
            <option value="Parent-002">Parent 2</option>
            <option value="Parent-003">Parent 3</option>
            <option value="Parent-004">Parent 4</option>
            <option value="Parent-005">Parent 5</option>
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

import { useState } from "react";
import { useAdminStore } from "../../store/AdminStore";
import SuccessModal from "../shared/SuccessModal";
import ErrorModal from "../shared/ErrorModal";

function AdminReportModal({ isOpen, onClose, student }) {
	const addReport = useAdminStore((state) => state.addReport);

	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

	const handleAddReport = async (student_id, title, date, description) => {
		try {
			if (!student_id || !title || !date || !description) {
				setErrorMessage("All fields are required.");
				setShowErrorModal(true);
				return;
			}
			await addReport(student_id, title, description, date);
			setTitle("");
			setDescription("");
			setDate(new Date().toISOString().split("T")[0]);
			setSuccessMessage("Report added successfully!");
			setShowSuccessModal(true);
			setTimeout(() => {
				setShowSuccessModal(false);
				onClose();
			}, 1000);
		} catch (error) {
			setErrorMessage(
				error.response?.data?.error || error.message || "Error adding report."
			);
			setShowErrorModal(true);
			setTimeout(() => {
				setShowErrorModal(false);
			}, 2000);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='bg-white p-6 rounded-lg w-[90%] max-w-4xl shadow-xl space-y-4'>
				<h2 className='text-2xl text-primary font-bold mb-5'>
					Student Report Form
				</h2>

				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='font-medium'>title:</label>
						<input
							className='input input-bordered w-full'
							value={title}
							required
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<label className='font-medium'>Student Name:</label>
						<div className='bg-gray-200 p-3 rounded-md text-center'>
							{student.student_name}
						</div>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='font-medium'>Date (MM/DD/YYYY):</label>
						<input
							type='date'
							className='input input-bordered w-full text-center'
							value={date}
							required
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<div>
						<label className='font-medium'>Department name: </label>
						<div className='bg-primary p-3 text-center text-base-100 rounded-md'>
							{student.dept_name}
						</div>
					</div>
				</div>

				<div>
					<label className='font-medium'>Description:</label>
					<textarea
						className='textarea textarea-bordered w-full h-32'
						value={description}
						required
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className='flex justify-between gap-10'>
					<button
						className='btn flex-1 bg-gray-300 hover:bg-gray-400'
						onClick={() => {
							setDescription("");
							setDate(new Date().toISOString().split("T")[0]);
						}}>
						Clear
					</button>
					<button
						onClick={() => {
							handleAddReport(student.student_id, title, date, description);
						}}
						className='btn flex-1 bg-primary text-white'>
						Generate
					</button>
				</div>

				<div className='text-right'>
					<button className='text-md text-red-500 mt-2' onClick={onClose}>
						Close
					</button>
				</div>
			</div>
			<SuccessModal
				showSuccessModal={showSuccessModal}
				setShowSuccessModal={setShowSuccessModal}
				successMessage={successMessage}
			/>
			<ErrorModal
				showErrorModal={showErrorModal}
				setShowErrorModal={setShowErrorModal}
				errorMessage={errorMessage}
			/>
		</div>
	);
}
export default AdminReportModal;

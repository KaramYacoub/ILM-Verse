import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ParentNavBar from "../../components/parent/ParentNavBar";

function ParentShowAbsences() {
	const [children] = useState([
		{
			id: 1,
			name: "Anas Ghnaim",
			grade: 9,
			class: "9-A",
			absences: {
				total: 7,
				excused: 5,
				unexcused: 2,
				records: [
					{
						id: 1,
						date: "02/03/2025",
						day: "Monday",
						subject: "Mathematics",
						status: "Excused",
						notes: "Medical appointment",
					},
					{
						id: 2,
						date: "22/02/2025",
						day: "Thursday",
						subject: "Physics",
						status: "Unexcused",
						notes: "No notification received",
					},
					{
						id: 3,
						date: "15/02/2025",
						day: "Thursday",
						subject: "English",
						status: "Excused",
						notes: "Family emergency",
					},
					{
						id: 4,
						date: "01/02/2025",
						day: "Wednesday",
						subject: "Chemistry",
						status: "Excused",
						notes: "Illness with note",
					},
					{
						id: 5,
						date: "16/01/2025",
						day: "Monday",
						subject: "All Subjects",
						status: "Excused",
						notes: "Illness with note",
					},
					{
						id: 6,
						date: "02/01/2025",
						day: "Friday",
						subject: "Physical Education",
						status: "Unexcused",
						notes: "No notification received",
					},
					{
						id: 7,
						date: "12/12/2024",
						day: "Tuesday",
						subject: "History",
						status: "Excused",
						notes: "Family event",
					},
				],
			},
		},
		{
			id: 2,
			name: "Hamzah Ghnaim",
			grade: 7,
			class: "7-B",
			absences: {
				total: 4,
				excused: 3,
				unexcused: 1,
				records: [
					{
						id: 1,
						date: "10/03/2025",
						day: "Friday",
						subject: "General Science",
						status: "Excused",
						notes: "Doctor appointment",
					},
					{
						id: 2,
						date: "05/02/2025",
						day: "Monday",
						subject: "English Language",
						status: "Excused",
						notes: "Illness with note",
					},
					{
						id: 3,
						date: "15/01/2025",
						day: "Wednesday",
						subject: "Social Studies",
						status: "Unexcused",
						notes: "No notification received",
					},
					{
						id: 4,
						date: "05/12/2024",
						day: "Tuesday",
						subject: "Basic Mathematics",
						status: "Excused",
						notes: "Family event",
					},
				],
			},
		},
		{
			id: 3,
			name: "Mohammad Ghnaim",
			grade: 11,
			class: "11-C",
			absences: {
				total: 2,
				excused: 2,
				unexcused: 0,
				records: [
					{
						id: 1,
						date: "20/02/2025",
						day: "Wednesday",
						subject: "Advanced Chemistry",
						status: "Excused",
						notes: "Medical procedure",
					},
					{
						id: 2,
						date: "05/01/2025",
						day: "Friday",
						subject: "Calculus BC",
						status: "Excused",
						notes: "School competition",
					},
				],
			},
		},
	]);

	const [selectedChildId, setSelectedChildId] = useState(children[0].id);
	const selectedChild = children.find((child) => child.id === selectedChildId);

	// State for filters
	const [selectedTimePeriod, setSelectedTimePeriod] = useState("This Semester");
	const [selectedType, setSelectedType] = useState("All Types");
	const [filteredRecords, setFilteredRecords] = useState([]);

	// Apply filters when component mounts and when filters change
	useEffect(() => {
		applyFilters();
	}, [selectedChildId, selectedTimePeriod, selectedType]);

	// Filter absences based on selected time period and type
	const applyFilters = () => {
		const allRecords = selectedChild.absences.records;
		
		// Filter by time period
		let timePeriodFiltered = [...allRecords];
		if (selectedTimePeriod === "This Semester") {
			// For this example, we'll consider dates from 01/01/2025 as "This Semester"
			timePeriodFiltered = allRecords.filter(record => {
				const recordDate = new Date(record.date.split('/').reverse().join('-'));
				return recordDate >= new Date('2025-01-01');
			});
		} else if (selectedTimePeriod === "Last Semester") {
			// For this example, we'll consider dates from 07/01/2024 to 12/31/2024 as "Last Semester"
			timePeriodFiltered = allRecords.filter(record => {
				const recordDate = new Date(record.date.split('/').reverse().join('-'));
				return recordDate >= new Date('2024-07-01') && recordDate <= new Date('2024-12-31');
			});
		} else if (selectedTimePeriod === "This Year") {
			// For this example, we'll consider dates from 01/01/2025 as "This Year"
			timePeriodFiltered = allRecords.filter(record => {
				const recordDate = new Date(record.date.split('/').reverse().join('-'));
				return recordDate >= new Date('2025-01-01');
			});
		}
		// If "All Time" is selected, we don't need to filter by date
		
		// Filter by absence type
		let typeFiltered = [...timePeriodFiltered];
		if (selectedType === "Excused") {
			typeFiltered = timePeriodFiltered.filter(record => record.status === "Excused");
		} else if (selectedType === "Unexcused") {
			typeFiltered = timePeriodFiltered.filter(record => record.status === "Unexcused");
		}
		
		setFilteredRecords(typeFiltered);
		
		console.log("Filters applied:", {
			selectedChild: selectedChild.name,
			selectedTimePeriod,
			selectedType,
			resultCount: typeFiltered.length
		});
	};

	// Handle apply filters button click
	const handleApplyFilters = () => {
		applyFilters();
	};

	// Handle download report
	const handleDownloadReport = () => {
		console.log("Downloading report for:", selectedChild.name);
	};

	// Handle contact teacher
	const handleContactTeacher = () => {
		console.log("Contacting teacher about:", selectedChild.name);
	};

	// Calculate summary statistics based on filtered records
	const filteredTotal = filteredRecords.length;
	const filteredExcused = filteredRecords.filter(record => record.status === "Excused").length;
	const filteredUnexcused = filteredRecords.filter(record => record.status === "Unexcused").length;

	return (
		<div className='min-h-screen bg-base-200 flex flex-col items-center pb-5'>
			<ParentNavBar />
			<div className='w-full flex justify-between items-center mt-10 px-5'>
				<div className='flex items-center gap-6 ml-5'>
					<h1 className='text-4xl font-bold text-primary'>Student Absences</h1>
					<select
						value={selectedChildId}
						onChange={(e) => setSelectedChildId(Number(e.target.value))}
						className="select select-bordered w-64 max-w-xs text-lg font-medium
                      border-2 border-primary/20 rounded-xl shadow-sm
                      focus:outline-none focus:border-primary
                      bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')]
                      bg-no-repeat bg-[right_1rem_center] cursor-pointer">
						{children.map((child) => (
							<option key={child.id} value={child.id}>
								{child.name}
							</option>
						))}
					</select>
				</div>
				
			</div>

			{/* Filters section */}
			<div className='p-6 space-y-6 w-full max-w-4xl bg-base-100 rounded-lg shadow-md mt-5'>
				<h2 className='text-lg font-semibold bg-primary text-base-100 px-4 py-2 rounded-md w-fit'>
					Absence Records - {selectedChild.name} (Grade {selectedChild.grade})
				</h2>

				<div className='flex gap-4'>
					<div className='form-control w-full'>
						<label className='label'>
							<span className='label-text font-medium'>Time Period</span>
						</label>
						<select
							className='select select-bordered w-full'
							value={selectedTimePeriod}
							onChange={(e) => setSelectedTimePeriod(e.target.value)}>
							<option>This Semester</option>
							<option>Last Semester</option>
							<option>This Year</option>
							<option>All Time</option>
						</select>
					</div>

					<div className='form-control w-full'>
						<label className='label'>
							<span className='label-text font-medium'>Type</span>
						</label>
						<select
							className='select select-bordered w-full'
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}>
							<option>All Types</option>
							<option>Excused</option>
							<option>Unexcused</option>
						</select>
					</div>

					
				</div>

				{/* Summary cards */}
				<div className='grid grid-cols-3 gap-6 mt-4'>
					<div className='bg-base-200 p-4 rounded-lg text-center'>
						<p className='font-semibold text-gray-600'>Total Absences</p>
						<p className='text-2xl font-bold text-primary'>
							{filteredTotal}
						</p>
						<p className='text-sm text-gray-500'>{selectedTimePeriod}</p>
					</div>

					<div className='bg-base-200 p-4 rounded-lg text-center'>
						<p className='font-semibold text-gray-600'>Excused</p>
						<p className='text-2xl font-bold text-primary'>
							{filteredExcused}
						</p>
						<p className='text-sm text-gray-500'>With Documentation</p>
					</div>

					<div className='bg-base-200 p-4 rounded-lg text-center'>
						<p className='font-semibold text-gray-600'>Unexcused</p>
						<p className='text-2xl font-bold text-primary'>
							{filteredUnexcused}
						</p>
						<p className='text-sm text-gray-500'>Need Documentation</p>
					</div>
				</div>

				{/* Absences table */}
				<div className='overflow-x-auto rounded-md shadow-md bg-base-300 mt-6'>
					<table className='table w-full text-center'>
						<thead className='bg-primary text-base-100 text-base'>
							<tr>
								<th>Date</th>
								<th>Day</th>
								<th>Subject</th>
								<th>Status</th>
								<th>Notes</th>
							</tr>
						</thead>
						<tbody>
							{filteredRecords.map((absence) => (
								<tr key={absence.id} className='hover'>
									<td>{absence.date}</td>
									<td>{absence.day}</td>
									<td>{absence.subject}</td>
									<td>
										<div
											className={`badge ${
												absence.status === "Excused"
													? "badge-success text-white"
													: "badge-error text-white"
											} px-4 py-3`}>
											{absence.status}
										</div>
									</td>
									<td>{absence.notes}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Action buttons */}
				
			</div>
		</div>
	);
}

export default ParentShowAbsences;
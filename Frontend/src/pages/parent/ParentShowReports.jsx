import ParentNavBar from "../../components/parent/ParentNavBar";
import { useState } from "react";
import { X } from "lucide-react";

function ParentShowReports() {
  const [children] = useState([
    {
      id: 1,
      name: "Anas Ghnaim",
      reports: [
        {
          title: "Mathematics Progress Report",
          date: "Mar 15, 2025",
          address: "STEM Department",
          comment: "Excellent algebraic problem-solving skills",
        },
        {
          title: "Science Lab Performance",
          date: "Apr 2, 2025",
          address: "Science Lab",
          comment: "Shows great potential in experimental design",
        },
        {
          title: "Language Arts Evaluation",
          date: "Mar 20, 2025",
          address: "Language Dept",
          comment: "Strong creative writing skills",
        },
      ],
    },
    {
      id: 2,
      name: "Hamzah Ghnaim",
      reports: [
        {
          title: "Physical Education Review",
          date: "Apr 5, 2025",
          address: "Gymnasium",
          comment: "Excellent team leadership qualities",
        },
        {
          title: "Music Program Assessment",
          date: "Mar 25, 2025",
          address: "Music Hall",
          comment: "Demonstrates exceptional rhythm skills",
        },
        {
          title: "Art Class Evaluation",
          date: "Apr 10, 2025",
          address: "Art Studio",
          comment: "Creative approach to mixed media",
        },
      ],
    },
    {
      id: 3,
      name: "Mohammad Ghnaim",
      reports: [
        {
          title: "Advanced Chemistry Report",
          date: "Mar 25, 2025",
          address: "Chemistry Lab",
          comment: "Outstanding lab safety awareness",
        },
        {
          title: "Computer Science Review",
          date: "Apr 10, 2025",
          address: "CS Department",
          comment: "Exceptional coding skills",
        },
        {
          title: "Robotics Program Update",
          date: "Apr 15, 2025",
          address: "Engineering Lab",
          comment: "Innovative problem-solving approaches",
        },
      ],
    },
  ]);

  const [selectedChildId, setSelectedChildId] = useState(children[0].id);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedChild = children.find((child) => child.id === selectedChildId);

  const openReportModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <ParentNavBar />

      <div className="w-full max-w-4xl px-5 mt-10">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-primary">
            Student Progress Reports
          </h1>
        </div>

        {/* Reports Section */}
        <div className="bg-base-100 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            About {selectedChild.name}
          </h2>

          <div className="overflow-x-auto rounded-xl">
            <table className="table table-zebra w-full">
              <thead className="bg-primary text-base-100">
                <tr>
                  <th className="text-left">Report</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedChild.reports.map((report, index) => (
                  <tr key={index} className="hover">
                    <td className="text-left font-semibold">{report.title}</td>
                    <td>{report.date}</td>
                    <td>
                      <button
                        onClick={() => openReportModal(report)}
                        className="btn btn-primary btn-sm"
                      >
                        Show
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Report Details Modal */}
      <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl">
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <X />
          </button>
          <h3 className="font-bold text-2xl text-primary mb-2">
            {selectedReport?.title}
          </h3>
          <div className="divider my-1"></div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <h4 className="font-semibold">Date:</h4>
              <p>{selectedReport?.date}</p>
            </div>
            <div>
              <h4 className="font-semibold">Teacher's Comments:</h4>
              <p className="text-gray-700 bg-base-200 p-3 rounded-lg">
                {selectedReport?.comment}
              </p>
            </div>
          </div>
          <div className="modal-action">
            <button onClick={closeModal} className="btn btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentShowReports;

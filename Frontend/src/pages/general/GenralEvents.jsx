import React, { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import EventList from "../../components/shared/EventList";
import { Plus } from "lucide-react";
import EventModal from "../../components/general/EventModal";
import { useAdminStore } from "../../store/AdminStore";

function GenralEvents() {
  const [currentYear, setCurrentYear] = useState("2025");
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");
  const [events, setEvents] = useState({
    2025: [
      {
        id: 1,
        title: "Science Fair 2025",
        date: "April 15, 2025",
        location: "School Auditorium",
        description: [
          "Join us for our Annual Science Fair where students showcase their innovative research projects and scientific discoveries.",
          "This year's theme is 'Science for Sustainable Future' highlighting environmental solutions.",
          "Students from grades 7-12 will present their projects to judges from local universities and technology companies.",
          "Prizes will be awarded for the most innovative and impactful projects in various categories.",
        ],
        media: [],
      },
    ],
    2024: [],
    2023: [],
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    media: [],
  });

  const { addEvent } = useAdminStore();

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const { title, date, location, description, media } = newEvent;

    // Reset previous error
    setFormError("");

    // Validate fields
    if (!title.trim() || !date.trim() || !location.trim()) {
      setFormError(
        "Please fill in all required fields: Title, Date, Time, and Location."
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("date", date);

    media.forEach((file) => {
      formData.append("media", file);
    });

    try {
      await addEvent(formData);
      setNewEvent({
        title: "",
        date: "",
        location: "",
        description: "",
        media: [],
      });
      setShowModal(false);
    } catch {
      setFormError("Failed to add event. Please try again.");
    }
  };

  const handleDeleteEvent = (year, id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents({
        ...events,
        [year]: events[year].filter((event) => event.id !== id),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GeneralNav />

      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-8">Events Management</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Event
          </button>
        </div>

        {showModal && (
          <EventModal
            setShowModal={setShowModal}
            handleAddEvent={handleAddEvent}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            formError={formError}
          />
        )}

        {/* Year Filter & Events List */}
        <div className="p-6 rounded-lg shadow-md mb-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Select Year</h2>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {Object.keys(events).map((year) => (
              <button
                key={year}
                onClick={() => setCurrentYear(year)}
                className={`btn btn-sm ${
                  currentYear === year ? "btn-primary" : "btn-ghost"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          <EventList
            events={events}
            currentYear={currentYear}
            isManager={true}
            handleDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
    </div>
  );
}

export default GenralEvents;

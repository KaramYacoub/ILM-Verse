import React, { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import EventList from "../../components/shared/EventList";
import { Plus } from "lucide-react";
import EventModal from "../../components/general/EventModal";

function GenralEvents() {
  const [currentYear, setCurrentYear] = useState("2025");
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState({
    2025: [],
    2024: [],
    2023: [],
  });

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    media: [],
  });

  const handleAddEvent = () => {
    const { title, date, time, location, description, media } = newEvent;
    if (!title.trim() || !date.trim() || !time.trim() || !location.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newId =
      events[currentYear].length > 0
        ? events[currentYear][events[currentYear].length - 1].id + 1
        : 1;

    const mediaUrls = Array.from(media).map((file) =>
      URL.createObjectURL(file)
    );

    const eventToAdd = {
      id: newId,
      title,
      date,
      time,
      location,
      description: description.split("\n"),
      media: mediaUrls,
    };

    setEvents({
      ...events,
      [currentYear]: [...events[currentYear], eventToAdd],
    });

    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      media: [],
    });

    setShowModal(false);
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

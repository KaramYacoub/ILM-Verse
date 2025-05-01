import React, { useState, useEffect, useCallback } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import EventList from "../../components/shared/EventList";
import { Loader2, Plus } from "lucide-react";
import EventModal from "../../components/general/EventModal";
import { useAdminStore } from "../../store/AdminStore";
import { useSharedStore } from "../../store/SharedStore";

function GenralEvents() {
  const [currentYear, setCurrentYear] = useState("2025");
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");
  const [events, setEvents] = useState({});

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    media: [],
  });

  const getAllEvents = useSharedStore((state) => state.getAllEvents);
  const isFetchingEvents = useSharedStore((state) => state.isFetchingEvents);
  const addEvent = useAdminStore((state) => state.addEvent);
  const deleteEvent = useAdminStore((state) => state.deleteEvent);

  // Fetch events from the store and group by year
  const fetchEvents = useCallback(async () => {
    try {
      const data = await getAllEvents();
      if (data) {
        const grouped = data.data.reduce((acc, event) => {
          const year = new Date(event.eventdate).getFullYear().toString();
          if (!acc[year]) acc[year] = [];
          acc[year].push(event);
          return acc;
        }, {});
        setEvents(grouped);

        if (!grouped[currentYear]) {
          const latestYear = Object.keys(grouped).sort().reverse()[0];
          setCurrentYear(latestYear);
        }
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  }, [getAllEvents, currentYear]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // add event
  const handleAddEvent = async (e) => {
    e.preventDefault();

    const { title, date, location, description, media } = newEvent;

    setFormError("");

    if (!title.trim() || !date.trim() || !location.trim()) {
      setFormError(
        "Please fill in all required fields: Title, Date, and Location."
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
      await fetchEvents(); // Refresh event list after adding
    } catch {
      setFormError("Failed to add event. Please try again.");
    }
  };

  const handleDeleteEvent = async (year, id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setEvents({
          ...events,
          [year]: events[year].filter((event) => event.id !== id),
        });
      } catch (error) {
        console.error("Failed to delete event:", error);
        alert("Failed to delete event. Please try again.");
      }
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

        {isFetchingEvents && (
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin" size={50} />
          </div>
        )}

        {/* Year Filter & Events List */}
        <div className="p-6 rounded-lg shadow-md mb-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Select Year</h2>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {Object.keys(events)
              .sort((a, b) => b - a)
              .map((year) => (
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

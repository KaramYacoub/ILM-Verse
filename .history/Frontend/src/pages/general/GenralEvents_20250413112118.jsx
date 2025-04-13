import React, { useState } from "react";
import GeneralNav from "../../components/general/GeneralNav";
import Carousel from "../../components/shared/Carousel";

function GenralEvents() {
  const [currentYear, setCurrentYear] = useState("2025");
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
    media: "/cultural-day-1.jpg",
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

    const eventToAdd = {
      id: newId,
      title,
      date,
      time,
      location,
      description: description.split("\n"), // split paragraphs
      media: media.split(",").map((item) => item.trim()), // split images by comma
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
      media: "",
    });
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
        <h1 className="text-3xl font-bold mb-8">Events Management</h1>

        {/* Year Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* Events List */}
        <div className="space-y-8 mb-8">
          {events[currentYear].length > 0 ? (
            events[currentYear].map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{event.title}</h2>
                      <p className="text-gray-600">
                        {event.date} • {event.time}
                      </p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteEvent(currentYear, event.id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {event.description.map((para, index) => (
                      <p key={index}>{para}</p>
                    ))}
                  </div>
                </div>

                {event.media.length > 0 && (
                  <div className="border-t border-gray-200">
                    <Carousel
                      customSlides={event.media.map((img, idx) => (
                        <div key={idx} className="flex-[0_0_100%] h-64 md:h-80">
                          <img
                            src={img}
                            alt={`${event.title} ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-lg">No events found for {currentYear}</p>
            </div>
          )}
        </div>

        {/* Add New Event Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add New Event</h2>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter event title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
          </div>

          <div className="mb-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium mb-1">Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">Time</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. 9:00 AM - 5:00 PM"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Location</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter location"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-40"
              placeholder="Enter event description (use new lines for paragraphs)"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-1">
              Media (comma-separated image URLs)
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. /img1.jpg, /img2.jpg"
              value={newEvent.media}
              onChange={(e) =>
                setNewEvent({ ...newEvent, media: e.target.value })
              }
            />
          </div>

          <div className="divider my-8"></div>

          <div className="flex justify-end">
            <button onClick={handleAddEvent} className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add a New Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenralEvents;

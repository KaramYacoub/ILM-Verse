import GeneralNav from "../../components/general/GeneralNav";
function GenralEvents() {
  const [currentYear, setCurrentYear] = useState("2025");
  const [events, setEvents] = useState({
    2025: [
      {
        id: 1,
        title: "Science Fair 2025",
        date: "April 15, 2025",
        time: "9:00 AM - 5:00 PM",
        location: "School Auditorium",
        description: [
          "Join us for our Annual Science Fair...",
          "This year's theme is 'Science for Sustainable Future'...",
        ],
      },
      {
        id: 2,
        title: "Cultural Heritage Day",
        date: "March 20, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "School Campus",
        description: [
          "Celebrating Jordan's rich cultural heritage...",
          "Students will showcase traditional dances...",
        ],
      },
    ],
    2024: [],
    2023: [],
  });

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
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Events Management</h1>
          <Link to="/add-event" className="btn btn-primary">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add New Event
          </Link>
        </div>

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
        <div className="space-y-6">
          {events[currentYear].length > 0 ? (
            events[currentYear].map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{event.title}</h2>
                    <p className="text-gray-600">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-event/${event.id}`}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteEvent(currentYear, event.id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {event.description.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-lg">No events found for {currentYear}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenralEvents;

import Carousel from "./Carousel";

export default function EventList({ events, currentYear, isManager, handleDeleteEvent }) {
  return (
    <div className="space-y-8 mb-8">
      {events[currentYear]?.length > 0 ? (
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
                {isManager && <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeleteEvent(currentYear, event.id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </div>}
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
                  customSlides={event.media.map((img, i) => (
                    <div key={i} className="flex-[0_0_100%] h-64 md:h-80">
                      <img
                        src={img}
                        alt={`${event.title} ${i + 1}`}
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
        <p className="text-gray-500 text-center">No events for {currentYear}.</p>
      )}
    </div>
  );
}

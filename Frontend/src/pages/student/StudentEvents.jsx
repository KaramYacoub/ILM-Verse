import React, { useState } from "react";
import HomeNav from "../../components/student/StudentNavbar";
import Carousel from "../../components/shared/Carousel";
import Breadcrumbs from "../../components/shared/Breadcrumbs";

function StudentEvents() {
  const [currentYear, setCurrentYear] = useState("2025");

  const events = {
    2025: [
      {
        id: 1,
        title: "Science Fair 2025",
        date: "April 15, 2025",
        time: "9:00 AM - 5:00 PM",
        location: "School Auditorium",
        description: [
          "Join us for our Annual Science Fair where students showcase their innovative research projects and scientific discoveries.",
          "This year's theme is 'Science for Sustainable Future' highlighting environmental solutions.",
          "Students from grades 7-12 will present their projects to judges from local universities and technology companies.",
          "Prizes will be awarded for the most innovative and impactful projects in various categories.",
        ],
        media: [],
      },
      {
        id: 2,
        title: "Cultural Heritage Day",
        date: "March 20, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "School Campus",
        description: [
          "Celebrating Jordan's rich cultural heritage! This full day event features traditional performances, art exhibits, and culinary experiences.",
          "Students will showcase traditional dances, music, costumes, and crafts that highlight our nation's diverse cultural traditions.",
          "Special exhibitions will present regional customs, historical artifacts, and interactive cultural activities.",
          "Food stalls will offer traditional delicacies, giving everyone a taste of authentic Jordanian cuisine.",
        ],
        media: [],
      },
    ],
    2024: [], // Add 2024 events if available
    2023: [], // Add 2023 events if available
  };
  const breadcrumbPages = [
    { name: "My Courses", path: "/studentDashboard" },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header/Navigation */}
      <HomeNav />
      <Breadcrumbs
        prevPages={breadcrumbPages}
        currentPage='Events'
      />

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-8">School Events</h1>

        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {Object.keys(events).map((year) => (
            <button
              key={year}
              onClick={() => setCurrentYear(year)}
              className={`px-4 py-2 rounded transition-colors ${
                currentYear === year
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {year}
            </button>
          ))}
          {/*<button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
            View all events
            </button>*/}
        </div>

        {/* Events List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {events[currentYear].length > 0 ? (
            events[currentYear].map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Event Description */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold">{event.title}</h2>
                    <span className="text-gray-500">{event.date}</span>
                  </div>
                  <div className="mb-4">
                    <p>
                      <span className="font-semibold">Time:</span> {event.time}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {event.location}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {event.description.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Event Media Carousel */}
                <div className="relative">
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
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg">No events found for {currentYear}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentEvents;

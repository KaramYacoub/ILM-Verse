import React, { useState } from "react";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import EventList from "../../components/shared/EventList";

function TeacherEvents() {
  const [currentYear, setCurrentYear] = useState("2025");

  const events = {
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
      {
        id: 2,
        title: "Cultural Heritage Day",
        date: "March 20, 2025",
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

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header/Navigation */}
      <TeacherNavbar />

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
        </div>

        {/* Events List */}
        <EventList events={events} currentYear={currentYear} />
      </div>
    </div>
  );
}

export default TeacherEvents;

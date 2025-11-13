import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend when the component loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        const data = await response.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Unexpected response:", data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Filter only upcoming (future) events
  const today = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= today);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Upcoming Events
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : upcoming.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcoming.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No upcoming events found.</p>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;

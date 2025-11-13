import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());

      const response = await fetch(
        `http://localhost:5000/events?${params.toString()}`
      );
      const data = await response.json();

      if (Array.isArray(data)) setEvents(data);
      else console.error("Unexpected response:", data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search]);

  const today = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= today);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Upcoming Events
        </h2>

        {/* ✅ Search */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search events by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full max-w-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

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

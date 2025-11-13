import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const JoinedEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ===== Fetch Joined Events =====
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchJoined = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/events/joined/${user.email}`
        );
        const data = await res.json();
        if (data.success) {
          setEvents(data.events);
        } else {
          toast.error("Failed to load joined events.");
        }
      } catch {
        toast.error("Error fetching joined events.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoined();
  }, [user, navigate]);

  // ===== Leave Event =====
  const handleLeave = async (eventId) => {
    if (!confirm("Are you sure you want to leave this event?")) return;

    try {
      const res = await fetch("http://localhost:5000/events/leave", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, userEmail: user.email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("You left the event.");
        setEvents((prev) => prev.filter((e) => e._id !== eventId));
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Error leaving event.");
    }
  };

  if (loading)
    return <p className="text-center py-10">Loading your joined events...</p>;

  if (!events.length)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          You haven’t joined any events yet.
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Events
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        🌿 My Joined Events ({events.length})
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
              <p className="text-gray-600 mb-1">📍 {event.location}</p>
              <p className="text-gray-600 mb-1">
                🗓️ {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-3">🏷️ {event.eventType}</p>

              <button
                onClick={() => handleLeave(event._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Leave Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedEvents;

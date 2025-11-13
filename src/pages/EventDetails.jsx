import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to load event details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please login first to join events.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/events/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event._id, userEmail: user.email }),
      });
      const data = await res.json();
      if (data.success) toast.success(data.message);
      else toast.error(data.message);
    } catch (err) {
      toast.error("Failed to join event.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading event...</p>;
  if (!event) return <p className="text-center py-10">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <img
        src={event.thumbnail}
        alt={event.title}
        className="w-full h-80 object-cover rounded-2xl mb-6"
      />
      <h2 className="text-3xl font-bold mb-3">{event.title}</h2>
      <p className="text-gray-600 mb-2">📍 {event.location}</p>
      <p className="text-gray-600 mb-2">🏷️ Type: {event.eventType}</p>
      <p className="text-gray-600 mb-2">
        🗓️ {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mt-4">{event.description}</p>

      <button
        onClick={handleJoin}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Join Event
      </button>
    </div>
  );
};

export default EventDetails;

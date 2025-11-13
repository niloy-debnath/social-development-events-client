import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  // ===== Fetch Event =====
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch {
        toast.error("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // ===== Check Join Status =====
  useEffect(() => {
    const checkJoin = async () => {
      if (!user) return;
      const res = await fetch(
        `http://localhost:5000/events/join/check?eventId=${id}&userEmail=${user.email}`
      );
      const data = await res.json();
      setJoined(data.joined);
    };
    checkJoin();
  }, [id, user]);

  // ===== Handle Join =====
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

      if (data.success) {
        toast.success("You joined this event!");
        setJoined(true);
        setTimeout(() => navigate("/joined-events"), 1000);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Error joining event.");
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
      <p className="text-gray-600 mb-2">🏷️ {event.eventType}</p>
      <p className="text-gray-600 mb-2">
        🗓️ {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mt-4">{event.description}</p>

      <button
        onClick={handleJoin}
        disabled={joined}
        className={`mt-6 px-6 py-2 rounded-lg transition text-white ${
          joined
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {joined ? "Already Joined" : "Join Event"}
      </button>
    </div>
  );
};

export default EventDetails;

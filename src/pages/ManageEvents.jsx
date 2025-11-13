import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
    date: null,
  });

  // Fetch user-created events
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/events?createdBy=${user.email}`
        );
        const data = await res.json();
        if (Array.isArray(data)) setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchUserEvents();
  }, [user]);

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDateChange = (date) => setFormData({ ...formData, date });

  // Save updated event
  const handleSave = async (id) => {
    const { title, description, eventType, thumbnail, location, date } =
      formData;
    if (
      !title ||
      !description ||
      !eventType ||
      !thumbnail ||
      !location ||
      !date
    ) {
      toast.error("Please fill all fields.");
      return;
    }
    if (new Date(date) < new Date()) {
      toast.error("Event date cannot be in the past.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, date: date.toISOString() }),
      });
      const data = await res.json();
      if (data.success) {
        setEvents(
          events.map((e) => (e._id === id ? { ...e, ...formData } : e))
        );
        setEditingEventId(null);
        toast.success("Event updated successfully!");
      } else {
        toast.error(data.message || "Failed to update event.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating event.");
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) setEvents(events.filter((e) => e._id !== id));
      else toast.error("Failed to delete event.");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting event.");
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Manage Your Events
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading your events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven't created any events yet.
          </p>
        ) : (
          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden p-6"
              >
                {editingEventId === event._id ? (
                  <form className="space-y-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select type</option>
                      <option value="Cleanup">Cleanup</option>
                      <option value="Plantation">Plantation</option>
                      <option value="Donation">Donation</option>
                      <option value="Child Education">Child Education</option>
                    </select>
                    <input
                      type="text"
                      name="thumbnail"
                      placeholder="Thumbnail URL"
                      value={formData.thumbnail}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      className="w-full p-2 border rounded"
                    />

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => handleSave(event._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingEventId(null)}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-2">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="h-48 w-full object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                    <p className="text-gray-500 text-sm">
                      Type: {event.eventType}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Location: {event.location}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </p>

                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => {
                          setEditingEventId(event._id);
                          setFormData({
                            title: event.title,
                            description: event.description,
                            eventType: event.eventType,
                            thumbnail: event.thumbnail,
                            location: event.location,
                            date: new Date(event.date),
                          });
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageEvents;

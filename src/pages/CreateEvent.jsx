import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
    date: null,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleDateChange = (date) => setForm({ ...form, date });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, eventType, thumbnail, location, date } = form;

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
    if (date < new Date()) {
      toast.error("Event date cannot be in the past.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          eventType,
          thumbnail,
          location,
          date: date.toISOString(),
          createdBy: user.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Event created successfully!");
        navigate("/upcoming-events");
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            required
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
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-2 border rounded"
          />
          <DatePicker
            selected={form.date}
            onChange={handleDateChange}
            minDate={new Date()}
            placeholderText="Select date"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

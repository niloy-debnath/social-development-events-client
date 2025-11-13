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

  const validateForm = () => {
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
      return false;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters.");
      return false;
    }

    if (description.length < 10) {
      toast.error("Description must be at least 10 characters.");
      return false;
    }

    if (location.length < 3) {
      toast.error("Please enter a valid location name.");
      return false;
    }

    if (date < new Date()) {
      toast.error("Event date cannot be in the past.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: form.date.toISOString(),
          createdBy: user.email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("🎉 Event created successfully!");
        navigate("/upcoming-events");
      } else {
        toast.error(data.message || "Failed to create event.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            rows={3}
          />

          {/* Event Type */}
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Event Type</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
            <option value="Child Education">Child Education</option>
          </select>

          {/* Thumbnail URL */}
          <input
            type="text"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail Image URL"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Event Location"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />

          {/* Date */}
          <DatePicker
            selected={form.date}
            onChange={handleDateChange}
            minDate={new Date()}
            placeholderText="Select Event Date"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

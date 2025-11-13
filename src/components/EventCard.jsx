import { Link } from "react-router";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={event.thumbnail}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        {event.title}
      </h3>
      <p className="text-sm text-gray-500 mb-2">{event.location}</p>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-medium text-gray-700">Type:</span> {event.type}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-medium text-gray-700">Date:</span> {event.date}
      </p>

      <Link
        to={`/events/${event.id}`}
        className="mt-auto inline-block text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        View Event
      </Link>
    </div>
  );
};

export default EventCard;

import { Link } from "react-router";

const EventCard = ({ event }) => {
  const { _id, title, location, eventType, date, thumbnail } = event;

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={thumbnail} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">📍 {location}</p>
        <p className="text-gray-600">
          🗓️ {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-gray-600">🏷️ Type: {eventType}</p>

        <Link
          to={`/event/${_id}`}
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Event
        </Link>
      </div>
    </div>
  );
};

export default EventCard;

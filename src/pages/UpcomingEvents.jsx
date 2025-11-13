import EventCard from "../components/EventCard";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tree Plantation in Hossainpur 🌱",
      location: "Kishoreganj",
      type: "Plantation",
      date: "2025-12-01",
      thumbnail: "https://i.ibb.co/S3P3D7T/tree-plantation.jpg",
    },
    {
      id: 2,
      title: "Road Cleaning Drive 🧹",
      location: "Mirpur 10, Dhaka",
      type: "Cleanup",
      date: "2025-11-20",
      thumbnail: "https://i.ibb.co/4TmR8wm/road-cleaning.jpg",
    },
    {
      id: 3,
      title: "Child Education Workshop 📚",
      location: "Gazipur",
      type: "Education",
      date: "2025-12-05",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/10_years_old_Dipa_and_12_years_old_Laboni_study_in_class_2_at_%22Unique_Child_learning_Center%22%2C_Mirmur-Dhaka%2C_Bangladesh.jpg",
    },
  ];

  // Filter future events (for demo purpose, assuming all are upcoming)
  const today = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= today);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Upcoming Events
        </h2>

        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
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

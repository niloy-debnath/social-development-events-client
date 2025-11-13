import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="relative h-[85vh] flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `url("https://i.ibb.co.com/gLDy7Mvf/wave-haikei.png")`,
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 drop-shadow-lg">
          Connecting People, Creating Memories 🎉
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
          Discover, create, and manage social events with ease. Whether it's a
          community gathering, corporate meetup, or celebration — make every
          moment unforgettable.
        </p>

        <Link
          to="/upcoming-events"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
        >
          Explore Events
        </Link>
      </div>
    </section>
  );
};

export default Banner;

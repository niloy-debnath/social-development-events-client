import { useState } from "react";
import { Link, Links } from "react-router";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <nav className="flex justify-between items-center bg-white px-6 py-3 shadow-md">
      {/* App Logo/Name */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Events Tracker
      </Link>

      {/* Navbar Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/upcoming-events"
          className="text-gray-700 hover:text-blue-500"
        >
          Upcoming Events
        </Link>

        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            {/* Profile Picture */}
            <img
              src="https://i.ibb.co/5Mcs5vN/user.png"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                <p className="text-center text-sm text-gray-500 mb-2">
                  John Doe
                </p>
                <hr className="border-gray-300 mb-2" />
                <Link
                  to="/create-event"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Create Event
                </Link>
                <Links
                  to="/manage-events"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Manage Events
                </Links>
                <Link
                  to="/joined-events"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Joined Events
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-white px-6 py-3 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/wZtNBY1k/logo-dark-removebg-preview-1.png"
          alt="Logo"
          className="w-10"
        />
        <h1 className="text-2xl font-bold text-blue-600">Event Tracker</h1>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/upcoming-events"
          className="text-gray-700 hover:text-blue-500"
        >
          Upcoming Events
        </Link>

        {!user ? (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
        ) : (
          <div className="relative flex items-center gap-3">
            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <img
                src={user.photoURL || "https://i.ibb.co/Jj29Y2pJ/man.png"}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
              />
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
                  <p className="text-center text-sm text-gray-500 mb-2">
                    {user.displayName}
                  </p>
                  <hr className="border-gray-300 mb-2" />
                  <Link
                    to="/create-event"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Create Event
                  </Link>
                  <Link
                    to="/manage-events"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Manage Events
                  </Link>
                  <Link
                    to="/joined-events"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Joined Events
                  </Link>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

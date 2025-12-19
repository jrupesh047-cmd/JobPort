import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useStore } from "../store";

function Navbar() {
  const navigate = useNavigate();

  const {
    isDarkMode,
    toggleDarkMode,
    currentUser,
    setCurrentUser,
  } = useStore();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className={`${isDarkMode ? "dark bg-gray-800" : "bg-white"} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            JobPortal
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/jobs"
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Jobs
            </Link>

            {currentUser ? (
              <>
                <Link
                  to={`/${currentUser.role}/dashboard`}
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } hover:text-blue-600`}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } hover:text-blue-600`}
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

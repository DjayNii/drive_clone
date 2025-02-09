import React from "react";
import { useNavigate } from "react-router-dom";
import { clearCookies } from "../util/cookie";

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear all cookies
    clearCookies();

    // Optionally, clear localStorage or sessionStorage if used for authentication
    localStorage.clear(); // or sessionStorage.clear();

    // Navigate to the login page
    navigate("/");
  };
  return (
    <div className="flex flex-row gap-2">
      <button
        className="bg-blue-600 dark:bg-secondary4 hover:bg-blue-800 dark:hover:bg-secondary6 text-white dark:text-blackMin1 font-bold font-parkinsans py-2 px-4 rounded-md "
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default LogoutButton;

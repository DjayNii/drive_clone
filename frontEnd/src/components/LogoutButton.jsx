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
    navigate("/login");
  };
  return (
    <div className="flex flex-row gap-2">
      <button
        className="bg-primary5 hover:bg-primary6 text-white font-bold font-mono py-2 px-4 rounded-md "
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default LogoutButton;

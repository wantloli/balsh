import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white">
        <ul className="pt-16 space-y-2">
          <Link to="/dashboard">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Dashboard
            </li>
          </Link>
          <Link to="/customer">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Customer
            </li>
          </Link>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            Settings
          </li>
          <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            Logout
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8 ml-64">{children}</div>
    </div>
  );
};

export default AuthLayout;

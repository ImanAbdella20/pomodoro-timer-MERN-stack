import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doSignOut } from "../../firebase/auth";
import "../../index.css";
import { FaUserCircle } from "react-icons/fa";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import axios from "axios";

const Header: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(!!user);

  useEffect(() => {
    setSignedIn(!!user);
  }, [user]);

  const handleSignOut = async () => {
    await doSignOut();
    setSignedIn(false);
    navigate("/category");
  };

  const reauthenticate = async (password: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      alert("No authenticated user found.");
      return false;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      return true; // Successful re-authentication
    } catch (error) {
      console.error("Re-authentication failed:", error);
      alert("Incorrect password. Please try again.");
      return false;
    }
  };

  const deleteAccount = async (password: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("No authenticated user found.");
      return;
    }

    try {
      const reauthenticated = await reauthenticate(password);
      if (!reauthenticated) return;

      // Make API call to delete account from the database
      await axios.delete(`${import.meta.env.REACT_APP_API_URL}/auth/deleteaccount`, {
        data: { uid: user.uid },
      });

      // Delete the user from Firebase Authentication
      await user.delete();

      alert("Account deleted successfully");
      await doSignOut();
      setSignedIn(false);
      navigate("/");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/requires-recent-login") {
        alert("Please re-authenticate before deleting your account.");
      } else {
        alert("An error occurred while deleting your account.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      const userPassword = prompt("Enter your password to confirm account deletion:");
      if (userPassword) {
        await deleteAccount(userPassword); // Pass password directly instead of using state
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigate = (path: string) => {
    setDropdownOpen(false); // Close dropdown
    navigate(path); // Navigate to the selected path
  };

  return (
    <div className="bg-slate-700">
      <div className="w-full h-14 flex justify-between items-center px-96">
        <div className="flex space-x-8">
          <Link to="/track" className="text-white cursor-pointer nav-link">
            Track
          </Link>
          <Link to="/about" className="text-white cursor-pointer nav-link">
            About
          </Link>
          <Link to="/category" className="text-white cursor-pointer nav-link">
            Tasks
          </Link>
          <Link to="/setting" className="text-white cursor-pointer nav-link">
            Setting
          </Link>
          <Link to="/statistics" className="text-white cursor-pointer nav-link">
            Statistics
          </Link>
        </div>

        <div className="relative">
          {signedIn ? (
            <FaUserCircle
              className="text-white text-2xl cursor-pointer"
              onClick={toggleDropdown}
            />
          ) : (
            <Link to="/login" className="text-white text-sm">
              Sign In
            </Link>
          )}

          {dropdownOpen && signedIn && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={() => handleNavigate("/account")}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
              >
                Account
              </button>
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className="border-gray-700" />
    </div>
  );
};

export default Header;

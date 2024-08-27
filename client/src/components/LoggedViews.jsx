import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

export const LoggedInView = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        toast.dismiss();
        toast.error(data.message, {
          autoClose: 3000,
        });
        return;
      }
      dispatch(signOutSuccess(data));
      toast.dismiss();
      toast.success("Signed out successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      dispatch(signOutFailure(error.message));
      toast.dismiss();
      toast.error(error.message, {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative ml-3">
      <button
        type="button"
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        onClick={toggleMenu}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-12 rounded-full object-cover"
          src={user.avatar}
          alt="img"
        />
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            onClick={closeMenu}
          >
            Your Profile
          </Link>
          <span
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            onClick={handleSignOut}
          >
            Sign out
          </span>
        </div>
      )}
    </div>
  );
};

export const LoggedOutView = () => {
  return (
    <div className="ml-3 md:order-3 flex items-center space-x-3">
      <Link to="/sign-up">
        <button className="w-20 h-8 rounded-lg text-white hover:bg-violet-700 bg-purple-800 border border-white">
          Sign Up
        </button>
      </Link>
      <Link to="/sign-in">
        <button className="w-20 h-8 rounded-lg bg-white hover:bg-violet-700 hover:text-white">
          Login
        </button>
      </Link>
    </div>
  );
};

export const MobileViewOptions = () => {
  <div>
    <Link
      to="/profile"
      className="block px-4 py-2 text-sm text-gray-700"
      role="menuitem"
    >
      Your Profile
    </Link>
    <span
      className="block px-4 py-2 text-sm text-gray-700"
      role="menuitem"
      onClick={LoggedInView.handleSignOut}
    >
      Sign out
    </span>
  </div>;
};

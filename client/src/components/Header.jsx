import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LoggedInView, LoggedOutView } from "./LoggedViews";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation(); // Get the current path
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex flex-col sm:flex-row sm:justify-between h-auto sm:h-16 items-center">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Terra List"
                />
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                  <span className="text-orange-500">Terra</span>
                  <span className="text-slate-500">List</span>
                </h1>
              </div>
              <div className="flex items-center sm:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center space-x-4">
              <Link to="/">
                <div
                  className={`${
                    isActive("/") ? "bg-gray-900 text-white" : "text-gray-300"
                  } rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white`}
                  aria-current={isActive("/") ? "page" : undefined}
                >
                  Home
                </div>
              </Link>
              <Link to="/about">
                <div
                  className={`${
                    isActive("/about")
                      ? "bg-gray-900 text-white"
                      : "text-gray-300"
                  } rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white`}
                  aria-current={isActive("/about") ? "page" : undefined}
                >
                  About
                </div>
              </Link>
              <Link to="/search">
                <div
                  className={`${
                    isActive("/about")
                      ? "bg-gray-900 text-white"
                      : "text-gray-300"
                  } rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white`}
                  aria-current={isActive("/search") ? "page" : undefined}
                >
                  Listings
                </div>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-auto mb-3 sm:mb-0">
              <form
                onSubmit={handleSubmit}
                className="bg-slate-100 p-3 rounded-lg flex items-center h-7 mt-3 sm:mt-0 sm:ml-auto w-full"
              >
                <input
                  type="text"
                  placeholder="search..."
                  className="bg-transparent focus:outline-none w-full sm:w-64 md:w-44"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="">
                  <FaSearch className="text-slate-500 align-text-right" />
                </button>
              </form>
              <div className="hidden sm:flex">
                {currentUser ? (
                  <LoggedInView user={currentUser} />
                ) : (
                  <LoggedOutView />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link to="/">
              <div
                className={`${
                  isActive("/") ? "bg-gray-900 text-white" : "text-gray-300"
                } block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Home
              </div>
            </Link>
            <Link to="/about">
              <div
                className={`${
                  isActive("/about")
                    ? "bg-gray-900 text-white"
                    : "text-gray-300"
                } block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white`}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About
              </div>
            </Link>
            {currentUser ? (
              <LoggedInView user={currentUser} />
            ) : (
              <LoggedOutView />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LoggedInView, LoggedOutView, MobileViewOptions } from "./LoggedViews";

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
    // <header className="border-b border-white md:border-none sticky top-0 z-10 backdrop-blur ">
    <header className="sticky top-0 z-10 backdrop-blur">
      <nav className="py-auto bg-transparent">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex flex-col md:flex-row md:justify-between h-auto sm:h-16 items-center">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center gap-3">
                <img
                  className="h-8 w-auto min-w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=800"
                  alt="Terra List"
                />
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                  <span className="text-orange-500 md:hidden">Terra</span>
                  <span className="text-violet-500 md:hidden">List</span>
                </h1>
              </div>
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center border border-violet-400 rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/">
                <div
                  className={`${
                    isActive("/")
                      ? "bg-white/70 border border-purple-600 text-purple-700"
                      : "text-purple-700/60"
                  } rounded-md px-3 py-2 text-sm lg:text-lg font-medium hover:bg-violet-500 hover:text-white`}
                  aria-current={isActive("/") ? "page" : undefined}
                >
                  Home
                </div>
              </Link>
              <Link to="/about">
                <div
                  className={`${
                    isActive("/about")
                      ? "bg-white/70 border border-purple-600 text-purple-700"
                      : "text-purple-700/60"
                  } rounded-md px-3 py-2 text-sm lg:text-lg font-medium hover:bg-violet-500 hover:text-white`}
                  aria-current={isActive("/about") ? "page" : undefined}
                >
                  About
                </div>
              </Link>
              <Link to="/search">
                <div
                  className={`${
                    isActive("/search")
                      ? "bg-white/70 border border-purple-600 text-purple-700"
                      : "text-purple-700/60"
                  } rounded-md px-3 py-2 text-sm lg:text-lg font-medium hover:bg-violet-500 hover:text-white`}
                  aria-current={isActive("/search") ? "page" : undefined}
                >
                  Listings
                </div>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-slate-100 border border-purple-600 p-3 rounded-lg flex items-center h-7 mt-3 md:mt-0 md:ml-auto w-full"
              >
                <input
                  type="text"
                  placeholder="search..."
                  className="bg-transparent focus:outline-none w-full md:w-36 lg:w-72"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="">
                  <FaSearch className="text-slate-500 align-text-right" />
                </button>
              </form>
              <div className="hidden md:flex">
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
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link to="/">
              <div
                className={`${
                  isActive("/") ? "bg-purple-900 text-white" : "text-purple-500"
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
                    ? "bg-purple-900 text-white"
                    : "text-purple-500"
                } block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white`}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About
              </div>
            </Link>
            <Link to="/search">
              <div
                className={`${
                  isActive("/search")
                    ? "bg-purple-900 text-white"
                    : "text-purple-500"
                } block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white`}
                aria-current={isActive("/search") ? "page" : undefined}
              >
                Search
              </div>
            </Link>
            {currentUser ? (
              <div>
                <Link
                  to="/profile"
                  className={`${
                    isActive("/profile")
                      ? "bg-purple-900 text-white"
                      : "text-purple-500"
                  } block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white`}
                  aria-current={isActive("/profile") ? "page" : undefined}
                  role="menuitem"
                >
                  Profile
                </Link>
                <span
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  onClick={LoggedInView.handleSignOut}
                >
                  Sign out
                </span>
              </div>
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

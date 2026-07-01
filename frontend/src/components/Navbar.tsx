import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {

  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { logout } from "../utils/auth";

function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const notifications = [
    {
      id: 1,
      title: "Image Uploaded",
      message: "Your image has been uploaded successfully.",
      unread: true,
    },
    {
      id: 2,
      title: "AI Analysis Complete",
      message: "AI completed your latest analysis.",
      unread: true,
    },
    {
      id: 3,
      title: "History Updated",
      message: "Analysis saved into History.",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Upload", path: "/upload" },
    { name: "AI Analysis", path: "/analysis" },
    { name: "History", path: "/history" },
    { name: "Profile", path: "/profile" },
  ];

  return (

    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-lg">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-slate-900">
            <img
              src="/logo.png"
              alt="AIShield Logo"
              className="h-10 w-10 object-contain"
          />
        </div>

          <div>

            <h1 className="text-lg font-bold text-white">
              AIShield
            </h1>

            <p className="text-xs text-gray-400">
              AI Powered Content Moderation
            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="flex gap-4">

          {navLinks.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-cyan-400"
              }`}
            >
              {item.name}
            </Link>

          ))}

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <div className="relative">

            <button
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
              className="relative text-gray-300 transition hover:text-cyan-400"
            >

              <FaBell size={20} />

              {unreadCount > 0 && (

                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">

                  {unreadCount}

                </span>

              )}
                          </button>

            {showNotifications && (

              <div className="absolute right-0 mt-4 w-96 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">

                <div className="flex items-center justify-between border-b border-white/10 p-4">

                  <h2 className="text-lg font-bold text-white">
                    Notifications
                  </h2>

                  <button
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    Mark all read
                  </button>

                </div>

                <div className="max-h-80 overflow-y-auto">

                  {notifications.map((item) => (

                    <div
                      key={item.id}
                      className="border-b border-white/5 p-4 transition hover:bg-slate-800"
                    >

                      <div className="flex items-start gap-3">

                        <FaCheckCircle
                          className={`mt-1 ${
                            item.unread
                              ? "text-cyan-400"
                              : "text-green-400"
                          }`}
                        />

                        <div className="flex-1">

                          <h3 className="font-semibold text-white">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-sm text-gray-400">
                            {item.message}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

          <button className="text-cyan-400 hover:text-cyan-300 transition">
            <FaUserCircle size={30} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;
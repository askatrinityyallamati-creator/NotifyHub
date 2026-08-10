import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          <span className="logo-icon">🔔</span>
          <span>NotifyHub</span>
        </Link>

        {/* Navigation */}
        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >

          {/* Home */}
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "active-link"
                : ""
            }
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* Announcements */}
          <Link
            to="/announcements"
            className={
              location.pathname === "/announcements"
                ? "active-link"
                : ""
            }
            onClick={closeMenu}
          >
            Announcements
          </Link>

          {/* Events */}
          <Link
            to="/events"
            className={
              location.pathname === "/events"
                ? "active-link"
                : ""
            }
            onClick={closeMenu}
          >
            Events
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            className={
              location.pathname === "/contact"
                ? "active-link"
                : ""
            }
            onClick={closeMenu}
          >
            Contact
          </Link>

          {/* Admin */}
          <Link
            to="/admin"
            className={
              location.pathname === "/admin"
                ? "active-link"
                : ""
            }
            onClick={closeMenu}
          >
            Admin
          </Link>

          {/* Clickable Red Urgent Button */}
          <Link
            to="/urgent"
            className="urgent-button"
            onClick={closeMenu}
          >
            🚨 Urgent
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle menu"
        >
          ☰
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
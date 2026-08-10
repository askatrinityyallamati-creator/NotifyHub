import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="live-badge">
          <span className="live-dot"></span>
          CAMPUS NOTICE BOARD • LIVE
        </div>

        <h1>
          Never Miss a Campus
          <span> Update Again</span>
        </h1>

        <p>
          Stay informed with college announcements, events,
          deadlines and urgent alerts — all in one place.
        </p>

        <div className="hero-buttons">
          <Link to="/announcements" className="primary-button">
            View Announcements →
          </Link>

          <Link to="/events" className="secondary-button">
            Explore Events
          </Link>
        </div>

        <div className="scroll-indicator">
          <span>↓</span>
          Scroll to explore
        </div>

      </div>
    </section>
  );
}

export default Hero;
import { useState } from "react";
import Navbar from "../components/Navbar";
import { getEvents } from "../data/eventsData";
import type { EventItem } from "../data/eventsData";

function Events() {
  const events = getEvents();

  const [selectedEvent, setSelectedEvent] =
    useState<EventItem | null>(null);

  return (
    <>
      <Navbar />

      <main className="events-page">

        {/* PAGE HEADER */}
        <section className="page-header">
          <p className="page-label">
            CAMPUS ACTIVITIES
          </p>

          <h1>Events</h1>

          <p>
            Discover workshops, competitions,
            celebrations and activities happening
            on campus.
          </p>
        </section>

        {/* EVENTS */}
        <section className="events-grid">

          {events.length > 0 ? (
            events.map((event) => (
              <article
                className="event-card"
                key={event.id}
              >

                {/* DATE */}
                <div className="event-date">
                  <span>
                    {event.date.split(" ")[0]}
                  </span>

                  <strong>
                    {event.date
                      .split(" ")[1]
                      ?.replace(",", "")}
                  </strong>
                </div>

                {/* EVENT CONTENT */}
                <div className="event-content">

                  <span className="event-category">
                    {event.category}
                  </span>

                  <h2>
                    {event.title}
                  </h2>

                  <p>
                    {event.description}
                  </p>

                  <div className="event-details">

                    <span>
                      🕐 {event.time}
                    </span>

                    <span>
                      📍 {event.location}
                    </span>

                  </div>

                  <button
                    type="button"
                    className="event-button"
                    onClick={() =>
                      setSelectedEvent(event)
                    }
                  >
                    View Event →
                  </button>

                </div>

              </article>
            ))
          ) : (
            <div className="no-results">
              <h3>No events found</h3>

              <p>
                There are currently no upcoming
                events.
              </p>
            </div>
          )}

        </section>

      </main>

      {/* EVENT POPUP */}
      {selectedEvent && (
        <div
          className="event-modal-overlay"
          onClick={() =>
            setSelectedEvent(null)
          }
        >

          <div
            className="event-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="event-modal-close"
              onClick={() =>
                setSelectedEvent(null)
              }
            >
              ×
            </button>

            <span className="event-category">
              {selectedEvent.category}
            </span>

            <h2>
              {selectedEvent.title}
            </h2>

            <p>
              {selectedEvent.description}
            </p>

            <div className="event-modal-details">

              <div>
                <strong>📅 Date</strong>
                <span>
                  {selectedEvent.date}
                </span>
              </div>

              <div>
                <strong>🕐 Time</strong>
                <span>
                  {selectedEvent.time}
                </span>
              </div>

              <div>
                <strong>📍 Location</strong>
                <span>
                  {selectedEvent.location}
                </span>
              </div>

            </div>

            <button
              type="button"
              className="event-modal-button"
              onClick={() =>
                setSelectedEvent(null)
              }
            >
              Close
            </button>

          </div>

        </div>
      )}

    </>
  );
}

export default Events;
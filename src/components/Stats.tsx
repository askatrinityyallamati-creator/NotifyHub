import {
  getAnnouncements,
} from "../data/announcementsData";

import {
  getEvents,
} from "../data/eventsData";

import {
  getAlerts,
} from "../data/alertsData";

function Stats() {
  const totalNotices = getAnnouncements().length;
  const upcomingEvents = getEvents().length;
  const urgentAlerts = getAlerts().length;

  const stats = [
    {
      number: `${totalNotices}+`,
      label: "Total Notices",
    },
    {
      number: `${upcomingEvents}+`,
      label: "Upcoming Events",
    },
    {
      number: `${urgentAlerts}`,
      label: "Urgent Alerts",
    },
    {
      number: "12+",
      label: "Departments",
    },
  ];

  return (
    <section className="stats-section">
      <div className="section-heading">
        <p>REAL IMPACT, EVERY DAY</p>

        <h2>
          Stay connected with your campus
        </h2>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div
            className="stat-card"
            key={stat.label}
          >
            <h3>{stat.number}</h3>

            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
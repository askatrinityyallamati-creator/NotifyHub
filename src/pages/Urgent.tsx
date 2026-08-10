import Navbar from "../components/Navbar";
import { getAlerts } from "../data/alertsData";

function Urgent() {
  const alerts = getAlerts();

  return (
    <>
      <Navbar />

      <main className="urgent-page">

        {/* HEADER */}
        <section className="urgent-header">

          <div className="urgent-icon">
            🚨
          </div>

          <p className="page-label">
            IMPORTANT NOTICE
          </p>

          <h1>
            Urgent Alerts
          </h1>

          <p>
            Important campus updates that require
            your immediate attention.
          </p>

        </section>

        {/* ALERTS */}
        <section className="alerts-container">

          {alerts.length > 0 ? (
            alerts.map((alert) => (

              <article
                className="alert-card"
                key={alert.id}
              >

                {/* ALERT ICON */}
                <div className="alert-icon">
                  🚨
                </div>

                {/* ALERT CONTENT */}
                <div className="alert-content">

                  <div className="alert-top">

                    <span className="alert-type">
                      {alert.type}
                    </span>

                    <span
                      className={
                        alert.level === "Critical"
                          ? "alert-level critical"
                          : "alert-level"
                      }
                    >
                      {alert.level}
                    </span>

                  </div>

                  <h2>
                    {alert.title}
                  </h2>

                  <p>
                    {alert.description}
                  </p>

                  <div className="alert-footer">

                    <span>
                      📅 {alert.date}
                    </span>

                    <button className="alert-button">
                      View Details →
                    </button>

                  </div>

                </div>

              </article>

            ))
          ) : (

            <div className="no-results">

              <h3>
                No urgent alerts
              </h3>

              <p>
                There are currently no urgent alerts.
              </p>

            </div>

          )}

        </section>

      </main>
    </>
  );
}

export default Urgent;
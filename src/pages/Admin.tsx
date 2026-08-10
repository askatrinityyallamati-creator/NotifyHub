import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  addAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
} from "../data/announcementsData";

import {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
} from "../data/eventsData";

import {
  addAlert,
  getAlerts,
  deleteAlert,
  updateAlert,
} from "../data/alertsData";

function Admin() {
  const navigate = useNavigate();

  // =========================
  // LOGIN CHECK
  // =========================

  useEffect(() => {
    const loggedIn = localStorage.getItem("notifyhub_logged_in");

    if (loggedIn !== "true") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState("dashboard");

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("notifyhub_logged_in");
    localStorage.removeItem("notifyhub_username");

    navigate("/login", { replace: true });
  };

  // =========================
  // ANNOUNCEMENT STATE
  // =========================

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementCategory, setAnnouncementCategory] =
    useState("General");
  const [announcementDepartment, setAnnouncementDepartment] =
    useState("");
  const [announcementDate, setAnnouncementDate] = useState("");
  const [announcementDescription, setAnnouncementDescription] =
    useState("");
  const [announcementPriority, setAnnouncementPriority] =
    useState("normal");

  const [editingAnnouncementId, setEditingAnnouncementId] =
    useState<number | null>(null);

  // =========================
  // EVENT STATE
  // =========================

  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] =
    useState("Technical");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] =
    useState("");

  const [editingEventId, setEditingEventId] =
    useState<number | null>(null);

  // =========================
  // ALERT STATE
  // =========================

  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("EXAM");
  const [alertPriority, setAlertPriority] =
    useState<"Critical" | "High">("High");
  const [alertDate, setAlertDate] = useState("");
  const [alertDescription, setAlertDescription] =
    useState("");

  const [editingAlertId, setEditingAlertId] =
    useState<number | null>(null);

  // =========================
  // DATE HELPERS
  // =========================

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const convertToInputDate = (date: string) => {
    const parsed = new Date(date);

    if (isNaN(parsed.getTime())) {
      return "";
    }

    const year = parsed.getFullYear();

    const month = String(
      parsed.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      parsed.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =========================
  // ANNOUNCEMENT SAVE
  // =========================

  const handleSaveAnnouncement = () => {
    if (
      !announcementTitle.trim() ||
      !announcementDepartment.trim() ||
      !announcementDate ||
      !announcementDescription.trim()
    ) {
      alert("Please fill in all announcement fields.");
      return;
    }

    const data = {
      title: announcementTitle,
      description: announcementDescription,
      category: announcementCategory,
      department: announcementDepartment,
      date: formatDate(announcementDate),
      priority:
        announcementPriority as "high" | "normal",
    };

    if (editingAnnouncementId !== null) {
      updateAnnouncement(
        editingAnnouncementId,
        data
      );

      alert("Announcement updated successfully!");
    } else {
      addAnnouncement(data);

      alert("Announcement published successfully!");
    }

    resetAnnouncementForm();
  };

  // =========================
  // EDIT ANNOUNCEMENT
  // =========================

  const handleEditAnnouncement = (id: number) => {
    const item = getAnnouncements().find(
      (announcement) =>
        announcement.id === id
    );

    if (!item) return;

    setAnnouncementTitle(item.title);
    setAnnouncementCategory(item.category);
    setAnnouncementDepartment(item.department);

    setAnnouncementDate(
      convertToInputDate(item.date)
    );

    setAnnouncementDescription(
      item.description
    );

    setAnnouncementPriority(item.priority);

    setEditingAnnouncementId(id);
    setActiveTab("announcements");
  };

  // =========================
  // DELETE ANNOUNCEMENT
  // =========================

  const handleDeleteAnnouncement = (id: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this announcement?"
      )
    ) {
      return;
    }

    deleteAnnouncement(id);

    alert("Announcement deleted successfully!");

    setActiveTab("announcements");
  };

  const resetAnnouncementForm = () => {
    setAnnouncementTitle("");
    setAnnouncementCategory("General");
    setAnnouncementDepartment("");
    setAnnouncementDate("");
    setAnnouncementDescription("");
    setAnnouncementPriority("normal");
    setEditingAnnouncementId(null);
  };

  // =========================
  // EVENT SAVE
  // =========================

  const handleSaveEvent = () => {
    if (
      !eventTitle.trim() ||
      !eventDate ||
      !eventTime ||
      !eventLocation.trim() ||
      !eventDescription.trim()
    ) {
      alert("Please fill in all event fields.");
      return;
    }

    const formattedTime = new Date(
      `1970-01-01T${eventTime}:00`
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const data = {
      title: eventTitle,
      category: eventCategory,
      date: formatDate(eventDate),
      time: formattedTime,
      location: eventLocation,
      description: eventDescription,
    };

    if (editingEventId !== null) {
      updateEvent(editingEventId, data);

      alert("Event updated successfully!");
    } else {
      addEvent(data);

      alert("Event published successfully!");
    }

    resetEventForm();
  };

  // =========================
  // EDIT EVENT
  // =========================

  const handleEditEvent = (id: number) => {
    const item = getEvents().find(
      (event) => event.id === id
    );

    if (!item) return;

    setEventTitle(item.title);
    setEventCategory(item.category);

    setEventDate(
      convertToInputDate(item.date)
    );

    setEventLocation(item.location);
    setEventDescription(item.description);

    const timeDate = new Date(
      `January 1, 1970 ${item.time}`
    );

    if (!isNaN(timeDate.getTime())) {
      const hours = String(
        timeDate.getHours()
      ).padStart(2, "0");

      const minutes = String(
        timeDate.getMinutes()
      ).padStart(2, "0");

      setEventTime(`${hours}:${minutes}`);
    }

    setEditingEventId(id);
    setActiveTab("events");
  };

  // =========================
  // DELETE EVENT
  // =========================

  const handleDeleteEvent = (id: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this event?"
      )
    ) {
      return;
    }

    deleteEvent(id);

    alert("Event deleted successfully!");

    setActiveTab("events");
  };

  const resetEventForm = () => {
    setEventTitle("");
    setEventCategory("Technical");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventDescription("");
    setEditingEventId(null);
  };

  // =========================
  // ALERT SAVE
  // =========================

  const handleSaveAlert = () => {
    if (
      !alertTitle.trim() ||
      !alertDate ||
      !alertDescription.trim()
    ) {
      alert("Please fill in all alert fields.");
      return;
    }

    const data = {
      title: alertTitle,
      description: alertDescription,
      type: alertType,
      date: formatDate(alertDate),
      level: alertPriority,
    };

    if (editingAlertId !== null) {
      updateAlert(editingAlertId, data);

      alert("Urgent alert updated successfully!");
    } else {
      addAlert(data);

      alert("Urgent alert published successfully!");
    }

    resetAlertForm();
  };

  // =========================
  // EDIT ALERT
  // =========================

  const handleEditAlert = (id: number) => {
    const item = getAlerts().find(
      (alert) => alert.id === id
    );

    if (!item) return;

    setAlertTitle(item.title);
    setAlertType(item.type);
    setAlertPriority(item.level);

    setAlertDate(
      convertToInputDate(item.date)
    );

    setAlertDescription(item.description);

    setEditingAlertId(id);
    setActiveTab("alerts");
  };

  // =========================
  // DELETE ALERT
  // =========================

  const handleDeleteAlert = (id: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this alert?"
      )
    ) {
      return;
    }

    deleteAlert(id);

    alert("Urgent alert deleted successfully!");

    setActiveTab("alerts");
  };

  const resetAlertForm = () => {
    setAlertTitle("");
    setAlertType("EXAM");
    setAlertPriority("High");
    setAlertDate("");
    setAlertDescription("");
    setEditingAlertId(null);
  };

  // =========================
  // DASHBOARD COUNTS
  // =========================

  const announcementCount =
    getAnnouncements().length;

  const eventCount =
    getEvents().length;

  const alertCount =
    getAlerts().length;

  const stats = [
    {
      icon: "📢",
      number: announcementCount,
      label: "Announcements",
    },
    {
      icon: "📅",
      number: eventCount,
      label: "Events",
    },
    {
      icon: "🚨",
      number: alertCount,
      label: "Urgent Alerts",
    },
    {
      icon: "🏛️",
      number: 12,
      label: "Departments",
    },
  ];

  // =========================
  // ADMIN PAGE
  // =========================

  return (
    <>
      <Navbar />

      <main className="admin-page">

        {/* HEADER */}

        <section className="admin-header">

          <div>
            <p className="page-label">
              ADMIN PANEL
            </p>

            <h1>Dashboard</h1>

            <p>
              Manage your campus notifications
              and events.
            </p>
          </div>

          <div className="admin-header-actions">

            <div className="admin-badge">
              🔐 Administrator
            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </section>

        {/* CONTENT */}

        <section className="admin-container">

          {/* TABS */}

          <div className="admin-tabs">

            <button
              className={
                activeTab === "dashboard"
                  ? "admin-tab active"
                  : "admin-tab"
              }
              onClick={() =>
                setActiveTab("dashboard")
              }
            >
              📊 Dashboard
            </button>

            <button
              className={
                activeTab === "announcements"
                  ? "admin-tab active"
                  : "admin-tab"
              }
              onClick={() =>
                setActiveTab("announcements")
              }
            >
              📢 Announcements
            </button>

            <button
              className={
                activeTab === "events"
                  ? "admin-tab active"
                  : "admin-tab"
              }
              onClick={() =>
                setActiveTab("events")
              }
            >
              📅 Events
            </button>

            <button
              className={
                activeTab === "alerts"
                  ? "admin-tab active"
                  : "admin-tab"
              }
              onClick={() =>
                setActiveTab("alerts")
              }
            >
              🚨 Alerts
            </button>

          </div>

          {/* =========================
              DASHBOARD
          ========================= */}

          {activeTab === "dashboard" && (
            <>
              <div className="admin-stats">

                {stats.map((stat) => (
                  <div
                    className="admin-stat-card"
                    key={stat.label}
                  >

                    <div className="admin-stat-icon">
                      {stat.icon}
                    </div>

                    <div>
                      <h2>{stat.number}</h2>
                      <p>{stat.label}</p>
                    </div>

                  </div>
                ))}

              </div>

              <div className="admin-actions">

                <div className="admin-action-card">

                  <div className="admin-action-icon">
                    📢
                  </div>

                  <h3>Add Announcement</h3>

                  <p>
                    Publish a new campus announcement
                    for students.
                  </p>

                  <button
                    onClick={() =>
                      setActiveTab("announcements")
                    }
                  >
                    Create Announcement →
                  </button>

                </div>

                <div className="admin-action-card">

                  <div className="admin-action-icon">
                    📅
                  </div>

                  <h3>Add Event</h3>

                  <p>
                    Create and publish an upcoming
                    campus event.
                  </p>

                  <button
                    onClick={() =>
                      setActiveTab("events")
                    }
                  >
                    Create Event →
                  </button>

                </div>

                <div className="admin-action-card">

                  <div className="admin-action-icon">
                    🚨
                  </div>

                  <h3>Add Urgent Alert</h3>

                  <p>
                    Publish an important alert that
                    needs immediate attention.
                  </p>

                  <button
                    onClick={() =>
                      setActiveTab("alerts")
                    }
                  >
                    Create Alert →
                  </button>

                </div>

              </div>
            </>
          )}

          {/* =========================
              ANNOUNCEMENTS
          ========================= */}

          {activeTab === "announcements" && (
            <>
              <div className="admin-form-card">

                <h2>
                  {editingAnnouncementId !== null
                    ? "Edit Announcement"
                    : "Create Announcement"}
                </h2>

                <div className="admin-form-group">
                  <label>
                    Announcement Title
                  </label>

                  <input
                    type="text"
                    placeholder="Enter announcement title"
                    value={announcementTitle}
                    onChange={(e) =>
                      setAnnouncementTitle(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category</label>

                  <select
                    value={announcementCategory}
                    onChange={(e) =>
                      setAnnouncementCategory(
                        e.target.value
                      )
                    }
                  >
                    <option>General</option>
                    <option>Exams</option>
                    <option>Placements</option>
                    <option>Events</option>
                    <option>Finance</option>
                    <option>Holiday</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Department</label>

                  <input
                    type="text"
                    placeholder="Enter department"
                    value={announcementDepartment}
                    onChange={(e) =>
                      setAnnouncementDepartment(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Announcement Date</label>

                  <input
                    type="date"
                    value={announcementDate}
                    onChange={(e) =>
                      setAnnouncementDate(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Priority</label>

                  <select
                    value={announcementPriority}
                    onChange={(e) =>
                      setAnnouncementPriority(
                        e.target.value
                      )
                    }
                  >
                    <option value="normal">
                      Normal
                    </option>

                    <option value="high">
                      High Priority
                    </option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Description</label>

                  <textarea
                    rows={5}
                    placeholder="Enter announcement details"
                    value={announcementDescription}
                    onChange={(e) =>
                      setAnnouncementDescription(
                        e.target.value
                      )
                    }
                  />
                </div>

                <button
                  className="admin-submit"
                  onClick={handleSaveAnnouncement}
                >
                  {editingAnnouncementId !== null
                    ? "Update Announcement"
                    : "Publish Announcement"}
                </button>

                {editingAnnouncementId !== null && (
                  <button
                    className="admin-cancel"
                    onClick={resetAnnouncementForm}
                  >
                    Cancel Edit
                  </button>
                )}

              </div>

              <div className="admin-list">

                <h2>
                  Published Announcements
                </h2>

                {getAnnouncements().map(
                  (announcement) => (
                    <div
                      className="admin-list-item"
                      key={announcement.id}
                    >

                      <div className="admin-list-content">

                        <h3>
                          {announcement.title}
                        </h3>

                        <p>
                          {announcement.description}
                        </p>

                        <small>
                          {announcement.category} •{" "}
                          {announcement.department} •{" "}
                          {announcement.date}
                        </small>

                      </div>

                      <div className="admin-list-actions">

                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEditAnnouncement(
                              announcement.id
                            )
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteAnnouncement(
                              announcement.id
                            )
                          }
                        >
                          🗑️ Delete
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>
            </>
          )}

          {/* =========================
              EVENTS
          ========================= */}

          {activeTab === "events" && (
            <>
              <div className="admin-form-card">

                <h2>
                  {editingEventId !== null
                    ? "Edit Event"
                    : "Create Event"}
                </h2>

                <div className="admin-form-group">
                  <label>Event Title</label>

                  <input
                    type="text"
                    placeholder="Enter event title"
                    value={eventTitle}
                    onChange={(e) =>
                      setEventTitle(e.target.value)
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category</label>

                  <select
                    value={eventCategory}
                    onChange={(e) =>
                      setEventCategory(e.target.value)
                    }
                  >
                    <option>Technical</option>
                    <option>Cultural</option>
                    <option>Workshop</option>
                    <option>Sports</option>
                    <option>Career</option>
                    <option>Exhibition</option>
                  </select>
                </div>

                <div className="admin-form-row">

                  <div className="admin-form-group">
                    <label>Date</label>

                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) =>
                        setEventDate(e.target.value)
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Time</label>

                    <input
                      type="time"
                      value={eventTime}
                      onChange={(e) =>
                        setEventTime(e.target.value)
                      }
                    />
                  </div>

                </div>

                <div className="admin-form-group">
                  <label>Location</label>

                  <input
                    type="text"
                    placeholder="Enter event location"
                    value={eventLocation}
                    onChange={(e) =>
                      setEventLocation(e.target.value)
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description</label>

                  <textarea
                    rows={5}
                    placeholder="Enter event details"
                    value={eventDescription}
                    onChange={(e) =>
                      setEventDescription(
                        e.target.value
                      )
                    }
                  />
                </div>

                <button
                  className="admin-submit"
                  onClick={handleSaveEvent}
                >
                  {editingEventId !== null
                    ? "Update Event"
                    : "Publish Event"}
                </button>

                {editingEventId !== null && (
                  <button
                    className="admin-cancel"
                    onClick={resetEventForm}
                  >
                    Cancel Edit
                  </button>
                )}

              </div>

              <div className="admin-list">

                <h2>
                  Published Events
                </h2>

                {getEvents().map((event) => (
                  <div
                    className="admin-list-item"
                    key={event.id}
                  >

                    <div className="admin-list-content">

                      <h3>
                        {event.title}
                      </h3>

                      <p>
                        {event.description}
                      </p>

                      <small>
                        {event.category} •{" "}
                        {event.date} •{" "}
                        {event.time} •{" "}
                        {event.location}
                      </small>

                    </div>

                    <div className="admin-list-actions">

                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEditEvent(event.id)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDeleteEvent(event.id)
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            </>
          )}

          {/* =========================
              ALERTS
          ========================= */}

          {activeTab === "alerts" && (
            <>
              <div className="admin-form-card">

                <h2>
                  {editingAlertId !== null
                    ? "Edit Urgent Alert"
                    : "Create Urgent Alert"}
                </h2>

                <div className="admin-form-group">
                  <label>Alert Title</label>

                  <input
                    type="text"
                    placeholder="Enter alert title"
                    value={alertTitle}
                    onChange={(e) =>
                      setAlertTitle(e.target.value)
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Alert Type</label>

                  <select
                    value={alertType}
                    onChange={(e) =>
                      setAlertType(e.target.value)
                    }
                  >
                    <option>EXAM</option>
                    <option>PLACEMENT</option>
                    <option>FINANCE</option>
                    <option>GENERAL</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Priority</label>

                  <select
                    value={alertPriority}
                    onChange={(e) =>
                      setAlertPriority(
                        e.target.value as
                          | "Critical"
                          | "High"
                      )
                    }
                  >
                    <option value="Critical">
                      Critical
                    </option>

                    <option value="High">
                      High
                    </option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Alert Date</label>

                  <input
                    type="date"
                    value={alertDate}
                    onChange={(e) =>
                      setAlertDate(e.target.value)
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description</label>

                  <textarea
                    rows={5}
                    placeholder="Enter alert details"
                    value={alertDescription}
                    onChange={(e) =>
                      setAlertDescription(
                        e.target.value
                      )
                    }
                  />
                </div>

                <button
                  className="admin-submit alert-submit"
                  onClick={handleSaveAlert}
                >
                  {editingAlertId !== null
                    ? "Update Urgent Alert"
                    : "Publish Urgent Alert"}
                </button>

                {editingAlertId !== null && (
                  <button
                    className="admin-cancel"
                    onClick={resetAlertForm}
                  >
                    Cancel Edit
                  </button>
                )}

              </div>

              <div className="admin-list">

                <h2>
                  Published Urgent Alerts
                </h2>

                {getAlerts().map((alert) => (
                  <div
                    className="admin-list-item"
                    key={alert.id}
                  >

                    <div className="admin-list-content">

                      <h3>
                        {alert.title}
                      </h3>

                      <p>
                        {alert.description}
                      </p>

                      <small>
                        {alert.type} •{" "}
                        {alert.level} •{" "}
                        {alert.date}
                      </small>

                    </div>

                    <div className="admin-list-actions">

                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEditAlert(alert.id)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDeleteAlert(alert.id)
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            </>
          )}

        </section>
      </main>
    </>
  );
}

export default Admin;
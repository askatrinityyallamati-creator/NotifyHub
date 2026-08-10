import { useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import { getAnnouncements } from "../data/announcementsData";

const categories = [
  "All",
  "Exams",
  "Placements",
  "Events",
  "General",
  "Finance",
  "Holiday",
];

function Announcements() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Selected announcement for Read More popup
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<any>(null);

  // Get announcements
  const announcements = getAnnouncements();

  const filteredAnnouncements = announcements.filter((announcement) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      announcement.title.toLowerCase().includes(searchText) ||
      announcement.description.toLowerCase().includes(searchText) ||
      announcement.category.toLowerCase().includes(searchText) ||
      announcement.department.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      announcement.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="announcements-page">

      {/* PAGE HEADER */}
      <section className="page-header">
        <p className="page-label">CAMPUS UPDATES</p>

        <h1>Announcements</h1>

        <p>
          All college notices and important updates in one place.
        </p>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="announcement-controls">

        <input
          type="text"
          placeholder="🔍 Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

      </section>

      {/* ANNOUNCEMENT CARDS */}
      <section className="announcement-grid">

        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              description={announcement.description}
              category={announcement.category}
              department={announcement.department}
              date={announcement.date}
              priority={announcement.priority}
              onReadMore={() =>
                setSelectedAnnouncement(announcement)
              }
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No announcements found</h3>
            <p>Try another search or category.</p>
          </div>
        )}

      </section>

      {/* READ MORE POPUP */}
      {selectedAnnouncement && (
        <div
          className="announcement-modal-overlay"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="announcement-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close button */}
            <button
              type="button"
              className="announcement-modal-close"
              onClick={() => setSelectedAnnouncement(null)}
            >
              ✕
            </button>

            {/* Category */}
            <div className="announcement-modal-category">
              {selectedAnnouncement.category}
            </div>

            {/* Priority */}
            {selectedAnnouncement.priority && (
              <div className="announcement-modal-priority">
                HIGH PRIORITY
              </div>
            )}

            {/* Title */}
            <h2>{selectedAnnouncement.title}</h2>

            {/* Description */}
            <p className="announcement-modal-description">
              {selectedAnnouncement.description}
            </p>

            {/* Details */}
            <div className="announcement-modal-details">

              <div>
                🏛️
                <strong> Department</strong>
                <span>
                  {selectedAnnouncement.department}
                </span>
              </div>

              <div>
                📅
                <strong> Date</strong>
                <span>
                  {selectedAnnouncement.date}
                </span>
              </div>

            </div>

            {/* Close */}
            <button
              type="button"
              className="announcement-modal-button"
              onClick={() => setSelectedAnnouncement(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </main>
  );
}

export default Announcements;
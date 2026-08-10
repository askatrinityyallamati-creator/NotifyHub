interface AnnouncementCardProps {
  title: string;
  description: string;
  category: string;
  department: string;
  date: string;
  priority?: string | boolean;
  onReadMore: () => void;
}

function AnnouncementCard({
  title,
  description,
  category,
  department,
  date,
  priority,
  onReadMore,
}: AnnouncementCardProps) {
  return (
    <article className="announcement-card">

      <div className="announcement-top">
        <span className="announcement-category">
          {category}
        </span>

        {priority && (
          <span className="announcement-priority">
            HIGH PRIORITY
          </span>
        )}
      </div>

      <h3>{title}</h3>

      <p className="announcement-description">
        {description}
      </p>

      <div className="announcement-meta">
        <span>🏛️ {department}</span>
        <span>📅 {date}</span>
      </div>

      <button
        type="button"
        className="read-more-button"
        onClick={onReadMore}
      >
        Read More →
      </button>

    </article>
  );
}

export default AnnouncementCard;
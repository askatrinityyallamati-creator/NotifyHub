function Features() {
  const features = [
    {
      icon: "📢",
      title: "Instant Announcements",
      description:
        "Get important college notices instantly without depending on WhatsApp groups or physical notice boards.",
    },
    {
      icon: "🚨",
      title: "Urgent Alert System",
      description:
        "Highlight exam deadlines, fee reminders, placement drives and other high-priority updates.",
    },
    {
      icon: "📅",
      title: "Live Event Tracker",
      description:
        "Discover upcoming campus events, workshops, ceremonies and activities with live countdowns.",
    },
    {
      icon: "🔍",
      title: "Smart Search & Filter",
      description:
        "Find announcements quickly using department, category and date-based filtering.",
    },
    {
      icon: "📱",
      title: "Works Everywhere",
      description:
        "Access NotifyHub smoothly from mobile phones, tablets and desktop computers.",
    },
    {
      icon: "⚡",
      title: "Real-Time Updates",
      description:
        "Stay updated with the latest campus information without repeatedly refreshing the page.",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">

        <div className="section-heading">
          <p>POWERFUL CAMPUS TOOLS</p>
          <h2>Everything your campus needs</h2>
          <span>
            One platform for announcements, events and important alerts.
          </span>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;
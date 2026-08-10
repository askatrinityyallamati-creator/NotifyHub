export type EventItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

const defaultEvents: EventItem[] = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technical",
    date: "Aug 18, 2026",
    time: "10:00 AM",
    location: "College Auditorium",
    description:
      "A technical festival featuring coding competitions, workshops and project exhibitions.",
  },

  {
    id: 2,
    title: "Independence Day Celebration",
    category: "Cultural",
    date: "Aug 15, 2026",
    time: "9:00 AM",
    location: "Main Ground",
    description:
      "Join the college community for flag hoisting, cultural performances and celebrations.",
  },

  {
    id: 3,
    title: "Cyber Security Workshop",
    category: "Workshop",
    date: "Aug 22, 2026",
    time: "2:00 PM",
    location: "Seminar Hall",
    description:
      "Learn about ethical hacking, network security and current cybersecurity practices.",
  },

  {
    id: 4,
    title: "Career Guidance Session",
    category: "Career",
    date: "Aug 25, 2026",
    time: "11:00 AM",
    location: "Block A Seminar Hall",
    description:
      "An interactive session covering career opportunities, placements and skill development.",
  },

  {
    id: 5,
    title: "Sports Meet 2026",
    category: "Sports",
    date: "Sep 02, 2026",
    time: "8:00 AM",
    location: "College Sports Ground",
    description:
      "Annual sports meet featuring athletics, cricket, volleyball and other competitions.",
  },

  {
    id: 6,
    title: "Innovation & Project Expo",
    category: "Exhibition",
    date: "Sep 10, 2026",
    time: "10:30 AM",
    location: "Innovation Center",
    description:
      "Students showcase innovative projects, prototypes and technology solutions.",
  },
];

export function getEvents(): EventItem[] {
  const saved = localStorage.getItem("notifyhub_events");

  if (!saved) {
    localStorage.setItem(
      "notifyhub_events",
      JSON.stringify(defaultEvents)
    );

    return defaultEvents;
  }

  try {
    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    return defaultEvents;
  } catch (error) {
    console.error("Error reading events:", error);

    localStorage.setItem(
      "notifyhub_events",
      JSON.stringify(defaultEvents)
    );

    return defaultEvents;
  }
}

export function addEvent(
  event: Omit<EventItem, "id">
) {
  const current = getEvents();

  const newEvent: EventItem = {
    ...event,
    id: Date.now(),
  };

  localStorage.setItem(
    "notifyhub_events",
    JSON.stringify([
      newEvent,
      ...current,
    ])
  );
}

export function updateEvent(
  id: number,
  updatedData: Omit<EventItem, "id">
) {
  const updated = getEvents().map((event) =>
    event.id === id
      ? {
          ...updatedData,
          id,
        }
      : event
  );

  localStorage.setItem(
    "notifyhub_events",
    JSON.stringify(updated)
  );
}

export function deleteEvent(id: number) {
  const updated = getEvents().filter(
    (event) => event.id !== id
  );

  localStorage.setItem(
    "notifyhub_events",
    JSON.stringify(updated)
  );
}
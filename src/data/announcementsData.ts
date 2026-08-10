export type Announcement = {
  id: number;
  title: string;
  description: string;
  category: string;
  department: string;
  date: string;
  priority: "high" | "normal";
};

const defaultAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Semester Examination Schedule Released",
    description:
      "The semester examination schedule has been released. Students are requested to check the dates and prepare accordingly.",
    category: "Exams",
    department: "Academic Department",
    date: "Aug 10, 2026",
    priority: "high",
  },
  {
    id: 2,
    title: "Campus Recruitment Drive",
    description:
      "A campus recruitment drive is being conducted for eligible final-year students. Registration is now open.",
    category: "Placements",
    department: "Training & Placement",
    date: "Aug 15, 2026",
    priority: "normal",
  },
  {
    id: 3,
    title: "Independence Day Celebration",
    description:
      "The college will celebrate Independence Day with cultural programs, speeches and student activities.",
    category: "Events",
    department: "Student Affairs",
    date: "Aug 15, 2026",
    priority: "normal",
  },
  {
    id: 4,
    title: "Fee Payment Deadline",
    description:
      "Students are reminded to complete their semester fee payment before the announced deadline.",
    category: "Finance",
    department: "Accounts Department",
    date: "Aug 20, 2026",
    priority: "high",
  },
];

// =========================
// GET ANNOUNCEMENTS
// =========================

export function getAnnouncements(): Announcement[] {
  const saved = localStorage.getItem(
    "notifyhub_announcements"
  );

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(
    "notifyhub_announcements",
    JSON.stringify(defaultAnnouncements)
  );

  return defaultAnnouncements;
}

// =========================
// ADD ANNOUNCEMENT
// =========================

export function addAnnouncement(
  announcement: Omit<Announcement, "id">
) {
  const currentAnnouncements = getAnnouncements();

  const newAnnouncement: Announcement = {
    ...announcement,
    id: Date.now(),
  };

  const updatedAnnouncements = [
    newAnnouncement,
    ...currentAnnouncements,
  ];

  localStorage.setItem(
    "notifyhub_announcements",
    JSON.stringify(updatedAnnouncements)
  );
}

// =========================
// DELETE ANNOUNCEMENT
// =========================

export function deleteAnnouncement(id: number) {
  const currentAnnouncements = getAnnouncements();

  const updatedAnnouncements =
    currentAnnouncements.filter(
      (announcement) => announcement.id !== id
    );

  localStorage.setItem(
    "notifyhub_announcements",
    JSON.stringify(updatedAnnouncements)
  );
}

// =========================
// UPDATE ANNOUNCEMENT
// =========================

export function updateAnnouncement(
  id: number,
  updatedData: Omit<Announcement, "id">
) {
  const currentAnnouncements = getAnnouncements();

  const updatedAnnouncements =
    currentAnnouncements.map((announcement) =>
      announcement.id === id
        ? {
            ...updatedData,
            id: id,
          }
        : announcement
    );

  localStorage.setItem(
    "notifyhub_announcements",
    JSON.stringify(updatedAnnouncements)
  );
}
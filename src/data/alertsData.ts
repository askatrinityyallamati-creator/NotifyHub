export type AlertItem = {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  level: "Critical" | "High";
};

const defaultAlerts: AlertItem[] = [
  {
    id: 1,
    title: "Semester Examination Form Deadline",
    description:
      "Students must submit their examination forms before the deadline. Late submissions may not be accepted.",
    type: "EXAM",
    date: "Aug 12, 2026",
    level: "Critical",
  },
  {
    id: 2,
    title: "Placement Registration Closing Soon",
    description:
      "Registration for the upcoming campus recruitment drive will close soon. Eligible students should register immediately.",
    type: "PLACEMENT",
    date: "Aug 14, 2026",
    level: "High",
  },
  {
    id: 3,
    title: "Fee Payment Reminder",
    description:
      "Students who have pending semester fees are requested to complete their payment before the due date.",
    type: "FINANCE",
    date: "Aug 20, 2026",
    level: "High",
  },
];

export function getAlerts(): AlertItem[] {
  const saved = localStorage.getItem("notifyhub_alerts");

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(
    "notifyhub_alerts",
    JSON.stringify(defaultAlerts)
  );

  return defaultAlerts;
}

export function addAlert(
  alert: Omit<AlertItem, "id">
) {
  const current = getAlerts();

  const newAlert: AlertItem = {
    ...alert,
    id: Date.now(),
  };

  localStorage.setItem(
    "notifyhub_alerts",
    JSON.stringify([newAlert, ...current])
  );
}

export function updateAlert(
  id: number,
  updatedData: Omit<AlertItem, "id">
) {
  const updated = getAlerts().map((item) =>
    item.id === id
      ? { ...updatedData, id }
      : item
  );

  localStorage.setItem(
    "notifyhub_alerts",
    JSON.stringify(updated)
  );
}

export function deleteAlert(id: number) {
  const updated = getAlerts().filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    "notifyhub_alerts",
    JSON.stringify(updated)
  );
}
export const baseUrl = () => "http://localhost:8080";

export function formatDate(date) {
  const d = new Date(date),
        locale = "en-us",
        month = d.toLocaleString(locale, { month: "long" });
  return month + " " + d.getDate();
}

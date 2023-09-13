export const formatDate = (
  lng: string,
  date?: Date | null,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  },
) => (date ? new Intl.DateTimeFormat(lng, options).format(date) : "");

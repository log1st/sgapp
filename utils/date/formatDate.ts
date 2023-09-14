import { formatDistance } from "date-fns";
import en from "date-fns/locale/en-US";
import ru from "date-fns/locale/ru";

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

export const formatAgo = (
  lng: string,
  date?: Date | null,
  options: {
    includeSeconds?: boolean;
    addSuffix?: boolean;
  } = {},
) =>
  date
    ? formatDistance(date, new Date(), {
        ...options,
        locale:
          {
            en,
            ru,
          }[lng] ?? en,
      })
    : "";

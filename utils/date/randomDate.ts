export const randomDate = (
  from = new Date("1970-01-01 00:00:00"),
  to = new Date(),
) => new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));

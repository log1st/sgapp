export const randomNumber = (
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  precision = 0,
) => parseFloat((Math.random() * (max - min + 1) + min).toFixed(precision));

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  // eslint-disable-next-line no-param-reassign
  keys.forEach((key) => delete obj[key]);
  return obj;
};

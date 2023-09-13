export const compose =
  <T>(...items: Array<(config: T) => T>) =>
  (config: T) =>
    items.reduce((c, p) => p(c), config);

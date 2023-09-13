export const randomArrayElement = <Type>(
  items: Array<Type>,
  throwErrorEIfEmpty = false,
) => {
  const item = items[(items.length * Math.random()) | 0];

  if (throwErrorEIfEmpty && typeof item === "undefined") {
    throw new Error("no random element");
  }

  return item;
};

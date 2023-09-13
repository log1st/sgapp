export const head = <T>(ts: Iterable<T>): T => {
  const iterator = ts[Symbol.iterator]();
  const t = iterator.next();

  if (t.done) throw new Error("Cannot get head of an empty iterable");

  return t.value;
};

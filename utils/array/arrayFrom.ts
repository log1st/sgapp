export type ArrayFrom<T> = T | Array<T>;

export const arrayFrom = <S>(items: S | Array<S>): Array<S> =>
  Array.isArray(items) ? items : [items];

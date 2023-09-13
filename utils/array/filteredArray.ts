export const filteredArray = <S>(
  source?: Array<S | boolean | undefined | null>,
): Array<S> => (source || []).filter(Boolean) as Array<S>;

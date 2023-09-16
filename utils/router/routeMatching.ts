export const routeMatching = (
  source: string,
  target: string,
  level = 1,
  precision = 2,
): boolean => {
  const sourceParts = source.split("/").slice(1);
  const targetParts = target.split("/").slice(1);

  return (
    (
      sourceParts.reduce((a, c, i) => a + (c === targetParts[i] ? 1 : 0), 0) /
      sourceParts.length
    ).toFixed(precision) === (level / targetParts.length).toFixed(precision)
  );
};

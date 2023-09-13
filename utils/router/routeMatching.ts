export const routeMatching = (source: string, target: string): number => {
  const sourceParts = source.split("/").slice(1);
  const targetParts = target.split("/").slice(1);
  return sourceParts.reduce((a, c, i) => a + (c === targetParts[i] ? 1 : 0), 0);
};

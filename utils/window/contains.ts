export const contains = (
  container?: HTMLElement | null,
  target?: Element | Window | null,
): boolean => {
  if (!target) {
    return false;
  }
  if (target instanceof Window) {
    return false;
  }
  return !!container?.contains(target);
};

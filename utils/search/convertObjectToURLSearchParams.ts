export const convertObjectToURLSearchParams = (
  obj: Record<string, unknown>,
  parentKey?: string,
): URLSearchParams => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([k, value]) => {
    let key = k;
    if (parentKey) {
      key = `${parentKey}[${key}]`;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        params.append(key, String(item));
      });
    } else if (typeof value === "object" && value !== null) {
      params.append(key, JSON.stringify(value));
    } else {
      params.append(key, String(value));
    }
  });

  return params;
};

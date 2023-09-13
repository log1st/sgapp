export const getItem = <Data, Key extends string>(
  key: Key,
  defaultValue: Data | null = null,
): Data | null => {
  try {
    return (JSON.parse(localStorage.getItem(key) || "undefined") ??
      defaultValue) as Data;
  } catch {
    return defaultValue;
  }
};

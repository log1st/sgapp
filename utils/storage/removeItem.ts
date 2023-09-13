export const removeItem = <Key extends string>(key: Key) => {
  localStorage.removeItem(key);
};

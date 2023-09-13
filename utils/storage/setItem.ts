export const setItem = <Data, Key extends string>(key: Key, data: Data) => {
  localStorage.setItem(key, JSON.stringify(data));

  return data;
};

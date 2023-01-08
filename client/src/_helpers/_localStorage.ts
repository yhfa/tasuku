export const getLocalStoredData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
};

export const setLocalStoredData = (key: string, value: any) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
    return true;
  } catch (e) {
    return undefined;
  }
};

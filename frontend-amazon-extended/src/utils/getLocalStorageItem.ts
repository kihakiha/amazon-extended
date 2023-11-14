export const getLocalStorageItem = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const ls = localStorage.getItem(name);
    return ls ? JSON.parse(ls) : null;
  }
};

export const getLocalStorageItem = (val) => {
  if (!val || val === undefined || val === null)
    return "Invalid localStorage key";
  return localStorage.getItem(val);
};
export const deleteLocalStorageItem = (val) => {
  if (!val || val === undefined || val === null)
    return "Invalid localStorage key";
  return localStorage.removeItem(val);
};
export const clearLocalStorage = () => {
  return localStorage.clear();
};

// export const processError = (arr) => {

// }

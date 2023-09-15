export const isArray = (array: any): boolean => {
  if (Array.isArray(array)) {
    return true;
  }
  return false;
};

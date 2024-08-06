export const truncate = (str, n) => {
  if (str.length > n) {
    return `${str.substring(0, n)}...`;
  }
  return str;
};

export const auth = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const token = window.sessionStorage.getItem("authToken");

  return !!token;
};

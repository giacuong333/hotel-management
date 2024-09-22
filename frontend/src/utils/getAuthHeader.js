export const getAuthHeader = () => {
      const token = localStorage.getItem("jwtToken");
      return token ? { Authorization: `Bearer ${token}` } : {};
};

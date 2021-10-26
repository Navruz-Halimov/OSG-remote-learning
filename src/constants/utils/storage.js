export const getToken = (tokenKey = "access") => {
  const tokens_str = localStorage.getItem("tokens");

  return (tokens_str && JSON.parse(tokens_str)[tokenKey]) || null;
};
export const clearToken = () => {
  localStorage.removeItem("tokens");
};

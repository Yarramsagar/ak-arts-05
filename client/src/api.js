import axios from "axios";

const api = axios.create({
  baseURL: "https://ak-arts-api.onrender.com/api",
});

// attach token helper
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;
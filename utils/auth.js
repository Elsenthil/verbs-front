import axios from "axios";

const API_URL = "http://localhost:8765";

export const login = async (username, password) => {
  const logs = {
    username: username,
    password: password,
  };
  try {
    const response = await axios.post(`${API_URL}/users/login`, logs);
    if (response.data.success) {
      if (response.data.user.token) {
        localStorage.setItem("token", response.data.user.token);
      }
    }
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLogged = () => {
  return localStorage.getItem("token") === null ? false : true;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

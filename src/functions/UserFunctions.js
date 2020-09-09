import axios from "axios";

axios.defaults.baseURL = "http://18.141.178.15:8080/";

// POST register
export const register = (newUser) => {
  return axios
    .post("register", {
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
    })
    .then((response) => {
      console.log("Registered");
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
};

// POST login
export const login = (user) => {
  return axios
    .post("login", {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.data.token);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
};

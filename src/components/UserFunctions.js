import axios from "axios";

axios.defaults.baseURL = "http://18.141.178.15:8080/";

export const register = (newUser) => {
  return axios
    .post("users/register", {
      role_id: newUser.role_id,
      name: newUser.name,
      username: newUser.username,
      password: newUser.password,
    })
    .then((response) => {
      console.log("Registered");
    });
};

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

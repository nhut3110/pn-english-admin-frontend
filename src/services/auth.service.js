import api from "./api";
import TokenService from "./token.service";

const register = (full_name, username, password) => {
  return api.post("/auth/register", {
    full_name,
    username,
    password
  });
};

const login = (username, password) => {
  return api
    .post("/accounts/login", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser({
          id: response.data.id,
          username: response.data.username,
          accessToken: response.data.accessToken,
        });
      }
      console.log(response.data)
      return response.data;
    });
};

const logout = () => {
  return TokenService.removeUser()

};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
